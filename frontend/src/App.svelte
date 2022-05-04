<script>
  import Header from './components/Header.svelte';
  import Login from './components/Login.svelte';
  import Register from './components/Register.svelte';
  import Home from './components/Home.svelte';
  import Songs from './components/Songs.svelte';
  import AddTrick from './components/AddTrick.svelte';
  import AddSong from './components/AddSong.svelte';
  import Profile from './components/Profile.svelte';
  import ForgotPassword from './components/ForgotPassword.svelte';
  import UpdatePassword from './components/UpdatePassword.svelte';

  import { onMount } from 'svelte';

  export let title = 'Forgot Password';

  // tabs
  let items = ['Login', 'Register'];
  let activeItem = 'Register';

  let LoggedIn = false;

  const LogIn = () => {
    if (localStorage.getItem('token')) {
      items = ['Home', 'Songs', 'Profile'];
      activeItem = 'Home';
      LoggedIn = true;
    }
  };

  const LogOut = () => {
    localStorage.removeItem('token');
    items = ['Login', 'Register'];
    activeItem = 'Login';
    LoggedIn = false;
  };

  const forgotTitle = (e) => {
    title = e.detail;
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
  {:else if activeItem === 'Home'}
    <Home on:tabChange={tabChange} />
  {:else if activeItem === 'Songs'}
    <Songs on:tabChange={tabChange} />
  {:else if activeItem === 'AddTrick'}
    <AddTrick on:tabChange={tabChange} />
  {:else if activeItem === 'AddSong'}
    <AddSong on:tabChange={tabChange} />
  {:else if activeItem === 'Profile'}
    <Profile
      on:tabChange={tabChange}
      on:Logout={LogOut}
      on:title={forgotTitle}
    />
  {:else if activeItem === 'ForgotPassword'}
    <ForgotPassword on:tabChange={tabChange} {title} />
  {:else if activeItem === 'UpdatePassword'}
    <UpdatePassword on:tabChange={tabChange} />
  {/if}
</main>

<style>
</style>
