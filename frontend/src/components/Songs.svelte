<script>
  import { onMount } from 'svelte';
  import { fade, slide, scale } from 'svelte/transition';
  import axios from 'axios';

  import Button from '../shared/Button.svelte';
  import Card from '../shared/Card.svelte';

  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let songs = [];

  const getsongs = async () => {
    try {
      let response = await axios.get('/api/songs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.length > 0) {
        songs = response.data.reverse();
      } else {
        songs = null;
      }
    } catch (error) {
      error = error;
    }
  };

  onMount(async () => {
    getsongs();
  });

  const deleteSong = (id) => {
    axios
      .delete(`/api/songs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        console.log(response);
        getsongs();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const redirect = (url) => {
    location.href = url;
  };
</script>

<div class="p-5" in:fade={{ duration: 300 }}>
  <Button on:click={() => dispatch('tabChange', 'AddSong')}
    >Found a song? Lets add it!
  </Button>

  <div class="mx-10 mt-20 mb-20">
    {#if !songs}
      <div class="mt-10 text-center text-xl">
        <h1>No Songs Found ...</h1>
      </div>
    {:else}
      <ul>
        {#each songs as song}
          <div class="mt-10 text-center">
            <Card>
              <li class="song-name">
                <span>{song.songName}</span><br />
              </li>
              <Button
                flat={true}
                inverse={true}
                margintop="10px"
                on:click={() => {
                  redirect(song.songUrl);
                }}
                >Play This Song
              </Button><br />
              <Button
                flat={true}
                margintop="7.5px"
                inverse={true}
                on:click={() => deleteSong(song._id)}
                >Used this song
              </Button>
            </Card>
          </div>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style>
  .song-name {
    font-size: 1.25rem;
    padding-bottom: 25px;
  }
</style>
