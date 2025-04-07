<script setup lang="ts">
import TopBar from "@/components/layout/TopBar.vue";
import ModelSelector from "@/components/global/ModeloSelector.vue";
import ChatWindow from "@/components/global/ChatWindow.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen max-h-screen dark:text-white">
    <TopBar />
    <div class="grow flex p-4 gap-4 overflow-y-auto overflow-x-hidden">
      <ModelSelector class="hidden lg:flex" />
      <ChatWindow class="flex-1" />
      <!-- <DatasetSelector class="hidden 2xl:flex" /> -->
    </div>
  </div>
</template>