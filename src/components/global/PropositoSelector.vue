<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
    prompt: {
        type: String,
        default: ''
    }
});
const promptValue = ref(props.prompt || '');

// Actualizar el valor de la propiedad `prompt` cuando cambie `promptValue`
watch(promptValue, (newValue) => {
    let prompt = props.prompt || '';
    prompt = newValue;
});

const predefinidos = [
    {
        name: '❤️ Análisis de Sentimientos',
        description: `Eres un modelo de lenguaje que actúa como juez para comparar el análisis de sentimientos realizado por dos modelos diferentes de IA. Tu tarea es:
            1. Leer los análisis de ambos modelos sobre un mismo texto.
            2. Comparar sus respuestas en cuanto a precisión, claridad, coherencia y profundidad.
            3. Indicar cuál crees que es más acertado y por qué.
            4. Asignar a cada modelo una puntuación del 1 al 5 en cada uno de los siguientes criterios: precisión, claridad, coherencia, profundidad.
            5. Devuelve también los resultados en una tabla sencilla o como datos estructurados para graficar si es posible.
            6. Por último, proporciona un resumen textual de tu evaluación sobre el análisis realizado por ambos modelos.`
    },
    {
        name: '📋​ Generación de Resumen',
        description: 'Genera un resumen conciso de un texto largo.'
    },
    {
        name: '​​​👦​ Extracción de Entidades',
        description: 'Extrae entidades nombradas como personas, organizaciones y lugares de un texto.'
    }
];
</script>

<template>
    <div class="bg-white dark:bg-theme-midnight rounded-2xl shadow-lg w-full p-4 space-y-4">
        <div class="flex space-between items-center w-full">
            <h2 class="text-lg font-semibold w-full">Propósito del Modelo Juez</h2>
            <div class="flex items-center space-x-2 w-full">
                <button 
                    v-for="(item, index) in predefinidos"
                    :key="index"
                    class="bg-theme-lightgray dark:bg-theme-steelblue text-theme-darkgray dark:text-white px-4 py-2 rounded-full cursor-pointer hover:scale-105 active:scale-90 transition"
                    @click="promptValue = item.description"
                >
                    {{ item.name }}
                </button>
            </div>
        </div>
        <textarea
            v-model="promptValue"
            class="p-2 rounded-2xl bg-theme-lightgray dark:bg-theme-steelblue w-full"
            placeholder="Escribe o selecciona qué quieres que el modelo juez analice y cómo..."
            rows="4"
        ></textarea>
    </div>
</template>