<script setup lang="ts">
import { Github, Twitter } from 'lucide-vue-next';

defineProps({
  title: String,
  github: String,
  twitter: String
})
</script>

<template>
  <div class="w-full mx-auto bg-fuchsia-700 p-3 shadow-md">
    <div class="flex flex-col text-center md:flex-row md:text-left justify-between space-y-3 md:space-y-0 w-full">
      <a href="#">
        <span class="text-white text-lg">{{ title }}</span>
      </a>

      <div class="flex flex-row space-x-3 justify-center">
        <a :href="github" target="_blank" class="text-white hover:text-fuchsia-200"><github /></a>
        <a :href="twitter" target="_blank" class="text-white hover:text-fuchsia-200"><twitter /></a>
      </div>
    </div>
  </div>
</template>

