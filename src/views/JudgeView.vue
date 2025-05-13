<script setup>
import { ref, computed } from 'vue'
import RadarChart from './RadarChart.vue' // Componente que usa Chart.js o similar

const criterios = ['Precisión', 'Claridad', 'Coherencia', 'Profundidad']

// Este objeto simularía lo que devuelve GPT
const scores = ref({
  modelo1: {
    Precisión: 3,
    Claridad: 4,
    Coherencia: 3,
    Profundidad: 2
  },
  modelo2: {
    Precisión: 5,
    Claridad: 5,
    Coherencia: 5,
    Profundidad: 5
  }
})

const ganador = computed(() => {
  const total1 = Object.values(scores.value.modelo1).reduce((a, b) => a + b, 0)
  const total2 = Object.values(scores.value.modelo2).reduce((a, b) => a + b, 0)
  return total1 > total2 ? 'Modelo 1' : 'Modelo 2'
})

const chartData = computed(() => ({
  labels: criterios,
  datasets: [
    {
      label: 'Modelo 1',
      data: criterios.map(c => scores.value.modelo1[c]),
      fill: true
    },
    {
      label: 'Modelo 2',
      data: criterios.map(c => scores.value.modelo2[c]),
      fill: true
    }
  ]
}))
</script>

<template>
    <div class="p-4">
      <h2 class="text-xl font-bold mb-4">Comparativa del Modelo Juez</h2>
  
      <div v-if="scores">
        <RadarChart :data="chartData" />
  
        <table class="mt-6 w-full text-sm border">
          <thead class="bg-gray-100">
            <tr>
              <th class="p-2 text-left">Criterio</th>
              <th class="p-2 text-center">Modelo 1</th>
              <th class="p-2 text-center">Modelo 2</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="criterio in criterios" :key="criterio">
              <td class="p-2">{{ criterio }}</td>
              <td class="p-2 text-center">{{ scores.modelo1[criterio] }}</td>
              <td class="p-2 text-center">{{ scores.modelo2[criterio] }}</td>
            </tr>
          </tbody>
        </table>
  
        <div class="mt-4">
          <p><strong>Ganador:</strong> {{ ganador }}</p>
        </div>
      </div>
  
      <div v-else>
        <p>No hay resultados del modelo juez disponibles.</p>
      </div>
    </div>
  </template>

<style scoped>
table {
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
}
</style>