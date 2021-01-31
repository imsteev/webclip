<style>
:global(:root) {
  font-size: 16px;
}

main {
  text-align: center;
  margin: 0 auto;
}

h1 {
  color: #ff3e00;
  text-transform: uppercase;
  font-size: 4em;
  font-weight: 100;
}
</style>

<script lang="ts">
import ShareContent from "./ShareContent.svelte";
</script>

<main>
  <h1>webclip</h1>
  <p>Share ephemeral information</p>
  <ShareContent />
</main>
