<script setup lang="ts">
import { Send, Check, X } from "lucide-vue-next";
import {useGameStore} from "../stores/gameStore";
import {useRoute} from "vue-router";
import {computed, onMounted, ref} from "vue";

const abc = "abcdefghijklmnopqrstuvwxyz"

const game = useGameStore()
const route = useRoute()

const round = ref(0)
const pwd = ref("")
const gameEntries = ref([{
  character: '',
  guesses: [],
  disabled: true,
  submit: true
}])

const validEntries = computed(() => gameEntries.value.filter(x => !x.disabled))
const code: string = route.params.identifier.toString()

onMounted(() => {
  game.decode(code, pwd.value)
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

    <!-- table version -->
    <div class="hidden w-full bg-white rounded-md border border-2 md:block">
      <table class="w-full text-center">
        <thead>
        <tr>
          <th class="border-b border-slate-600 w-fit p-3"></th>
          <th v-for="topic in game.topics" class="border-b border-slate-600 p-1.5">{{ topic }}</th>
          <th class="border-b border-slate-600 p-1.5 w-32">{{ $t('game.submit') }}</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="entry in validEntries" :key="entry.character">
          <tr v-if="!entry.submit" class="border-b last:border-b-0">
            <td class="text-center p-3 pointer-events-none font-bold w-fit">{{ entry.character }}</td>
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
            <td class="text-center p-3 pointer-events-none font-bold w-fit">{{ entry.character }}</td>
            <td v-for="topic in game.topics" class="px-1.5 py-3 text-center">{{ entry.guesses[topic] || '/' }}</td>
            <td class="text-center">
              <check class="inline" />
            </td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>

    <!-- flex box version -->
    <div class="flex flex-col md:hidden space-y-3">
      <template v-for="entry in validEntries" :key="entry.character">
        <div class="flex flex-col border border-2 bg-white rounded shadow-sm">

          <!-- title bar -->
          <div class="flex flex-row w-full justify-between border-b p-3">
            <div class="text-2xl font-bold">{{ entry.character }}</div>
            <button v-if="!entry.submit" class="bg-transparent" @click="submitEntry">
              <Send :size="24" />
            </button>

            <button v-else class="bg-transparent">
              <Check :size="24" />
            </button>
          </div>

          <!-- guesses -->
          <template v-for="topic in game.topics">
            <div v-if="!entry.submit" class="flex flex-col p-3">
              <label :for="topic+entry.character" class="font-bold">{{ topic }}</label>
              <input :id="topic+entry.character" v-model="entry.guesses[topic]" type="text" class="w-full p-3 border shadow-sm rounded text-center" :placeholder="topic">
            </div>

            <div v-else class="flex flex-row py-1.5 px-3 justify-between">
              <label :for="topic+entry.character" class="font-bold">{{ topic }}</label>
              <span>{{ entry.guesses[topic] || '/' }}</span>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>