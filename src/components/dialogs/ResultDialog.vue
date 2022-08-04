<script setup lang="ts">
import ScrapDialog from "../customs/ScrapDialog.vue";
import {useGameStore} from "../../stores/gameStore";

defineProps(['visible'])
defineEmits(['update:visible'])

const game = useGameStore()
</script>

<template>
  <scrap-dialog v-model:visible="visible" @update:visible="$emit('update:visible', false)" :title="$t('game.result.title')">
    <div class="flex flex-col space-y-3">
      <template v-for="topic in game.topics">
        <h3 class="text-xl border-b">{{ topic + " " + $t('game.with') + " " + game.key }}</h3>
        <div class="flex flex-col space-y-1.5">
          <div v-for="entry in game.results.get(game.key)" class="flex flex-row justify-between">
            <span>{{ entry['sender'] }}</span>
            <span>{{ entry['guesses'][topic] }}</span>
          </div>
        </div>
      </template>
    </div>
  </scrap-dialog>
</template>

