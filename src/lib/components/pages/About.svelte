<script>
  import { asset } from '$app/paths';
  let { href } = $props();
</script>

<article class="about-page">
  <nav class="breadcrumbs eyebrow" aria-label="Breadcrumb">
    <a href={href('#home')}>All activities</a><span aria-hidden="true">/</span><a
      href={href('#about')}
      aria-current="page">About</a
    >
  </nav>
  <p>
    <a href={asset('/THIRD_PARTY_NOTICES.md')}>Third-party software, GNU Go source and licences</a>
  </p>
  <h1>A small start.<br />A stronger understanding.</h1>
  <section aria-labelledby="about-purpose">
    <h2 id="about-purpose">Why this site?</h2>
    <p>
      Short, regular practice helps students recall what they know, spot gaps and build confidence.
      This site brings together Core exam practice, Python challenges, Employer Set
      Project activities and puzzles, for Digital Software Development T Level students.
    </p>
    <p>
      Designed initially for 5–15 minute starters, it can be used for longer revision and assessment activities. The activities offer variety, immediate feedback/auto
      marking and similar question practice with different values and scenarios. Progress tracking, with
      revision priority identification and revision set generation helps students optimize revision
      time. The app also in-browser Python execution, so allow basic Python programs to be written and tested, all directly on the webpage.
    </p>
  </section>
  <section aria-labelledby="about-roadmap">
    <h2 id="about-roadmap">What’s next?</h2>
    <ul>
      <li>Collaborative and real-time gamification features</li>
      <li>
        Extend Core coverage beyond CA1 and CA2, and add more ESP activities, including flowcharts.
      </li>
      <li>Develop Year 2 Occupational Specialism practice.</li>
    </ul>
    <p>
      These are planned developments. Classroom feedback will help shape the content. The app is in active development and feedback is welcome!
    </p>
  </section>
  <section aria-labelledby="about-author">
    <h2 id="about-author">Author and development</h2>
    <p>
      Created by <strong>Joe Hudson</strong>. Human-in-the-loop agentic development was used in the creation of this web app.
      Concept planning, app requirements and initial topic specifications, question styles, educational value assessment, sample content development and review, UI design, UX flows, technical and architectural code reviews, framework choices and harness development were made by me. AI was used to take care of most of the implementation and config and also to explore and critique ideas with. There's no way I could have made this app without using a Frontier model.
    </p>
  </section>
</article>
