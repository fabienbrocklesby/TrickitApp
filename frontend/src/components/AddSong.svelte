<script>
  import Card from '../shared/Card.svelte';
  import Button from '../shared/Button.svelte';
  import { createEventDispatcher } from 'svelte';
  import { fade, slide, scale } from 'svelte/transition';

  import axios from 'axios';

  const dispatch = createEventDispatcher();

  let fields = { songName: '', songUrl: '' };

  let errors = { songName: '', songUrl: '' };

  let valid = false;

  const submitHandler = async () => {
    try {
      valid = true;

      if (fields.songName.length < 5) {
        errors.songName = 'Song name must be at least 5 characters long';
        valid = false;
      } else {
        errors.songName = '';
      }

      if (fields.songUrl.length < 8) {
        errors.songUrl = 'Song URL must be at least 5 characters long';
        valid = false;
      } else {
        errors.songUrl = '';
      }

      console.log(fields.songUrl);

      if (fields.songUrl.indexOf('https://') != 0) {
        fields.songUrl = 'https://' + fields.songUrl;
      } else {
        console.log('Correct URL');
      }

      if (valid) {
        await axios
          .post('/api/songs', fields, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((response) => {
            console.log(response);
            dispatch('tabChange', 'Songs');
          })
          .catch((error) => {
            console.log(error);
            errors = error.response.data.message;
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
</script>

<div in:fade={{ duration: 300 }}>
  <div class="mx-4 mt-4">
    <Button flat={true} on:click={() => dispatch('tabChange', 'Songs')}
      >Back</Button
    >
  </div>

  <div class="w-full md:w-1/2 lg:w-1/3 mx-auto my-12">
    <Card>
      <div class="p-4">
        <h1 class="text-xl font-semibold">Add Song</h1>
        <form
          class="flex flex-col mt-4"
          on:submit|preventDefault={submitHandler}
        >
          <input
            type="text"
            name="songname"
            class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            placeholder="Song Name"
            bind:value={fields.songName}
          />
          {#if errors.songName}
            <div class="error">{errors.songName}</div>
          {/if}
          <input
            type="text"
            name="songurl"
            class="px-4 mt-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            placeholder="Song Url"
            bind:value={fields.songUrl}
          />
          <div class="error">{errors.songUrl}</div>
          <Button flat={true} padding="12px 8px" margintop="20px"
            >Add Song!</Button
          >
        </form>
      </div>
    </Card>
  </div>
</div>

<style>
  .error {
    font-weight: bold;
    font-size: 12px;
    color: #d91b42;
  }
</style>
