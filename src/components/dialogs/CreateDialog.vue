<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionRoot } from "@headlessui/vue";
import { Plus, X, ClipboardCopy } from 'lucide-vue-next';
import {onMounted, ref} from "vue";
import {useToast} from "vue-toastification";

defineProps(['visible'])
defineEmits(['update:visible'])

const toaster = useToast()
const lobbyName = ref("")
const topic = ref("")
const code = ref("")
const topics = ref(["Stadt", "Land", "Schrott"])

onMounted(() => {
  updateLobbyCode()
})

function updateLobbyCode() {
  const lobbyObject = {
    name: lobbyName.value,
    topics: topics.value.filter(t => t !== ''),
    characters: getRandomCharacters()
  }

  code.value = btoa(JSON.stringify(lobbyObject))
}

function getRandomCharacters() {
  const chars: number[] = []

  let x: number;
  for (let i = 0; i < 26; i++) {
    do {
      x = Math.floor(Math.random() * (26 - 1 + 1)) + 1
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
  <transition-root
      :show="visible"
      as="template"
      enter="duration-900 ease-out"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="duration-200 ease-in"
      leave-from="opacity-100"
      leave-to="opacity-0">

    <Dialog @close="$emit('update:visible', false)" class="relative z-50">

      <!-- dialog backdrop -->
      <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div class="flex p-6 fixed inset-0 flex items-start justify-center">
        <DialogPanel class="relative w-full rounded-lg bg-white shadow-md overflow-hidden md:w-1/2">
          <DialogTitle as="h3" class="flex flex-row justify-between px-3 p-3 border-b border-gray-300">
            <span class="text-lg leading-6 font-medium text-gray-900">Create Game</span>
            <button class="bg-transparent" @click="$emit('update:visible', false)">
              <x :size="24" />
            </button>
          </DialogTitle>

          <!-- lobby options -->
          <div class="flex flex-col p-3 space-y-3">

            <!-- lobby name -->
            <div>
              <label for="name" class="font-bold">Name des Spiels</label>
              <input id="name" type="text" class="w-full border p-1.5 rounded shadow-sm" v-model="lobbyName"
                     placeholder="Schrottplatz" @change.prevent="updateLobbyCode" @keyup.enter="updateLobbyCode">
            </div>

            <!-- topics -->
            <div>
              <label for="topics" class="font-bold">Themen</label>
              <div class="flex flex-row">
                <input id="topics" type="text" class="w-full border border-r-0 p-1.5 rounded rounded-r-none shadow-sm" v-model="topic" placeholder="Stadt">
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
          </div>

          <div class="flex flex-col md:flex-row w-full justify-end p-3 space-y-3 md:space-x-3 md:space-y-0">
            <input v-model="code" type="text" class="md:w-full bg-white rounded border border-gray-300 text-gray-700 shadow-sm p-1.5" placeholder="Lobby Code">

            <button class="md:w-fit px-3 py-1.5 rounded bg-white border border-gray-300 text-gray-700 shadow-sm hover:bg-gray-50"
                    @click.prevent="copyCode">
              <clipboard-copy class="inline" />
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </transition-root>
</template>