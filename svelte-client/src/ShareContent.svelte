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
import { copyToClipboard, saveToLocalStorage } from "./utils/browser";

type Shareable = {
  updatedAt: Date;
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
        updatedAt: new Date(),
        content: inputContent,
      },
    ];
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
    // @ts-ignore asdfsdfd
    navigator.bluetooth
      .requestDevice({ filters: [{ services: ["battery_service"] }] })
      .then(console.log);
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
            <i>({updatedAt.toLocaleTimeString()})</i>
          </div>
        </div>
      </li>
    {/each}
  </ul>
</section>
