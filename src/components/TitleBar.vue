<script setup lang="ts">
import { Github, Twitter, Settings } from 'lucide-vue-next';
import SettingsDialog from "./dialogs/SettingsDialog.vue";
import {ref} from "vue";

defineProps({
  title: String,
  github: String,
  twitter: String
})

const isOpen = ref(false)
</script>

<template>
  <div class="w-full mx-auto bg-fuchsia-700 p-3 shadow-md">
    <div class="flex flex-col text-center md:flex-row md:text-left justify-between space-y-3 md:space-y-0 w-full">
      <a href="#">
        <span class="text-white text-2xl md:text-lg">{{ title }}</span>
      </a>

      <div class="flex flex-row space-x-3 justify-center">
        <button @click="isOpen = true" class="bg-transparent text-white hover:text-fuchsia-200"><settings /></button>
        <div class="hidden md:w-1 md:border-l md:inline"></div>
        <a :href="github" target="_blank" class="text-white hover:text-fuchsia-200"><github /></a>
        <a :href="twitter" target="_blank" class="text-white hover:text-fuchsia-200"><twitter /></a>
      </div>
    </div>

    <!-- settings dialog -->
    <settings-dialog v-model:visible="isOpen" />
  </div>
</template>

