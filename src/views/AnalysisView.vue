<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useChatStore } from "@/stores/chat";
import { useCompareStore } from '@/stores/compare';
import router from '@/router';

const currentStore = computed(() => router.currentRoute.value.params.store);
const chatStore = useChatStore();
const compareStore = useCompareStore();

let isLoading = ref(false);
let analysisResults: any = null;

onMounted(async () => {
    isLoading.value = true;
    if (currentStore.value === 'chat') {
        analysisResults = await chatStore.analysisResults();
    } else {
        analysisResults = await compareStore.analysisResults();
    }
    isLoading.value = false;
});
</script>

<template>
    <div class="bg-white dark:bg-theme-midnight rounded-2xl shadow-lg w-full">
        <div class="p-4">
            <h2 class="text-lg font-semibold">Analysis Results</h2>
            <div v-if="isLoading" class="text-center">
                <p>Loading...</p>
            </div>
            <div v-else-if="analysisResults">
                <pre>{{ JSON.stringify(analysisResults, null, 2) }}</pre>
            </div>
            <div v-else>
                <p>No analysis results available.</p>
            </div>
        </div>
    </div>
</template>