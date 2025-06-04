<script setup lang="ts">
import ModelSelector from "@/components/global/ModeloSelector.vue";
import ChatWindow from "@/components/global/ChatWindow.vue";
import PropositoSelector from "@/components/global/PropositoSelector.vue";
import { useChatStore } from "@/stores/chat";

const chatStore = useChatStore();
</script>

<template>
    <ModelSelector class="hidden lg:flex" />
    <div class="flex-1 flex flex-col min-h-full space-y-4">
        <PropositoSelector :prompt="chatStore.prompt" />
        <ChatWindow class="grow" />
    </div>
    <!-- <DatasetSelector class="hidden 2xl:flex" /> -->
</template>