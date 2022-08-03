<script setup lang="ts">
import {ref} from "vue";
import ScrapDialog from "../customs/ScrapDialog.vue";

defineProps(['visible'])
defineEmits(['update:visible'])

const codeInput = ref("")
</script>

<template>
  <scrap-dialog v-model:visible="visible" @update:visible="$emit('update:visible', false)" :title="$t('game.join')">
    <div>
      <label for="codeInput" class="font-bold">Game Code</label>
      <div class="flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0">
        <input v-model="codeInput" id="codeInput" type="text" class="w-full border p-1.5 rounded shadow-sm" :placeholder="$t('game.placeholder.code')">
        <button :disabled="codeInput === ''" @click="$router.push({ name: 'Game', params: { identifier: codeInput }})" class="md:w-fit px-3 py-1.5 rounded bg-white border border-gray-300 text-gray-700 shadow-sm hover:bg-gray-50 disabled:hover:cursor-not-allowed disabled:bg-gray-100">{{ $t('game.short.join') }}</button>
      </div>
    </div>
  </scrap-dialog>
</template>