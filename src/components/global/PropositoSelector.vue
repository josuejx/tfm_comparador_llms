<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  promptSystem: {
    type: String,
    default: "",
  },
  promptJuez: {
    type: String,
    default: "",
  },
  useComparacion: {
    type: Boolean,
    default: false,
  },
});
const promptSystemValue = ref(props.promptSystem || "");
const promptJuezValue = ref(props.promptJuez || "");

// Actualizar el valor de la propiedad `prompt` cuando cambie `promptValue`
watch(promptSystemValue, (newValue) => {
  let prompt = props.promptSystem || "";
  prompt = newValue;
});
watch(promptJuezValue, (newValue) => {
  let prompt = props.promptJuez || "";
  prompt = newValue;
});

const predefinidos = [
  {
    name: "❤️ Análisis de Sentimientos",
    descriptionSystem: `Eres un modelo de lenguaje que analiza el sentimiento de un texto. 
Tu tarea es clasificar el sentimiento del texto en una de las siguientes categorías: 'Positivo', 'Negativo' o 'Neutral'. 
Proporciona también el razonamiento detrás de tu clasificación.`,
    descriptionChat: `Eres un modelo de lenguaje que actúa como juez para comparar el análisis de sentimientos realizado por un modelo de IA. Tu tarea es:
            1. Leer los análisis del modelo sobre un texto.
            2. Evaluar sus respuestas en cuanto a precisión, claridad, coherencia y profundidad.
            3. Asignar al modelo una puntuación del 1 al 5 en cada uno de los siguientes criterios: precisión, claridad, coherencia, profundidad.
            4. Devuelve también los resultados en una tabla sencilla o como datos estructurados para graficar si es posible.
            5. Por último, proporciona un resumen textual de tu evaluación sobre el análisis realizado por el modelo.`,
    descriptionComparacion: `Eres un modelo de lenguaje que actúa como juez para comparar el análisis de sentimientos realizado por dos modelos diferentes de IA. Tu tarea es:
            1. Leer los análisis de ambos modelos sobre un mismo texto.
            2. Comparar sus respuestas en cuanto a precisión, claridad, coherencia y profundidad.
            3. Indicar cuál crees que es más acertado y por qué.
            4. Asignar a cada modelo una puntuación del 1 al 5 en cada uno de los siguientes criterios: precisión, claridad, coherencia, profundidad.
            5. Devuelve también los resultados en una tabla sencilla o como datos estructurados para graficar si es posible.
            6. Por último, proporciona un resumen textual de tu evaluación sobre el análisis realizado por ambos modelos.`,
  },
  {
    name: "📋​ Generación de Resumen",
    descriptionSystem: `Eres un modelo de lenguaje que genera un resumen de un texto. 
Tu tarea es leer el texto y generar un resumen que capture los puntos clave, manteniendo la coherencia y claridad del contenido original.`,
    descriptionChat: `Eres un modelo de lenguaje que actúa como juez para evaluar la calidad de un resumen generado por un modelo de IA. Tu tarea es:
            1. Leer el resumen generado por el modelo sobre un texto.
            2. Evaluar su precisión, claridad, coherencia y profundidad.
            3. Asignar al modelo una puntuación del 1 al 5 en cada uno de los siguientes criterios: precisión, claridad, coherencia, profundidad.
            4. Devuelve también los resultados en una tabla sencilla o como datos estructurados para graficar si es posible.
            5. Por último, proporciona un resumen textual de tu evaluación sobre el resumen realizado por el modelo.`,
    descriptionComparacion: `Eres un modelo de lenguaje que actúa como juez para comparar los resúmenes generados por dos modelos diferentes de IA. Tu tarea es:
            1. Leer los resúmenes generados por ambos modelos sobre un mismo texto.
            2. Comparar sus respuestas en cuanto a precisión, claridad, coherencia y profundidad.
            3. Indicar cuál crees que es más acertado y por qué.
            4. Asignar a cada modelo una puntuación del 1 al 5 en cada uno de los siguientes criterios: precisión, claridad, coherencia, profundidad.
            5. Devuelve también los resultados en una tabla sencilla o como datos estructurados para graficar si es posible.
            6. Por último, proporciona un resumen textual de tu evaluación sobre el resumen realizado por ambos modelos.`,
  },
  {
    name: "​​​👦​ Extracción de Entidades",
    descriptionSystem: `Eres un modelo de lenguaje que extrae entidades de un texto. 
Tu tarea es identificar y clasificar las entidades mencionadas en el texto, como personas, lugares, organizaciones, fechas, etc. 
Proporciona también una breve descripción de cada entidad extraída.`,
    descriptionChat: `Eres un modelo de lenguaje que actúa como juez para evaluar la calidad de la extracción de entidades realizada por un modelo de IA. Tu tarea es:
            1. Leer las entidades extraídas por el modelo sobre un texto.
            2. Evaluar su precisión, claridad, coherencia y profundidad.
            3. Asignar al modelo una puntuación del 1 al 5 en cada uno de los siguientes criterios: precisión, claridad, coherencia, profundidad.
            4. Devuelve también los resultados en una tabla sencilla o como datos estructurados para graficar si es posible.
            5. Por último, proporciona un resumen textual de tu evaluación sobre la extracción de entidades realizada por el modelo.`,
    descriptionComparacion: `Eres un modelo de lenguaje que actúa como juez para comparar la extracción de entidades realizada por dos modelos diferentes de IA. Tu tarea es:
            1. Leer las entidades extraídas por ambos modelos sobre un mismo texto.
            2. Comparar sus respuestas en cuanto a precisión, claridad, coherencia y profundidad.
            3. Indicar cuál crees que es más acertado y por qué.
            4. Asignar a cada modelo una puntuación del 1 al 5 en cada uno de los siguientes criterios: precisión, claridad, coherencia, profundidad.
            5. Devuelve también los resultados en una tabla sencilla o como datos estructurados para graficar si es posible.
            6. Por último, proporciona un resumen textual de tu evaluación sobre la extracción de entidades realizada por ambos modelos.`,
  },
];

