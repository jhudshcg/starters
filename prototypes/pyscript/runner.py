"""PyScript worker entry: run supplied cases and return observations as JSON.

Used by adapter.js. Only standard library dependencies; optional plotting uses
matplotlib's noninteractive backend. Worker termination provides the hard stop.
"""
import base64
import contextlib
import io
import json
import random
import traceback


class OutputLimit(Exception):
    pass


class LimitedOutput(io.StringIO):
    def write(self, text):
        remaining = 12000 - self.tell()
        if len(text) > remaining:
            super().write(text[:remaining])
            raise OutputLimit("Output limit reached (12,000 characters).")
        return super().write(text)


def run_cases(payload):
    request = json.loads(payload)
    observations = []
    plot = None
    if request.get("plots"):
        import matplotlib
        matplotlib.use("Agg")
        import matplotlib.pyplot as plot
        plot.show = lambda: None
    for case in request["cases"]:
        stdout, stderr = LimitedOutput(), LimitedOutput()
        consumed = 0
        result = {"label": case["label"], "value": None, "type": None, "error": None, "plots": []}

        def read_input(prompt=""):
            nonlocal consumed
            print(prompt, end="")
            if consumed >= len(case["inputs"]):
                raise EOFError("No supplied input remains. Add another input and run again.")
            value = case["inputs"][consumed]
            consumed += 1
            print(value)
            return value

        namespace = {"__name__": "__main__", "input": read_input}
        random.seed(case.get("seed"))
        if plot:
            plot.close("all")
        try:
            with contextlib.redirect_stdout(stdout), contextlib.redirect_stderr(stderr):
                exec(compile(request["source"], "student.py", "exec"), namespace)
                value = eval(compile(request["expression"], "<call>", "eval"), namespace)
                result["type"] = type(value).__name__
                try:
                    json.dumps(value, allow_nan=False)
                    result["value"] = value
                except (ValueError, TypeError):
                    result["value"] = repr(value)[:1000]
                if plot:
                    for number in plot.get_fignums()[:3]:
                        image = io.BytesIO()
                        plot.figure(number).savefig(image, format="png", dpi=100)
                        result["plots"].append(base64.b64encode(image.getvalue()).decode("ascii"))
        except BaseException as error:
            frames = traceback.extract_tb(error.__traceback__)
            lines = [frame.lineno for frame in frames if frame.filename == "student.py"]
            result["error"] = {"type": type(error).__name__, "message": str(error)[:1500],
                               "line": (error.lineno if getattr(error, "filename", None) == "student.py" else (lines[-1] if lines else None))}
        finally:
            if plot:
                plot.close("all")
        result.update(stdout=stdout.getvalue(), stderr=stderr.getvalue(), consumed=consumed)
        observations.append(result)
    return json.dumps(observations, allow_nan=False)


__export__ = ["run_cases"]
