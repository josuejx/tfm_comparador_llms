<script setup lang="ts">
const props = defineProps({
    prompt: {
        type: String,
        default: ''
    }
});

const predefinidos = [
    {
        name: 'Análisis de Sentimientos',
        description: `Eres un modelo de lenguaje que actúa como juez para comparar el análisis de sentimientos realizado por dos modelos diferentes de IA.
              Tu tarea es:
              1. Leer los análisis de ambos modelos sobre un mismo texto.
              2. Comparar sus respuestas en cuanto a precisión, claridad, coherencia y profundidad.
              3. Indicar cuál crees que es más acertado y por qué.
              4. Asignar a cada modelo una puntuación del 1 al 5 en cada uno de los siguientes criterios: precisión, claridad, coherencia, profundidad.
              5. Devuelve también los resultados en una tabla sencilla o como datos estructurados para graficar si es posible.
              6. Por último, proporciona un resumen textual de tu evaluación sobre el análisis realizado por ambos modelos.`
    },
    {
        name: 'Clasificación de Texto',
        description: 'Clasifica un texto en categorías predefinidas.'
    },
    {
        name: 'Generación de Resumen',
        description: 'Genera un resumen conciso de un texto largo.'
    },
    {
        name: 'Detección de Temas',
        description: 'Identifica los temas principales en un conjunto de documentos.'
    },
    {
        name: 'Extracción de Entidades',
        description: 'Extrae entidades nombradas como personas, organizaciones y lugares de un texto.'
    }
];

function handleChange(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    const value = textarea.value.trim();
    if (value) {
        let prompt = props.prompt || '';
        prompt = value;
    }
}
</script>

<template>
    <div class="bg-white dark:bg-theme-midnight rounded-2xl shadow-lg w-full p-4 space-y-4">
        <h2 class="text-lg font-semibold">Propósito del Análisis</h2>
        <textarea
            class="p-2 rounded-2xl bg-theme-lightgray dark:bg-theme-steelblue w-full"
            placeholder="Escribe o selecciona qué quieres que el modelo juez analice y cómo..."
            rows="4"
            @change="handleChange"
        ></textarea>
    </div>
</template>