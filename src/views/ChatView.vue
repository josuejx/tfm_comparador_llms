<script setup lang="ts">
import ModelSelector from "@/components/global/ModeloSelector.vue";
import ChatWindow from "@/components/global/ChatWindow.vue";
</script>

<template>
    <ModelSelector class="hidden lg:flex" />
    <ChatWindow class="flex-1" />
    <!-- <DatasetSelector class="hidden 2xl:flex" /> -->
</template>