<script>
  import { fade, slide, scale } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';

  import axios from 'axios';

  const dispatch = createEventDispatcher();

  import Button from '../shared/Button.svelte';

  let fields = { name: '', email: '', password: '', password2: '' };
  let errors = { name: '', email: '', password: '', password2: '' };
  let valid = false;

  const submitHandler = async () => {
    valid = true;

    if (fields.name.length > 0) {
      errors.name = '';
    } else {
      errors.name = 'Name must be at least 1 characters long';
      valid = false;
    }

    const emailValid =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailValid.test(String(fields.email).toLowerCase())) {
      errors.email = '';
    } else {
      errors.email = 'Invalid email';
      valid = false;
    }

    const passwordValid =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    if (passwordValid.test(String(fields.password))) {
      errors.password = '';
    } else {
      errors.password =
        'Make sure your password is 8 characters long, and contains at least one lowercase letter, one uppercase letter, one number, and one special character.';
      valid = false;
    }

    if (fields.password2 !== fields.password) {
      errors.password2 = 'Passwords do not match';
      valid = false;
    } else {
      errors.password2 = '';
    }

    // Login User
    if (valid) {
      await axios({
        method: 'post',
        url: '/api/users',
        data: {
          name: fields.name,
          email: fields.email,
          password: fields.password,
        },
      })
        .then((response) => {
          dispatch('tabChange', 'Login');
        })
        .catch((error) => {
          errors.password2 = error.response.data;
        });
    }
  };
</script>

<div class="container mx-auto p-4" in:fade={{ duration: 200 }}>
  <div class="w-full md:w-1/2 lg:w-1/3 mx-auto my-12">
    <h1 class="text-lg font-bold">Register</h1>
    <form class="flex flex-col mt-4" on:submit|preventDefault={submitHandler}>
      <input
        type="text"
        name="name"
        class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
        placeholder="Full Name"
        bind:value={fields.name}
      />
      <div class="error">{errors.name}</div>
      <input
        type="email"
        name="email"
        class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
        placeholder="Email address"
        bind:value={fields.email}
      />
      <div class="error">{errors.email}</div>
      <input
        type="password"
        name="password"
        class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
        placeholder="Password"
        bind:value={fields.password}
      />
      <div class="error">{errors.password}</div>
      <input
        type="password"
        name="password2"
        class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
        placeholder="Retype Password"
        bind:value={fields.password2}
      />
      <div class="error">{errors.password2}</div>
      <Button type="primary" flat={true} padding="12px 12px" margintop="18px"
        >Register</Button
      >
      <div class="flex flex-col items-center mt-5">
        <p
          class="mt-1 text-xs font-light text-gray-500 register hover:text-gray-900"
          on:click={() => dispatch('tabChange', 'Login')}
        >
          Already got an account?
          <span class="ml-1 font-medium secondary-border">Log in now</span>
        </p>
      </div>
    </form>
  </div>
</div>

<style>
  .secondary-border {
    border-bottom: 2px solid #d91b42;
  }

  .register {
    cursor: pointer;
  }

  .error {
    font-weight: bold;
    font-size: 12px;
    color: #d91b42;
  }
</style>