function buttonClicked(item: any) {
  if (props.useComparacion) {
    promptJuezValue.value = item.descriptionComparacion;
    promptSystemValue.value = item.descriptionSystem;
  } else {
    promptJuezValue.value = item.descriptionChat;
    promptSystemValue.value = item.descriptionSystem;
  }
}
</script>

<template>
  <div
    class="bg-white dark:bg-theme-midnight rounded-2xl shadow-lg w-full p-4 space-y-4"
  >
    <div class="flex space-between items-center w-full">
      <h2 class="text-lg font-semibold w-full">Prompts</h2>
      <div class="flex items-center space-x-2 w-full justify-end">
        <button
          v-for="(item, index) in predefinidos"
          :key="index"
          class="bg-theme-lightgray dark:bg-theme-steelblue text-theme-darkgray dark:text-white px-4 py-2 rounded-full cursor-pointer hover:scale-105 active:scale-90 transition"
          @click="buttonClicked(item)"
        >
          {{ item.name }}
        </button>
      </div>
    </div>
    <div class="flex items-center space-x-4">
      <textarea
        v-model="promptSystemValue"
        class="p-2 rounded-2xl bg-theme-lightgray dark:bg-theme-steelblue w-full"
        placeholder="Escribe o selecciona qué quieres que el modelo seleccionado haga"
        rows="4"
      ></textarea>
      <textarea
        v-model="promptJuezValue"
        class="p-2 rounded-2xl bg-theme-lightgray dark:bg-theme-steelblue w-full"
        placeholder="Escribe o selecciona el comportamiento del modelo juez"
        rows="4"
      ></textarea>
    </div>
  </div>
</template>
