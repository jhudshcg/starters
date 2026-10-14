<script>
  import { getContext } from 'svelte';
  import Home from '#lib/components/pages/Home.svelte';
  import Exam from '#lib/components/pages/Exam.svelte';
  import Search from '#lib/components/pages/Search.svelte';
  import About from '#lib/components/pages/About.svelte';
  import Information from '#lib/components/pages/Information.svelte';
  import Progress from '#lib/components/pages/Progress.svelte';
  import Go from '#lib/components/pages/Go.svelte';
  import Entry from '#lib/components/practice/Entry.svelte';
  import Activity from '#lib/components/practice/Activity.svelte';
  const context = getContext('application');
  const view = $derived(context.view),
    app = $derived(context.app),
    href = context.href;
</script>

{#if view.loading}<p role="status">Loading activities…</p>
{:else if view.route === '#progress'}{#key `${view.data.profileId}:${view.restoreRevision}`}<Progress
      {app}
      {view}
      {href}
    />{/key}
{:else if view.route === '#exam'}<Exam {href} />
{:else if view.route === '#go'}<Go {href} returnTo={view.goReturn} />
{:else if view.route === '#about'}<About {href} />
{:else if view.route === '#faq' || view.route === '#projects'}<Information
    route={view.route}
    {href}
  />
{:else if view.route.startsWith('#search=')}<Search {app} {view} {href} />
{:else if /^#practice=[0-3]$/.test(view.route)}<Entry
    {app}
    type={Number(view.route.slice(-1))}
    {href}
  />
{:else if view.route.startsWith('#set=') && view.set && view.data.active}<Activity
    {app}
    {view}
    {href}
  />
{:else}<Home {app} {view} {href} />{/if}
