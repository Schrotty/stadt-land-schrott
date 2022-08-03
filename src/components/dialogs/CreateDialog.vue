<script setup lang="ts">
import { Plus, X, ClipboardCopy } from 'lucide-vue-next';
import {onMounted, ref} from "vue";
import {useToast} from "vue-toastification";
import {cyrb53} from "../../crypto";
import ScrapDialog from "../customs/ScrapDialog.vue";

defineProps(['visible'])
defineEmits(['update:visible'])

const toaster = useToast()
const lobbyName = ref("")
const passwd = ref("")
const topic = ref("")
const code = ref("")
const topics = ref(["Stadt", "Land", "Schrott"])

onMounted(() => {
  updateLobbyCode()
})

function updateLobbyCode() {
  const lobbyObject = {
    pwd: passwd.value !== "" ? cyrb53(passwd.value) : "",
    payload: {
      name: lobbyName.value,
      topics: topics.value.filter(t => t !== ''),
      characters: getRandomCharacters(),
    }
  }

  code.value = btoa(JSON.stringify(lobbyObject))
}

function getRandomCharacters() {
  const chars: number[] = []

  let x: number;
  for (let i = 0; i < 26; i++) {
    do {
      x = Math.floor(Math.random() * (25 - 1 + 1))
    } while (chars.find(s => s === x))
    chars.push(x)
  }

  return chars
}

function addTopic() {
  topics.value.push(topic.value)
  topic.value = ""

  updateLobbyCode()
}

function removeTopic(topic: string) {
  topics.value = topics.value.filter(t => t !== topic)
  updateLobbyCode()
}

async function copyCode() {
  navigator.clipboard.writeText(code.value).then(() => {
    toaster.success("Code copied to clipboard")
  }).catch(() => {
    toaster.error("Unable to copy code")
  })
}
</script>

<template>
  <scrap-dialog v-model:visible="visible" @update:visible="$emit('update:visible', false)" :title="$t('game.create')">

    <!-- lobby name -->
    <div class="flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0">
      <div class="w-full">
        <label for="name" class="font-bold">{{ $t('game.label.name') }}</label>
        <input id="name" type="text" class="w-full border border-gray-200 p-1.5 rounded shadow-sm" v-model="lobbyName"
               :placeholder="$t('game.placeholder.name')" @change.prevent="updateLobbyCode" @keyup.enter="updateLobbyCode">
      </div>
    </div>

    <!-- topics -->
    <div>
      <label for="topics" class="font-bold">{{ $t('game.label.topics') }}</label>
      <div class="flex flex-row relative">
        <input id="topics" type="text" class="w-full border border-r-0 p-1.5 rounded rounded-r-none shadow-sm" v-model="topic" :placeholder="$t('game.placeholder.topics')">
        <button @click.prevent="addTopic" class="border p-1 rounded rounded-l-none hover:bg-gray-50 shadow-sm">
          <plus />
        </button>
      </div>

      <div class="flex flex-row space-x-1.5 justify-start mt-1.5">
        <template v-for="topic in topics">
          <div v-if="topic !== ''" class="flex flex-row justify-between rounded-lg bg-fuchsia-100 px-3 shadow-sm text-sm space-x-1 items-center">
            <span class="font-bold text-fuchsia-800 pointer-events-none">{{ topic }}</span>
            <button @click.prevent="removeTopic(topic)" class="bg-transparent">
              <x :size="12" class="text-fuchsia-900" />
            </button>
          </div>
        </template>
      </div>
    </div>

    <!-- lobby code -->
    <div class="flex flex-col group md:flex-row w-full justify-end space-y-3 md:space-x-3 md:space-y-0">
      <input v-model="code" type="text" readonly class="md:w-full bg-white rounded border border-gray-200 text-gray-700 shadow-sm p-1.5" :placeholder="$t('game.placeholder.code')">

      <button class="md:w-fit px-3 py-1.5 rounded bg-white border border-gray-200 text-gray-700 shadow-sm hover:bg-gray-50"
              @click.prevent="copyCode">
        <clipboard-copy class="inline" />
      </button>
    </div>
  </scrap-dialog>
</template>