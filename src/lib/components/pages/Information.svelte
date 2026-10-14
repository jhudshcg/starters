<!-- Trusted authored prose; only static links need adapting to the current deployment base. -->
<script>
  import { faqHTML } from '#domain/faq.js';
  import { pythonProjectsHTML } from '#domain/python-projects.js';
  let { route, href } = $props();
  const html = $derived(
    (route === '#faq' ? faqHTML() : pythonProjectsHTML()).replace(
      /href="(#[^"]*)"/g,
      (_, hash) => `href="${href(hash)}"`,
    ),
  );
</script>

{@html html}
