<script>
  import { onMount } from 'svelte';
  import { fade, slide, scale } from 'svelte/transition';
  import axios from 'axios';
  import { createEventDispatcher } from 'svelte';
  import Button from '../shared/Button.svelte';
  import Card from '../shared/Card.svelte';

  const dispatch = createEventDispatcher();

  let tricks = [];

  const getTricks = async () => {
    try {
      let response = await axios.get('/api/tricks', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.length > 0) {
        tricks = response.data.reverse();
      } else {
        tricks = null;
      }
    } catch (error) {
      error = error;
    }
  };

  onMount(async () => {
    getTricks();
  });

  const deleteTrick = (id) => {
    axios
      .delete(`/api/tricks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        console.log(response);
        getTricks();
      })
      .catch((error) => {
        console.log(error);
      });
  };
</script>

<div class="p-5" in:fade={{ duration: 300 }}>
  <Button on:click={() => dispatch('tabChange', 'AddTrick')}
    >Trick Idea? Click ME!
  </Button>

  <div class="mx-10 mt-15 mb-20">
    {#if !tricks}
      <div class="mt-10 text-center text-xl">
        <h1>No Tricks Found ...</h1>
      </div>
    {:else}
      <ul>
        {#each tricks as trick}
          <div class="mt-10 text-center">
            <Card>
              <li class="trick-name">
                <span>{trick.trick}</span>
              </li>
              <Button
                flat={true}
                inverse={true}
                on:click={() => deleteTrick(trick._id)}
                >Landed this trick!
              </Button>
            </Card>
          </div>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style>
  .trick-name {
    font-size: 1.25rem;
    padding-bottom: 25px;
  }
</style>
