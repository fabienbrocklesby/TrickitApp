<script>
  import { fade, slide, scale } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';

  export let title = 'Forgot Password';

  import axios from 'axios';

  const dispatch = createEventDispatcher();

  import Button from '../shared/Button.svelte';

  let fields = { email: '' };
  let errors = { email: '', password2: '' };
  let valid = false;

  const submitHandler = async () => {
    valid = true;

    const emailValid =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailValid.test(String(fields.email).toLowerCase())) {
      errors.email = '';
    } else {
      errors.email = 'Invalid email';
      valid = false;
    }

    // Send Email
    if (valid) {
      await axios({
        method: 'post',
        url: 'http://localhost:5000/api/users/sendemail',
        data: {
          email: fields.email,
        },
      })
        .then((response) => {
          dispatch('tabChange', 'UpdatePassword');
          console.log('Email sent');
        })
        .catch((error) => {
          errors.password2 = error.response.data;
        });
    }
  };
</script>

<div class="container mx-auto p-4" in:fade={{ duration: 200 }}>
  <div class="w-full md:w-1/2 lg:w-1/3 mx-auto my-12">
    <h1 class="text-lg font-bold">{title}</h1>
    <form class="flex flex-col mt-4" on:submit|preventDefault={submitHandler}>
      <input
        type="email"
        name="email"
        class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
        placeholder="Email address"
        bind:value={fields.email}
      />
      <div class="error">{errors.email}</div>
      <div class="error">{errors.password2}</div>
      <Button type="primary" flat={true} padding="12px 12px" margintop="18px"
        >Send Email</Button
      >
      {#if title !== 'Change Password'}
        <div class="flex flex-col items-center mt-1">
          <p
            class="mt-1 text-xs font-light text-gray-500 register hover:text-gray-900"
            on:click={() => dispatch('tabChange', 'Login')}
          >
            Remembered you password?
            <span class="ml-1 font-medium secondary-border">Click ME!</span>
          </p>
        </div>
      {/if}
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
