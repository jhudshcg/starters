# Reusable Go sources

These public reference files are retained for offline reuse. Do not repeat downloads to regenerate or validate the bank.

- `goproblems-ID.json`: SGF, source rank, genre and contributor/source attribution; contributor profiles are omitted.
- `catalogue-page-N.json` and `catalogue-sample.json`: first eight public catalogue pages in ascending ID order, retrieved on 24 September 2026. This is a sample, not the complete site.
- `ogs-2625.json`: the original linked exercise, including puzzle rank 5 (25 kyu on OGS's internal scale).
- `ogs-collection-242.json`: collection index response. Its next-page link indicates the response is incomplete; not every collection problem was reviewed.

Sources: [GoProblems](https://goproblems.com/) and [OGS exercise 2625](https://online-go.com/puzzle/2625). Imported questions retain individual links and attribution. These are third-party reference materials, not original authored content or a claim of rights over the collections.

`scripts/cache-go-sources.py` downloads missing files only. `scripts/import-go-enrichment.py` works entirely offline. Reviewed selections are recorded in `data/coverage/go-enrichment-inventory.json`; the previous imports retain `data/coverage/go-source-inventory.json`.

## API findings

Use `GET /api/v2/problems/ID` or `GET /api/v2/problems?resultNumber=100&offset=N&sortBy=p.id&sortDirection=asc`. `/api/problems` and a request with `resultNumber=500` returned 404. Rank query parameters were ignored in sampled responses; filter the returned `rank.value` and `rank.unit` locally.

Ranks are source estimates, not classroom calibration. Source winning markers establish accepted strategic outcomes. Independent validation checks move legality, captures and recorded model lines, not general life-and-death optimality. Duplicate sibling moves in problems 191 and 25 are merged only after verifying equal board/colour, retaining alternative continuations and winning markers. Cached raw SGFs are unchanged.
