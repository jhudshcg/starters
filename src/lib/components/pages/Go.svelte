<script module>
  import { newGoGame } from '../../../../packages/puzzles/rules/go-game.js';
  let savedGame = newGoGame(),
    savedKomi = 6.5;
</script>

<script>
  import { onMount } from 'svelte';
  import { asset } from '$app/paths';
  import {
    goBoardSizes,
    currentGoPosition,
    playHumanGo,
    undoHumanGo,
    redoHumanGo,
    countHumanGo,
    setHumanGoClock,
    resumeHumanGo,
    toggleDeadGroup,
    scoreGoArea,
  } from '../../../../packages/puzzles/rules/go-game.js';
  import {
    newGoClock,
    advanceGoClock,
    startGoClock,
    pauseGoClock,
  } from '../../../../packages/puzzles/rules/go-clock.js';
  import { createGnuGoEstimator } from '../../../../packages/puzzles/ui/gnugo-client.js';
  import GoBoard from '../practice/GoBoard.svelte';
  let { href, returnTo = '#home' } = $props();
  let game = $state.raw(savedGame),
    komi = $state(savedKomi),
    message = $state(''),
    estimate = $state(true),
    result = $state.raw(null),
    engineError = $state(''),
    estimator = $state.raw(null),
    retry = $state(0);
  let timingOpen = $state(false),
    settings = $state({ minutes: 5, seconds: 30, periods: 3 });
  const position = $derived(currentGoPosition(game)),
    counting = $derived(game.counting || position.passes >= 2),
    size = $derived(game.size),
    dead = $derived(game.dead),
    clock = $derived(game.clock);
  const score = $derived(counting && !estimate ? scoreGoArea(game, komi) : null);
  const ownership = $derived(counting && estimate ? (result?.ownership ?? []) : []);
  const clockText = (ms) => {
    const seconds = Math.ceil(ms / 1000);
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  };
  function play(move) {
    const next = playHumanGo(game, move, Date.now());
    message = next.error ?? '';
    if (next.game) game = next.game;
  }
  function action(kind) {
    message = '';
    if (kind === 'pass') {
      play(null);
      return;
    }
    game =
      kind === 'count'
        ? countHumanGo(game, Date.now())
        : kind === 'resume'
          ? resumeHumanGo(game, Date.now())
          : kind === 'undo'
            ? undoHumanGo(game)
            : redoHumanGo(game);
  }
  function refresh() {
    if (game.clock?.running) game = { ...game, clock: advanceGoClock(game.clock, Date.now()) };
  }
  onMount(() => {
    estimator = createGnuGoEstimator(new URL(asset('engines/gnugo/worker.js'), location.href));
    const interval = setInterval(refresh, 250);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      savedGame = game;
      savedKomi = komi;
      clearInterval(interval);
      document.removeEventListener('visibilitychange', refresh);
      estimator.dispose();
    };
  });
  $effect(() => {
    retry;
    if (!estimator || !counting || !estimate) {
      result = null;
      return;
    }
    const request = new AbortController();
    result = null;
    engineError = '';
    estimator
      .estimate(
        {
          size,
          board: [...position.board]
            .map((stone, index) => (dead.includes(index) ? '.' : stone))
            .join(''),
          turn: position.turn,
          komi,
        },
        request.signal,
      )
      .then((value) => {
        if (!request.signal.aborted) result = value;
      })
      .catch((error) => {
        if (!request.signal.aborted) engineError = error.message;
      });
    return () => request.abort();
  });
</script>

<a class="back" href={href(returnTo)}>← Back to activities</a>
<div class="page-top">
  <h1>Go practice board</h1>
  <a href="https://www.britgo.org/intro/intro2.html" target="_blank" rel="noopener"
    >Go rules reminder ↗</a
  >
