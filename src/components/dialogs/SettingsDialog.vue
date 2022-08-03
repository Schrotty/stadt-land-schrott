<script setup lang="ts">
import ScrapDialog from "../customs/ScrapDialog.vue";

defineProps(['visible'])
defineEmits(['update:visible'])
</script>

<template>
  <scrap-dialog v-model:visible="visible" @update:visible="$emit('update:visible', false)" :title="$t('settings-title')">
    <div class="flex flex-col">
      <label for="locales" class="font-bold">{{ $t('language.title') }}</label>
      <select id="locales" class="border p-1.5 rounded shadow-sm" v-model="$i18n.locale">
        <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ $t(`language.${locale}`) }}</option>
      </select>
    </div>
  </scrap-dialog>
</template>