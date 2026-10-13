/* GNU Go browser estimate interface, GPL-3.0-or-later.
 * Copyright (c) 2026 Joe Hudson.
 * Calls GNU Go 3.8's full position analysis, territory classification and area
 * influence score. JSON uses row-major points; positive lead favours White.
 * Compile/link with the accompanying upstream source; see build.sh and COPYING.
 */
#include <stdio.h>
#include "gnugo.h"
#include "liberty.h"

const char *estimate_position(int size, const char *position, int to_move, float white_komi) {
  static int initialized = 0;
  static char result[2048];
  char ownership[362];
  int row, col, point;
  struct influence_data *influence;
  if (size < 5 || size > 19) return "{\"error\":\"Unsupported board size\"}";
  if (!initialized) {
    init_gnugo(16, 0);
    set_depth_values(5, 0);
    initialized = 1;
  }
  chinese_rules = 1;
  gnugo_clear_board(size);
  komi = white_komi;
  for (row = 0; row < size; row++)
    for (col = 0; col < size; col++) {
      char stone = position[row * size + col];
      if (stone == 'B' || stone == 'W')
        add_stone(POS(row, col), stone == 'B' ? BLACK : WHITE);
    }
  silent_examine_position(EXAMINE_ALL);
  influence = INITIAL_INFLUENCE(to_move == 1 ? BLACK : WHITE);
  for (row = 0; row < size; row++)
    for (col = 0; col < size; col++) {
      int owner = whose_territory(influence, POS(row, col));
      point = row * size + col;
      ownership[point] = owner == BLACK ? 'B' : owner == WHITE ? 'W' : '.';
    }
  ownership[size * size] = '\0';
  snprintf(result, sizeof(result), "{\"lead\":%.3f,\"ownership\":\"%s\"}",
    influence_score(influence, 1), ownership);
  return result;
}
