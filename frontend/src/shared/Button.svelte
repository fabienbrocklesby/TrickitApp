<script>
  export let type = 'primary';
  export let flat = false;
  export let inverse = false;
  export let padding = '8px 12px';
  export let margintop = '0px';
</script>

<button
  class={type}
  class:flat
  class:inverse
  on:click
  style="padding: {padding}; margin-top: {margintop}"
>
  <slot />
</button>

<style>
  button {
    border: 0;
    cursor: pointer;
    border-radius: 6px;
    padding: 8px 12px;
    font-weight: bold;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  }

  .primary {
    background-color: #d91b42;
    color: #fff;
  }

  .secondary {
    background-color: #45c496;
    color: #fff;
  }

  .flat {
    box-shadow: none;
  }

  .primary.inverse {
    color: #d91b42;
    background: #fff;
    border: 2px solid #d91b42;
  }

  .secondary.inverse {
    color: #45c496;
    background: #fff;
    border: 2px solid #45c496;
  }
</style>
