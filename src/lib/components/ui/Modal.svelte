<!-- Shared Bits UI dialog. The caller supplies dismissal policy and content. -->
<script>
  import { Dialog } from 'bits-ui';
  let {
    open,
    title,
    description = '',
    dismissible = true,
    onclose,
    children,
    id = undefined,
  } = $props();
</script>

<Dialog.Root
  {open}
  onOpenChange={(value) => {
    if (!value && dismissible) onclose();
  }}
>
  <Dialog.Portal>
    <Dialog.Overlay class="dialog-overlay" />
    <Dialog.Content
      {id}
      class="dialog-panel"
      onEscapeKeydown={(event) => {
        if (!dismissible) event.preventDefault();
      }}
      onInteractOutside={(event) => {
        if (!dismissible) event.preventDefault();
      }}
    >
      <Dialog.Title>{title}</Dialog.Title>
      {#if description}<Dialog.Description>{description}</Dialog.Description>{/if}
      {@render children()}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
