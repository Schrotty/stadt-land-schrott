<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionRoot } from "@headlessui/vue";
import { X } from 'lucide-vue-next';

defineProps(['visible', 'title'])
defineEmits(['update:visible'])
</script>

<template>
  <transition-root
      :show="visible"
      as="template"
      enter="duration-300 ease-out"
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
            <span class="text-lg leading-6 font-medium text-gray-900">{{ title }}</span>
            <button class="bg-transparent" @click="$emit('update:visible', false)">
              <x :size="24" />
            </button>
          </DialogTitle>

          <div class="flex flex-col p-3 space-y-3">
            <slot />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </transition-root>
</template>

