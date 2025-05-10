<script setup lang="ts">
import { HuggingFaceModels } from "@/services/huggingface.services";
import type { ModelRef } from "vue";

const model: ModelRef<{ id: string, name: string } | undefined> = defineModel();

defineProps<{
    valueChanged: () => void;
}>();
</script>

<template>
    <select class="border-1 border-slate-200 dark:border-slate-500 rounded-lg p-2" v-model="model" @change="valueChanged()">
        <option
            v-for="model in HuggingFaceModels"
            :key="model.id"
            :value="model.id">
            {{ model.name }}
        </option>
    </select>
</template>