<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useChatStore } from "@/stores/chat";
import { useCompareStore } from '@/stores/compare';
import router from '@/router';
import { formatFromString } from '@quilicicf/markdown-formatter';

const currentStore = computed(() => router.currentRoute.value.params.store);
const chatStore = useChatStore();
const compareStore = useCompareStore();

let isLoading = ref(false);
let analysisResults: any = null;
let formatedMarkdown = ref('');

onMounted(async () => {
    isLoading.value = true;
    if (currentStore.value === 'chat') {
        analysisResults = await chatStore.analysisResults();
    } else {
        analysisResults = await compareStore.analysisResults();
    }
    if (!analysisResults) {
        console.error('No analysis results found');
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
                <pre>{{ formatedMarkdown }}</pre>
            </div>
            <div v-else>
                <p>No analysis results available.</p>
            </div>
        </div>
    </div>
</template>