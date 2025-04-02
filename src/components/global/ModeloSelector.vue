<script setup lang="ts">
import { ref } from "vue";

const models = ref([
  { id: 1, name: "Modelo 1" },
  { id: 2, name: "Modelo 2" },
]);

const selectedModel = ref(1);

const setSelectedModel = (modelId: number) => {
  selectedModel.value = modelId;
};
</script>

<template>
  <div
    class="bg-white dark:bg-theme-midnight rounded-2xl shadow-lg min-w-sm flex flex-col"
  >
    <h2 class="text-lg p-4">Listado de modelos</h2>
    <div class="grow flex flex-col gap-2 bg-theme-lightgray p-4 rounded-b-2xl">
      <div
        class="flex items-center gap-2 p-4 rounded-2xl cursor-pointer hover:scale-105 active:scale-95 transition"
        v-for="model in models"
        :key="model.id"
        @click="setSelectedModel(model.id)"
        :class="{
          'bg-theme-seablue dark:bg-theme-steelblue':
            model.id === selectedModel,
          'bg-white dark:bg-theme-midnight': model.id !== selectedModel,
        }"
      >
        <p>{{ model.name }}</p>
      </div>
    </div>
  </div>
</template>
