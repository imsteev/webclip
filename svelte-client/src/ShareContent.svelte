<style>
h2 {
  margin: 0;
  padding: 0;
}
.humble-link {
  color: blue;
  cursor: pointer;
}

#clear-clipboard {
  color: red;
}

section {
  display: grid;
  place-content: center;
}

.currently-shared-item {
  text-align: left;
  list-style-type: circle;
  margin: 12px 0;
}
</style>

<script lang="ts">
import { onMount } from "svelte";

import { copyToClipboard, saveToLocalStorage } from "./utils/browser";

type SharedClip = {
  content: string;
  updatedAt?: Date;
  title?: string;
};
let inputContent: string = "";

onMount(() => {
  fetch("http://localhost:8000/clips")
    .then((resp) => resp.json())
    .then((sharedContent) => (shared = sharedContent));
});

let shared: SharedClip[] = [];

const handleClick = () => {
  // make sure shared content actually has stuff in it
  if (inputContent.trim()) {
    fetch("http://localhost:8000/clips", {
      method: "POST",
      body: JSON.stringify({
        content: inputContent,
      }),
    })
      .then((resp) => resp.json())
      .then((createdClip) => {
        shared = [...shared, createdClip];
      });
  }
  inputContent = "";
};

const handleClear = () => {
  shared = [];
};

const handleEnter = (e) => {
  if (e.key === "Enter") {
    handleClick();
  }
};

$: {
  if (shared.length) {
    saveToLocalStorage("__WEBCLIP__SHARED_CONTENT", shared);
  }
}
</script>

<div class="controls" on:keydown="{handleEnter}">
  <input type="text" bind:value="{inputContent}" />
  <button on:click="{handleClick}">Share</button>
  <button id="clear-clipboard" on:click="{handleClear}"
    >Clear entire clipboard</button>
</div>
<section>
  {#if shared.length}
    <h2 style="font-weight: 500; margin: 3rem 0 0 0;">Currently sharing:</h2>
  {/if}
  <ul class="currently-shared">
    {#each shared as { updatedAt, content }}
      <li class="currently-shared-item">
        <div>
          {#if content.startsWith("http")}
            <a href="{content}" target="_blank">{content}</a>
          {:else}{content}{/if}
          <div>
            <span
              class="humble-link"
              on:click="{() => copyToClipboard(content)}">Copy</span>
            <i>({new Date(updatedAt)?.toLocaleTimeString() ?? ""})</i>
          </div>
        </div>
      </li>
    {/each}
  </ul>
</section>
