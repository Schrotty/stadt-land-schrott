<script setup lang="ts">
import { ref } from "vue";
import JoinDialog from "./dialogs/JoinDialog.vue";
import CreateDialog from "./dialogs/CreateDialog.vue";

const createDialogIsOpen = ref(false)
const joinDialogIsOpen = ref(false)
</script>

<template>
  <div class="flex flex-col md:flex-row mx-auto w-full justify-center space-y-6 md:space-x-6 md:space-y-0 p-6">

    <!-- create a new lobby -->
    <a href="#" @click="createDialogIsOpen = true" class="md:w-72 text-center bg-white border border-2 shadow-md rounded p-8 cursor-pointer hover:text-black hover:bg-fuchsia-50">
      <h2 class="text-2xl">Create Game</h2>
    </a>

    <!-- join a existing lobby -->
    <a href="#" @click="joinDialogIsOpen = true" class="md:w-72 text-center bg-white border border-2 shadow-md rounded p-8 cursor-pointer hover:text-black hover:bg-fuchsia-50">
      <h2 class="text-2xl">Join Game</h2>
    </a>
  </div>

  <!-- dialogs -->
  <join-dialog v-model:visible="joinDialogIsOpen" />
  <create-dialog v-model:visible="createDialogIsOpen" />
</template>

