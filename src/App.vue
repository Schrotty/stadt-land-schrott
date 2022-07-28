<script setup lang="ts">
import TitleBar from "./components/TitleBar.vue";
</script>

<template>
  <title-bar
      title="Stadt - Land - Schrott"
      github="https://github.com/Schrotty"
      twitter="https://twitter.com/RSchrottler"
  />

  <!-- content of the current route -->
  <router-view />
</template>