</div>
<section class="human-go" aria-label="Two-player Go">
  <div id="go-setup" class="go-setup">
    <label
      >Board size <select
        class="choice-field"
        id="go-size"
        value={size}
        onchange={(e) => {
          game = newGoGame(Number(e.currentTarget.value));
          message = '';
        }}
        >{#each goBoardSizes as value}<option {value}>{value}</option>{/each}</select
      ></label
    ><button
      class="action-button"
      id="go-reset"
      onclick={() => {
        game = newGoGame(size);
        message = '';
      }}>Reset board</button
    ><label
      >White’s komi <select class="choice-field" id="go-komi" bind:value={komi}
        >{#each [0, 5.5, 6.5, 7.5] as value}<option {value}>{value}</option>{/each}</select
      ></label
    >
  </div>
  <div id="go-timing">
    <details id="go-timing-options" bind:open={timingOpen}>
      <summary>Timing options</summary>
      <fieldset disabled={Boolean(clock)}>
        <div class="go-setup">
          {#each [['minutes', 'Main time', [0, 1, 5, 10, 15, 20, 30, 45, 60], ' min'], ['seconds', 'Byo-yomi', [10, 15, 20, 30, 45, 60], ' sec'], ['periods', 'Periods', [0, 1, 3, 5, 10], '']] as [key, label, values, suffix]}<label
              >{label}
              <select class="choice-field" data-setting={key} bind:value={settings[key]}
                >{#each values as value}<option {value}>{value}{suffix}</option>{/each}</select
              ></label
            >{/each}
        </div>
      </fieldset>
      {#if !clock}<button
          class="action-button"
          id="go-clock-start"
          disabled={counting || (!settings.minutes && !settings.periods)}
          onclick={() => {
            game = setHumanGoClock(
              game,
              startGoClock(
                newGoClock(
                  {
                    mainMs: settings.minutes * 60000,
                    periodMs: settings.seconds * 1000,
                    periods: settings.periods,
                  },
                  position.turn,
                ),
                Date.now(),
              ),
            );
            timingOpen = false;
          }}>Start clocks</button
        >{/if}{#if !clock?.running}<p>
          Settings apply to each player. After main time, a legal move resets the surviving byo-yomi
          period. Taking longer uses up periods. Clocks keep running in background tabs; pause
          before stepping away.
        </p>{/if}
    </details>
    {#if clock}<div class="go-clocks" aria-label="Game clocks">
        {#each ['b', 'w'] as colour}{@const player = clock.players[colour]}
          <div data-clock={colour} class:active={clock.active === colour}>
            <strong>{colour === 'b' ? 'Black' : 'White'}</strong><output
              role="timer"
              aria-live="off"
              aria-label={`${colour === 'b' ? 'Black' : 'White'} time`}
              >{clockText(player.mainMs || (player.periods ? player.periodMs : 0))}</output
            ><small>{player.mainMs ? 'Main time' : `${player.periods} byo-yomi periods left`}</small
            >
          </div>{/each}
      </div>
      <div class="actions">
        <button
          class="action-button"
          id="go-clock-toggle"
          disabled={counting || Boolean(clock.expired)}
          onclick={() => {
            game = {
              ...game,
              clock: clock.running
                ? pauseGoClock(clock, Date.now())
                : startGoClock(clock, Date.now()),
            };
          }}>{clock.running ? 'Pause' : 'Resume'} clocks</button
        ><button
          class="action-button"
          id="go-clock-reset"
          onclick={() => {
            game = setHumanGoClock(game, null);
            message = '';
          }}>Reset clocks</button
        >
      </div>{/if}
  </div>
  <GoBoard
    {size}
    {position}
    {dead}
    {ownership}
    {counting}
    getGame={() => game}
    onmove={(move) => {
      if (counting) game = toggleDeadGroup(game, move);
      else play(move);
    }}
  />
  <p id="go-message" role="status">
    {message ||
      (clock?.expired
        ? `${clock.expired === 'b' ? 'Black' : 'White'} ran out of time. Reset clocks to continue.`
        : counting
          ? 'Counting: agree on dead groups, then tap to mark or restore them. Clocks are paused.'
          : `${position.turn === 'b' ? 'Black' : 'White'} to play.${position.passes ? ' The other player passed.' : ''}`)}
  </p>
  <div id="go-actions" class="actions go-play-controls">
    {#if counting}<button
        class="action-button"
        data-action="resume"
        onclick={() => action('resume')}>Resume play</button
      >{:else}<button class="action-button" data-action="count" onclick={() => action('count')}
        >Count</button
      ><button
        class="action-button"
        data-action="pass"
        disabled={Boolean(clock?.expired)}
        onclick={() => action('pass')}>Pass</button
      >{/if}<button
      class="action-button"
      data-action="undo"
      disabled={game.positions.length === 1}
      onclick={() => action('undo')}>Undo</button
    ><button
      class="action-button"
      data-action="redo"
      disabled={!game.future.length}
      onclick={() => action('redo')}>Redo</button
    >
  </div>
  <div id="go-count">
    {#if counting}<label
        ><input id="go-estimate" type="checkbox" bind:checked={estimate} /> Estimate open territory</label
      >
      <div id="go-estimate-result" role="status">
        {#if !estimate}Area count — Black: {score.black} · White: {score.white} (includes
          {komi} komi). {score.neutral} neutral points.{:else if engineError}{engineError}<button
            class="action-button"
            onclick={() => retry++}>Try estimate again</button
          >{:else if !result}Estimating with GNU Go…{:else}GNU Go estimate — {Math.abs(
            result.lead,
          ) < 0.05
            ? 'Even.'
            : `${result.lead > 0 ? 'White' : 'Black'} leads by ${Math.abs(result.lead).toFixed(1)}.`}
          Includes {komi} komi using area scoring. Squares show predicted territory, not a final result.
          Turn off estimates for agreed-dead-group area counting.{/if}
      </div>{/if}
  </div>
  <details>
    <summary>Counting and rules</summary>
    <p>
      Count at any point, or pass twice. Agree which groups are dead and tap them to mark or restore
      them. Area counting adds living stones and surrounded empty points, plus White’s komi;
      captures are not added again. Fill open borders before treating the count as final. Suicide
      and repeating earlier board positions are forbidden. Undo and Redo pause clocks. Practice
      games are not recorded as scored progress.
    </p>
    <p>
      <a href={asset('THIRD_PARTY_NOTICES.md')} target="_blank"
        >GNU Go source, build instructions and licences</a
      >
    </p>
  </details>
</section>
