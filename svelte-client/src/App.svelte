<style>
main {
  text-align: center;
  padding: 1em;
  max-width: 240px;
  margin: 0 auto;
}

h1 {
  color: #ff3e00;
  text-transform: uppercase;
  font-size: 4em;
  font-weight: 100;
}

@media (min-width: 640px) {
  main {
    max-width: none;
  }
}
</style>

<script lang="ts">
type Shareable = {
  createdAt: Date;
  content: string;
  title?: string;
};
let inputContent: string = "";
let shared: Shareable[] = [];

const handleClick = () => {
  // make sure shared content actually has stuff in it
  if (inputContent.trim()) {
    shared = [
      ...shared,
      {
        createdAt: new Date(),
        content: inputContent,
      },
    ];
  }
  inputContent = "";
};

const handleEnter = (e) => {
  if (e.key === "Enter") {
    handleClick();
  }
};
</script>

<main>
  <h1>webclip</h1>
  <p>Share ephemeral information</p>
  <div on:keydown="{handleEnter}">
    <input type="text" bind:value="{inputContent}" />
    <button on:click="{handleClick}">Share</button>
  </div>
  <div style="display: grid;
					 grid-row-gap: 8px;">
    {#each shared as { createdAt, content }}
      <div>
        {#if content.startsWith("http")}
          <a href="{content}" target="_blank">{content}</a>
        {:else}{content}{/if}
        <i style="font-style: italic">({createdAt.toLocaleTimeString()})</i>
      </div>
    {/each}
  </div>
</main>
