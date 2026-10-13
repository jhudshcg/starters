#!/bin/sh
# GNU Go browser build, GPL-3.0-or-later. Copyright (c) 2026 Joe Hudson.
# Requirements: Emscripten 4.0.22 on PATH, native C compiler, make, Python 3.
# Usage: sh build.sh /absolute/path/to/an/empty/build-directory
set -eu
asset_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
build_dir=${1:?Supply an empty build directory}
case "$(emcc --version | head -1)" in *4.0.22*) ;; *) exit 1 ;; esac
mkdir -p "$build_dir"
build_dir=$(CDPATH= cd -- "$build_dir" && pwd)
tar -xzf "$asset_dir/gnugo-3.8.tar.gz" -C "$build_dir"
source_dir="$build_dir/gnugo-3.8"
python3 - "$source_dir" <<'PY'
from pathlib import Path
import sys
root = Path(sys.argv[1])
p = root / 'engine/liberty.h'
s = p.read_text()
for colour in ['black', 'white']:
    s = s.replace(f'int meaningless_{colour}_moves[BOARDMAX];', f'extern int meaningless_{colour}_moves[BOARDMAX];')
p.write_text(s)
p = root / 'engine/globals.c'
p.write_text(p.read_text() + '\n/* Browser build: single definitions for modern compilers. */\nint meaningless_black_moves[BOARDMAX];\nint meaningless_white_moves[BOARDMAX];\n')
# Native pattern generators and wasm must agree on hash word width.
p = root / 'engine/hash.h'
p.write_text(p.read_text().replace('typedef unsigned long Hashvalue;', 'typedef unsigned int Hashvalue;').replace('#define SIZEOF_HASHVALUE SIZEOF_LONG', '#define SIZEOF_HASHVALUE 4'))
PY
mkdir -p "$build_dir/native" "$build_dir/wasm"
cd "$build_dir/native"
"$source_dir/configure" --without-readline --without-curses --disable-socket-support --disable-color CFLAGS='-O2 -Wno-implicit-function-declaration -Wno-int-conversion' > configure.log 2>&1
make -j4 > build.log 2>&1
cd "$build_dir/wasm"
emconfigure "$source_dir/configure" --host=wasm32-unknown-emscripten --without-readline --without-curses --disable-socket-support --disable-color AR=emar RANLIB=emranlib CFLAGS='-O2 -Wno-error=implicit-function-declaration -Wno-error=int-conversion' > configure.log 2>&1
emmake make AR=emar RANLIB=emranlib -C utils -j4 libutils.a > build.log 2>&1
emmake make AR=emar RANLIB=emranlib -C sgf -j4 libsgf.a >> build.log 2>&1
emmake make AR=emar RANLIB=emranlib -C engine -j4 libengine.a >> build.log 2>&1
cp "$build_dir/native/patterns/"*.c patterns/
for helper in mkpat mkeyes joseki uncompress_fuseki mkmcpat; do
  cp "$build_dir/native/patterns/$helper" "patterns/$helper"
  chmod +x "patterns/$helper"
done
emmake make AR=emar RANLIB=emranlib -C patterns -j4 libpatterns.a -o mkpat -o mkeyes -o joseki -o uncompress_fuseki -o mkmcpat >> build.log 2>&1
emcc -O2 -DHAVE_CONFIG_H -I. -I"$source_dir" -I"$source_dir/engine" -I"$source_dir/utils" -I"$source_dir/sgf" \
  "$asset_dir/bridge.c" engine/libengine.a patterns/libpatterns.a sgf/libsgf.a utils/libutils.a \
  -sMODULARIZE=1 -sEXPORT_ES6=1 -sEXPORT_NAME=createGnuGo -sENVIRONMENT=worker,node \
  -sALLOW_MEMORY_GROWTH=1 -sINITIAL_MEMORY=67108864 -sSTACK_SIZE=2097152 \
  -sEXPORTED_FUNCTIONS=_estimate_position -sEXPORTED_RUNTIME_METHODS=ccall -sFILESYSTEM=0 \
  -o "$asset_dir/gnugo.js" > link.log 2>&1
