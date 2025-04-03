<script setup lang="ts">
import { ref } from "vue";

const datasets = ref([
  { id: 1, name: "Dataset 1" },
  { id: 2, name: "Dataset 2" },
]);

const selectedDataset = ref(1);

const setSelectedDataset = (datasetId: number) => {
  selectedDataset.value = datasetId;
};
</script>

<template>
  <div class="bg-white dark:bg-theme-midnight rounded-2xl shadow-lg min-w-sm flex flex-col">
    <h2 class="text-lg p-4">Listado de Datasets</h2>
    <div class="grow flex flex-col gap-2 bg-theme-lightgray p-4 rounded-b-2xl">
      <div
        class="flex items-center gap-2 p-4 rounded-2xl cursor-pointer hover:scale-105 active:scale-95 transition"
        v-for="dataset in datasets"
        :key="dataset.id"
        @click="setSelectedDataset(dataset.id)"
        :class="{
          'bg-theme-seablue dark:bg-theme-steelblue':
            dataset.id === selectedDataset,
          'bg-white dark:bg-theme-midnight': dataset.id !== selectedDataset,
        }"
      >
        <p>{{ dataset.name }}</p>
      </div>
    </div>
  </div>
</template>
