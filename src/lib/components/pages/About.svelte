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
      This site brings together puzzles, Core exam practice, Python challenges and Employer Set
      Project activities for Digital Software Development T Level students.
    </p>
    <p>
      Designed for 5–15 minute starters, the activities offer variety, immediate feedback/auto
      marking and repeat practice with different values and scenarios. Progress tracking, with
      revision priority identification and revision set generation helps students optimize revision
      time.
    </p>
  </section>
  <section aria-labelledby="about-roadmap">
    <h2 id="about-roadmap">What’s next?</h2>
    <ul>
      <li>Work through questions sets matching search term results.</li>
      <li>Enter missing Python answers directly in the code.</li>
      <li>
        Extend Core coverage beyond CA1 and CA2, and add more ESP activities, including flowcharts.
      </li>
      <li>Develop Year 2 Occupational Specialism practice.</li>
    </ul>
    <p>
      These are planned developments. Classroom feedback will help shape the content, accessibility
      and order of work.
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
</article>
