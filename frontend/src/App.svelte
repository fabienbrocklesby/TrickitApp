<script>
  import Header from './components/Header.svelte';
  import Login from './components/Login.svelte';
  import Register from './components/Register.svelte';

  import { onMount } from 'svelte';

  // tabs
  let items = ['Login', 'Register'];
  let activeItem = 'Register';

  let LoggedIn = false;

  const LogIn = () => {
    if (localStorage.getItem('token')) {
      items = ['Home', 'Songs'];
      LoggedIn = true;
    }
  };

  onMount(async () => {
    LogIn();
  });

  const tabChange = (e) => {
    activeItem = e.detail;
  };
</script>

<Header {activeItem} {items} on:tabChange={tabChange} />
<main>
  {#if activeItem === 'Login'}
    <Login on:tabChange={tabChange} on:LoggedIn={LogIn} />
  {:else if activeItem === 'Register'}
    <Register on:tabChange={tabChange} />
  {/if}
</main>

<style>
</style>
