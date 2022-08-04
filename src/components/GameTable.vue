<script setup lang="ts">
import { Send, Users, Check, Unlock } from "lucide-vue-next";
import {useGameStore} from "../stores/gameStore";
import {useRoute} from "vue-router";
import {computed, onMounted, ref} from "vue";
import Pusher from "pusher-js";
import axios from "axios";
import {generate} from "../username-generator";
import ResultDialog from "./dialogs/ResultDialog.vue";

const abc = "abcdefghijklmnopqrstuvwxyz"

const game = useGameStore()
const route = useRoute()

const resultDialog = ref(false)
const round = ref(0)
const pwd = ref("")
const gameEntries = ref([{
  character: '',
  guesses: [],
  disabled: true,
  submit: true,
  hidden: false
}])

const validEntries = computed(() => gameEntries.value.filter(x => !x.disabled))
const username = computed(() => generate())

const code: string = route.params.identifier.toString()

onMounted(() => {

  // decode lobby code
  game.decode(code, pwd.value)

  // subscribe to pusher channel
  const pusher = new Pusher('81913fabc6480cb453ff', {
    cluster: 'eu'
  });

  const channel = pusher.subscribe(game.lobby);
  channel.bind('entry-submit', function(payload: any) {
    if (!game.results.has(payload.entry.character)) {
      game.results.set(payload.entry.character, [])
    }

    game.results.get(payload.entry.character).push(payload.entry)
  });

  // create first entry
  createEntry()
})

function openResultDialog(character: string) {
  resultDialog.value = true
  game.key = character
}

function createEntry() {
  gameEntries.value.push({
    character: abc.charAt(game.characters[round.value]).toUpperCase(),
    guesses: [],
    disabled: false,
    submit: false,
    hidden: true
  })

  round.value++
}

function submitEntry() {
  const entry = validEntries.value.find(e => !e.submit)
  if (typeof entry !== "undefined") {
    entry.submit = true

    const mapped = game.topics.reduce((m, o) => {
      m.set(o, entry.guesses[o] || '/')
      return m
    }, new Map<string, string>())

    axios.post('https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/fn-a3fd04d3-7d8c-4886-b835-e6b78ce81cab/submit/submit', {
      __ow_data: {
        lobby: game.lobby,
        e: {
          sender: username.value,
          character: entry.character,
          guesses: Object.fromEntries(mapped.entries())
        }
      }
    })
  }

  if (round.value <= 25) {
    createEntry()
  }
}

function unlockEntry() {
  const entry = gameEntries.value.find(e => e.hidden)
  if (typeof entry !== "undefined") {
    entry.hidden = false
  }
}
</script>

<template>
  <div class="flex flex-col p-3 space-y-3">

    <!-- game name -->
    <div class="flex flex-row justify-between w-full">
      <h3 class="text-xl">{{ username }}</h3>
      <h2 class="text-2xl">{{ game.name }}</h2>
    </div>

    <!-- table version -->
    <div class="hidden w-full bg-white rounded-md border border-2 md:block">
      <table class="w-full text-center table-auto">
        <thead>
          <tr>
            <th class="border-b border-slate-600 w-16 p-3"></th>
            <th v-for="topic in game.topics" class="border-b border-slate-600 p-1.5">{{ topic }}</th>
            <th class="border-b border-slate-600 p-1.5 pr-3 w-16">{{ $t('game.submit') }}</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="entry in validEntries" :key="entry.character">
            <tr v-if="!entry.submit && !entry.hidden" class="border-b last:border-b-0">
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

            <tr class="border-b last:border-b-0" v-else-if="entry.submit">
              <td class="text-center p-3 pointer-events-none font-bold w-fit">{{ entry.character }}</td>
              <td v-for="topic in game.topics" class="px-1.5 py-3 text-center">{{ entry.guesses[topic] || '/' }}</td>
              <td class="text-center">
                <button @click="openResultDialog(entry.character)" class="w-full text-center px-1.5 py-3 hover:bg-gray-50">
                  <users class="inline " />
                </button>
              </td>
            </tr>

            <tr class="border-b last:border-b-0" v-else-if="entry.hidden">
              <td :colspan="game.topics.length + 2" class="p-3">
                <button @click="unlockEntry" class="px-1.5 py-3 w-full text-center bg-transparent hover:bg-gray-50">
                  <unlock class="inline" />
                </button>
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
          <div v-if="(!entry.submit && !entry.hidden) || entry.submit" class="flex flex-row w-full justify-between border-b p-3">
            <div class="text-2xl font-bold">{{ entry.character }}</div>
            <button v-if="!entry.submit" class="bg-transparent" @click="submitEntry">
              <Send :size="24" />
            </button>

            <button v-else class="bg-transparent">
              <Check :size="24" />
            </button>
          </div>

          <div v-if="entry.hidden">
            <button @click="unlockEntry" class="px-1.5 py-3 w-full text-center bg-transparent hover:bg-gray-50">
              <unlock class="inline" />
            </button>
          </div>

          <!-- guesses -->
          <template v-for="topic in game.topics">
            <div v-if="!entry.submit && !entry.hidden" class="flex flex-col p-3">
              <label :for="topic+entry.character" class="font-bold">{{ topic }}</label>
              <input :id="topic+entry.character" v-model="entry.guesses[topic]" type="text" class="w-full p-3 border shadow-sm rounded text-center" :placeholder="topic">
            </div>

            <div v-else-if="entry.submit" class="flex flex-row py-1.5 px-3 justify-between">
              <label :for="topic+entry.character" class="font-bold">{{ topic }}</label>
              <span>{{ entry.guesses[topic] || '/' }}</span>
            </div>
          </template>
        </div>
      </template>
    </div>

    <result-dialog v-model:visible="resultDialog" />
  </div>
</template>