<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let items;
  export let activeItem;
</script>

<nav
  class="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full"
>
  <div class="container flex flex-wrap justify-between items-center mx-auto">
    <div class="sm:mb-0 title">
      <span class="text-2xl no-underline">Trickit</span>
    </div>
    <button
      data-collapse-toggle="mobile-menu"
      type="button"
      class="inline-flex items-center p-2 ml-3 text-sm  rounded-lg md:hidden dark:hover:bg-white dark:focus:ring-gray-100 no-border"
      aria-controls="mobile-menu"
      aria-expanded="false"
    >
      <span class="sr-only">Open main menu</span>
      <svg
        class="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clip-rule="evenodd"
        /></svg
      >
      <svg
        class="hidden w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        /></svg
      >
    </button>
    <div class="hidden w-full md:block md:w-auto" id="mobile-menu">
      <ul
        class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium"
      >
        {#each items as item}
          <li
            on:click={() => dispatch('tabChange', item)}
            data-collapse-toggle="mobile-menu"
          >
            <div class:active={item === activeItem}>{item}</div>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</nav>

<style>
  #mobile-menu {
    animation: fadeIn 0.5s;
    -webkit-animation: fadeIn 0.5s;
    -moz-animation: fadeIn 0.5s;
    -o-animation: fadeIn 0.5s;
    -ms-animation: fadeIn 0.5s;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-moz-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-o-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-ms-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .title {
    color: #d91b42;
  }

  .no-border {
    border: none;
  }

  ul {
    display: flex;
    justify-content: center;
    padding: 0;
    list-style-type: none;
  }

  li {
    margin: 0 16px;
    font-size: 20px;
    color: #555;
    cursor: pointer;
  }

  .active {
    color: #d91b42;
    padding-bottom: 4px;
  }
</style>
