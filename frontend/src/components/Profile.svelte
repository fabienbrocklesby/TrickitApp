<script>
  import { onMount } from 'svelte';
  import axios from 'axios';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  import Card from '../shared/Card.svelte';
  import Button from '../shared/Button.svelte';

  let user = {};

  let fields = { email: '' };
  let errors = { email: '' };

  let valid = false;

  onMount(async () => {
    axios
      .get('http://localhost:5000/api/users/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        user = response.data;
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const updateEmail = async () => {
    valid = true;

    const emailValid =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailValid.test(String(fields.email).toLowerCase())) {
      errors.email = '';
    } else {
      errors.email = 'Invalid email';
      valid = false;
    }

    // Update user
    if (valid) {
      await axios({
        method: 'put',
        url: 'http://localhost:5000/api/users/update',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: {
          email: fields.email,
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data);
          errors.email = error.response.data;
        });
    }
  };
</script>

<div class="w-full md:w-1/2 lg:w-1/3 mx-auto mt-12">
  <Card>
    {#if user.name}
      <h1 class="text-xl font-semibold">My information:</h1>
      <h1 class="mt-8">User Name:</h1>
      <p
        class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
      >
        {user.name}
      </p>
      <h1 class="mt-6">Email:</h1>
      <form on:submit|preventDefault={updateEmail}>
        <input
          type="email"
          name="email"
          class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
          placeholder={user.email}
          style="color: #000"
          bind:value={fields.email}
        />
        <div class="error">{errors.email}</div>
        <Button margintop="15px" flat={true}>Update Email</Button>
      </form>
      <Button
        flat={true}
        margintop="24px"
        on:click={() => {
          dispatch('title', 'Change Password');
          dispatch('tabChange', 'ForgotPassword');
        }}>Change Password!</Button
      >
    {:else}
      <h1>Oops, there seems to be a problem ..</h1>
    {/if}
  </Card>
</div>

<div class="container mx-auto mt-4">
  <div class="w-full md:w-1/2 lg:w-1/3 mx-auto">
    <div class="flex flex-col mx-2">
      <Button
        on:click={() => {
          dispatch('Logout');
        }}
        type="primary"
        flat={true}
        inverse={true}
        padding="12px 12px"
        margintop="0px">Log Out</Button
      >
    </div>
  </div>
</div>

<style>
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: rgb(10, 10, 10);
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: rgb(8, 8, 8);
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: rgb(17, 17, 17);
  }

  .error {
    font-weight: bold;
    font-size: 12px;
    color: #d91b42;
  }
</style>
