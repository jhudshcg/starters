<script>
  import '#lib/styles/app.css';
  import AppShell from '#lib/components/AppShell.svelte';
  let { children } = $props();
</script>

<AppShell {children} />
