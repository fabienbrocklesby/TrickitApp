<script>
  import Card from '../shared/Card.svelte';
  import Button from '../shared/Button.svelte';
  import { createEventDispatcher } from 'svelte';
  import { fade, slide, scale } from 'svelte/transition';

  import axios from 'axios';

  const dispatch = createEventDispatcher();

  let fields = { trick: '' };

  let errors = '';

  const submitHandler = async () => {
    try {
      if (fields.trick.length < 5) {
        errors = 'Trick must be at least 5 characters long';
      } else {
        await axios
          .post('/api/tricks', fields, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((response) => {
            console.log(response);
            dispatch('tabChange', 'Home');
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
    <Button flat={true} on:click={() => dispatch('tabChange', 'Home')}
      >Back</Button
    >
  </div>

  <div class="w-full md:w-1/2 lg:w-1/3 mx-auto my-12">
    <Card>
      <div class="p-4">
        <h1 class="text-xl font-semibold">Add Trick</h1>
        <form
          class="flex flex-col mt-4"
          on:submit|preventDefault={submitHandler}
        >
          <input
            type="text"
            name="trickname"
            class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            placeholder="Trick Name"
            bind:value={fields.trick}
          />
          <div class="error">{errors}</div>
          <Button flat={true} padding="12px 8px" margintop="20px"
            >Add Trick!</Button
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
