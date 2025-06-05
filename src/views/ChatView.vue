<script setup lang="ts">
import ModelSelector from "@/components/global/ModeloSelector.vue";
import ChatWindow from "@/components/global/ChatWindow.vue";
import PropositoSelector from "@/components/global/PropositoSelector.vue";
</script>

<template>
    <ModelSelector class="hidden lg:flex" />
    <div class="flex-1 flex flex-col min-h-full space-y-4">
        <PropositoSelector :use-comparacion="false" />
        <ChatWindow class="grow" />
    </div>
</template>