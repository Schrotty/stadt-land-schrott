<script setup lang="ts">
import { Send, Check } from "lucide-vue-next";
import {useGameStore} from "../stores/gameStore";
import {useRoute} from "vue-router";
import {computed, onMounted, ref} from "vue";

const abc = "abcdefghijklmnopqrstuvwxyz"

const game = useGameStore()
const route = useRoute()

const round = ref(0)
const gameEntries = ref([{
  character: 'a',
  guesses: [],
  disabled: true,
  submit: true
}])

const validEntries = computed(() => gameEntries.value.filter(x => !x.disabled))
const code: string = route.params.identifier.toString()

onMounted(() => {
  game.decode(code)

  createEntry()
})

function createEntry() {
  gameEntries.value.push({
    character: abc.charAt(game.characters[round.value]).toUpperCase(),
    guesses: [],
    disabled: false,
    submit: false
  })

  round.value++
}

function submitEntry() {
  const entry = gameEntries.value.find(e => !e.submit)
  if (typeof entry !== "undefined") {
    entry.submit = true
  }

  if (round.value <= 25) {
    createEntry()
  }
}
</script>

<template>
  <div class="flex flex-col p-3 space-y-3">
    <h2 class="text-2xl">{{ game.name }}</h2>

    <div class="w-full bg-white rounded-md border border-2">
      <table class="w-full text-center">
        <thead>
        <tr>
          <th class="border-b border-slate-600 w-fit p-3"></th>
          <th v-for="topic in game.topics" class="border-b border-slate-600 p-1.5">{{ topic }}</th>
          <th class="border-b border-slate-600 p-1.5 w-32">Submit</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="entry in validEntries" :key="entry.character">
          <tr v-if="!entry.submit" class="border-b last:border-b-0">
            <td class="text-center p-3 pointer-events-none font-bold">{{ entry.character }}</td>
            <td v-for="topic in game.topics" class="px-1.5 py-3 text-center">
              <input v-model="entry.guesses[topic]" type="text" class="w-full p-3 border shadow-sm rounded text-center" :placeholder="topic">
            </td>

            <td class="text-center">
              <button @click="submitEntry" class="px-1.5 py-3 w-full text-center bg-transparent">
                <send class="inline" />
              </button>
            </td>
          </tr>

          <tr class="border-b last:border-b-0" v-else>
            <td class="text-center p-3 pointer-events-none font-bold">{{ entry.character }}</td>
            <td v-for="topic in game.topics" class="px-1.5 py-3 text-center">{{ entry.guesses[topic] || '/' }}</td>
            <td class="text-center">
              <check class="inline" />
            </td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>
  </div>
</template>