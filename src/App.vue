<script setup lang="ts">
import TopBar from "@/components/layout/TopBar.vue";
import ModelSelector from "@/components/global/ModeloSelector.vue";
import ChatWindow from "@/components/global/ChatWindow.vue";
import DatasetSelector from "@/components/global/DatasetSelector.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen dark:text-white">
    <TopBar />
    <div class="grow flex p-4 gap-4">
      <ModelSelector />
      <ChatWindow class="flex-1" />
      <DatasetSelector />
    </div>
  </div>
</template>