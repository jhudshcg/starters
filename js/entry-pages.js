/**
 * Purpose: Render discovery and information pages.
 *
 * Main contents: home cards, exam entry, search results and information pages
 *
 * Used by: application.
 * Uses: bank labels, search and host navigation callbacks.
 * Libs: none.
 */
import { esc } from './view-utils.js';
import { types, banks, focusNames, espRecipeNames } from './bank.js';
import { examSections, isExamBank } from './exam-sections.js';
import { discoverableQuestion } from './activity-discovery.js';
import { searchGroups, searchPlan, cleanSearchQuery } from './search.js';
import { makeSearchSet } from './search-sets.js';
/** Page events call the host's start/navigation actions rather than changing attempt state. */
export function createEntryPages({ main, session, navigation, start, openCodeOrSearch, toast }) {
  const $ = (selector) => document.querySelector(selector);
  const navigate = (hash) => navigation.go(hash);
  function about() {
    $('.global-code-entry').hidden = true;
    main.innerHTML = /* HTML */ `<article class="about-page">
      <nav class="breadcrumbs eyebrow" aria-label="Breadcrumb">
        <a href="#home">All activities</a><span aria-hidden="true">/</span
        ><a href="#about" aria-current="page">About</a>
      </nav>
      <p><a href="THIRD_PARTY_NOTICES.md">Third-party software, GNU Go source and licences</a></p>
      <h1>A small start.<br />A stronger understanding.</h1>
      <section aria-labelledby="about-purpose">
        <h2 id="about-purpose">Why this site?</h2>
        <p>
          Short, regular practice helps students recall what they know, spot gaps and build
          confidence. This site brings together puzzles, Core exam practice, Python challenges and
          Employer Set Project activities for Digital Software Development T Level students.
        </p>
        <p>
          Designed for 5–15 minute starters, the activities offer variety, immediate feedback/auto
          marking and repeat practice with different values and scenarios. Progress tracking, with
          revision priority identification and revision set generation helps students optimize
          revision time.
        </p>
      </section>
      <section aria-labelledby="about-roadmap">
        <h2 id="about-roadmap">What’s next?</h2>
        <ul>
          <li>Work through questions sets matching search term results.</li>
          <li>Enter missing Python answers directly in the code.</li>
          <li>
            Extend Core coverage beyond CA1 and CA2, and add more ESP activities, including
            flowcharts.
          </li>
          <li>Develop Year 2 Occupational Specialism practice.</li>
        </ul>
        <p>
          These are planned developments. Classroom feedback will help shape the content,
          accessibility and order of work.
        </p>
      </section>
      <section aria-labelledby="about-author">
        <h2 id="about-author">Author and development</h2>
        <p>
          Created by <strong>Joe Hudson</strong>. Agentic development—using AI agents to carry out
          development tasks—has been used extensively to build the site, in combination with expert
          human input to guide its educational purpose, content, design and UX.
        </p>
      </section>
    </article>`;
  }

  function home() {
    const data = session.data;
    $('.global-code-entry').hidden = true;
    const completed = data.history.length;
    main.innerHTML = /* HTML */ `<section class="hero">
        <div>
          <div class="eyebrow">A little practice goes a long way</div>
          <h1>Start small.<br /><em>Think bigger.</em></h1>
          <p>
            Get your brain into gear with a quick puzzle, a little Core revision, a Python challenge
            or ESP practice.
          </p>
          <div class="meta-row">
            <span>5–15 minutes</span><span>Instant feedback</span><span>Your own pace</span>
          </div>
        </div>
        <aside class="code-entry">
          <div class="eyebrow">Have a code or a topic in mind?</div>
          <h2>Jump straight in.</h2>
          <p>Open a question set or find practice by key term.</p>
          <form id="code-form">
            <input
              name="code"
              aria-label="Question set code or key term"
              placeholder="Enter code or key term"
              autocomplete="off"
              autocapitalize="off"
              spellcheck="false"
              required
            /><button type="submit">Open <span aria-hidden="true">↗</span></button>
          </form>
          <p class="error" id="code-error" role="alert"></p>
          <small
            >9 characters · capitals matter · optional timer character<br />or enter key term to
            search for</small
          >
        </aside>
      </section>
      <div class="section-heading">
        <h2>What will you try today?</h2>
        <span>Pick an activity to get started</span>
      </div>
      <section class="activity-grid" aria-label="Activity types">
        ${[1, 2, 0]
          .map((i, order) => {
            const t = types[i];
            const art =
              i === 0
                ? '<div class="mini-grid"><span>2</span><span>5</span><span>7</span><span>3</span><span>?</span><span>9</span><span>5</span><span>11</span><span>16</span></div>'
                : i === 1
                  ? '<div class="art-lines"><span>○ identify</span><span>● understand</span><span>○ explain</span></div>'
                  : '<div class="art-code">for idea in ideas:<br>&nbsp; give_it_a_go()<br>if persistent == True:<br>&nbsp; print("I ♥ coding!")</div>';
            return /* HTML */ `<article class="type-card type-${i}">
              <div class="eyebrow">0${order + 1} / ${t.label}</div>
              <div class="card-art" aria-hidden="true">${art}</div>
              <h3>${t.name}</h3>
              <div class="card-bottom">
                <small
                  >${i === 1
                    ? 'Core papers and ESP'
                    : i === 2
                      ? '2 challenges · 12 marks'
                      : '3 puzzles · choose your pace'}</small
                ><button data-start="${i}" aria-label="Start ${t.name}">
                  Let’s go <span aria-hidden="true">↗</span>
                </button>
              </div>
            </article>`;
          })
          .join('')}
      </section>
      <section class="lower-panel">
        <div class="note-panel">
          <span class="note-icon" aria-hidden="true">↗</span>
          <div>
            <h3>
              ${completed
                ? `${completed} ${completed === 1 ? 'activity' : 'activities'} completed. Keep building.`
                : 'Small steps add up.'}
            </h3>
            <p>See your results and find out what to practise next.</p>
          </div>
          <a href="#progress">My progress →</a>
        </div>
        <div class="note-panel">
          <span class="note-icon" aria-hidden="true">◷</span>
          <div>
            <h3>No rush. Unless you want one.</h3>
            <p>Practise at your pace, or add a timer for a challenge.</p>
          </div>
        </div>
      </section>
      ${data.active && !data.active.finished
        ? `<p class="muted" style="margin-top:1.5rem">You have an unfinished activity. <a href="#set=${encodeURIComponent(data.active.code)}">Continue ${esc(data.active.code)}</a></p>`
        : ''}`;
    $('#code-form').onsubmit = (e) => openCodeOrSearch(e, '#code-error');
    main
      .querySelectorAll('[data-start]')
      .forEach(
        (button) =>
          (button.onclick = () =>
            navigate(button.dataset.start === '1' ? '#exam' : `#practice=${button.dataset.start}`)),
      );
  }
  function examHome() {
    $('.global-code-entry').hidden = false;
    main.innerHTML = /* HTML */ `<a href="#home" class="back">← All activities</a>
      <div class="page-top">
        <div>
          <h1>Exam practice</h1>
          <p class="muted">Choose Core paper questions or Employer Set Project (ESP) practice.</p>
        </div>
      </div>
      <section class="exam-options" aria-label="Exam practice options">
        ${examSections
          .map(
            (section) =>
              `<article class="note-panel"><div><h2>${esc(section.title)}</h2><p>${esc(section.description)}</p><button class="primary" data-exam-start="${section.bankType}">${esc(section.action)} <span aria-hidden="true">↗</span></button></div></article>`,
          )
          .join('')}
      </section>`;
    main
      .querySelectorAll('[data-exam-start]')
      .forEach(
        (button) => (button.onclick = () => navigate(`#practice=${button.dataset.examStart}`)),
      );
  }
  function informationPage(content) {
    $('.global-code-entry').hidden = true;
    main.innerHTML = content;
  }
  function searchPage(type, query = '') {
    type = 'all';
    query = cleanSearchQuery(query);
    $('.global-code-entry').hidden = false;
    const name = type === 'all' ? 'all activities' : type === 1 ? 'Core papers' : types[type].name;
    const selectedTypes = type === 'all' ? [0, 1, 2, 3] : [type];
    main.innerHTML = /* HTML */ `<nav class="breadcrumbs eyebrow" aria-label="Breadcrumb">
        <a href="${isExamBank(type) ? '#exam' : '#home'}"
          >${isExamBank(type) ? 'Exam practice' : 'All activities'}</a
        ><span aria-hidden="true">/</span
        ><a href="#search=${type}" aria-current="page">${esc(name)} search</a>
      </nav>
      <h1>Find practice by key term</h1>
      <p class="muted">Search all questions by topic, skill or specification reference.</p>
      <form class="topic-search-form" id="topic-search-form" role="search">
        <label for="topic-search">Key term or reference</label>
        <div>
          <input
            id="topic-search"
            type="search"
            maxlength="100"
            value="${esc(query)}"
            placeholder="Search all questions"
          /><button class="primary" type="submit">Search</button>
        </div>
      </form>
      <p id="search-status" role="status"></p>
      <section id="search-results" class="search-results" aria-label="Matching topics"></section>`;
    const show = () => {
      const value = cleanSearchQuery($('#topic-search').value);
      void navigation.go(`#search=${type}${value ? '&q=' + encodeURIComponent(value) : ''}`, {
        replace: true,
        guard: false,
        draw: false,
      });
      const groups = selectedTypes
        .flatMap((bankType) =>
          searchGroups(
            banks[bankType].filter((q) => discoverableQuestion(q, bankType)),
            bankType,
            value,
            { focusNames, recipeNames: espRecipeNames },
          ),
        )
        .sort((a, b) => b.rank - a.rank || b.matches.size - a.matches.size);
      $('#search-status').textContent = !value
        ? 'Enter a key term to see matching topics and question counts.'
        : groups.length
          ? `${groups.reduce((total, g) => total + g.matches.size, 0)} matching questions across ${groups.length} ${groups.length === 1 ? 'topic' : 'topics'}.`
          : 'No matching topics in this section. Try a broader term or a specification reference.';
      $('#search-results').innerHTML = groups
        .map((group, index) => {
          const plan = searchPlan(group),
            titles = group.questions
              .filter((q) => group.matches.has(q.slot))
              .slice(0, 3)
              .map((q) => q.title);
          return /* HTML */ `<article class="search-result" data-search-bank="${group.type}">
            <h2>
              ${type === 'all'
                ? esc(group.type === 1 ? 'Core papers' : types[group.type].name) + ' · '
                : ''}${esc(group.label)}${group.recipe ? ' · ' + esc(group.recipeLabel) : ''}
            </h2>
            <p>
              ${group.matches.size} matching
              ${group.matches.size === 1 ? 'question' : 'questions'}${group.topics.size
                ? ' · ' + esc([...group.topics].slice(0, 4).join(', '))
                : ''}
            </p>
            <p class="muted">${titles.map(esc).join(' · ')}${group.matches.size > 3 ? ' …' : ''}</p>
            <p>
              ${!plan
                ? 'These matches cannot form a complete starter set. Broaden your search.'
                : plan.related
                  ? `This set includes ${plan.matched} matching ${plan.matched === 1 ? 'question' : 'questions'} and ${plan.related} related ${plan.related === 1 ? 'question' : 'questions'} from the same topic.`
                  : `All ${plan.entries.length} questions in this set match your search.`}
            </p>
            <button class="primary" data-search-result="${index}" ${plan ? '' : 'disabled'}>
              ${plan?.related ? 'Start set with related questions' : 'Start matching set'}
            </button>
          </article>`;
        })
        .join('');
      main.querySelectorAll('[data-search-result]').forEach(
        (button) =>
          (button.onclick = async () => {
            try {
              await start(makeSearchSet(groups[Number(button.dataset.searchResult)], value));
            } catch (error) {
              toast(error.message);
            }
          }),
      );
    };
    $('#topic-search-form').onsubmit = (event) => {
      event.preventDefault();
      navigate(`#search=all&q=${encodeURIComponent(cleanSearchQuery($('#topic-search').value))}`);
    };
    show();
    $('#topic-search').focus();
  }

  return { home, exam: examHome, search: searchPage, about, information: informationPage };
}
