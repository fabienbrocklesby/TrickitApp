<script>
  import { fade, slide, scale } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';

  import axios from 'axios';

  const dispatch = createEventDispatcher();

  import Button from '../shared/Button.svelte';

  let fields = { resetToken: '', password: '', password2: '' };
  let errors = { resetToken: '', password: '', password2: '' };
  let valid = false;

  const submitHandler = async () => {
    valid = true;

    if (fields.resetToken.length > 6) {
      errors.resetToken = '';
    } else {
      errors.resetToken = 'Name must be at least 6 characters long';
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

    // Reset Password
    if (valid) {
      await axios({
        method: 'post',
        url: 'http://localhost:5000/api/users/updatepassword',
        data: {
          resetToken: fields.resetToken,
          password: fields.password,
        },
      })
        .then((response) => {
          if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
          }
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
    <h1 class="text-lg font-bold">Update Password</h1>
    <form class="flex flex-col mt-4" on:submit|preventDefault={submitHandler}>
      <input
        type="text"
        name="resetToken"
        class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
        placeholder="Reset Token"
        bind:value={fields.resetToken}
      />
      <div class="error">{errors.resetToken}</div>
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
        >Reset Password</Button
      >
    </form>
  </div>
</div>

<style>
  .error {
    font-weight: bold;
    font-size: 12px;
    color: #d91b42;
  }
</style>
