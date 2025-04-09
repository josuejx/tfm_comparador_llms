<script setup lang="ts">
import logo_unir from "@/assets/img/logo_unir.vue";
import { isDarkMode } from "@/utils/utils";
</script>

<template>
    <div class="w-full">
        <div
            class="h-full bg-white dark:bg-theme-midnight rounded-2xl shadow-lg flex flex-col justify-between p-4 gap-4">
            <div class="flex flex-col items-center">
                <logo_unir :color="isDarkMode ? '#FFF' : '#000'" class="w-60" />
                <p class="text-3xl font-bold">Trabajo Fin de Master (TFM)</p>
                <p class="text-2xl text-theme-seablue font-bold text-center">Desarrollo de una Plataforma Web para la
                Experimentación
                con Modelos de Análisis de Sentimientos</p>
            </div>
            <div class="text-center">
                <p><strong>Presentado por:</strong></p>
                <p class="text-lg">Josué García Asensi</p>
                <p class="mt-14"><strong>Dirigido por:</strong></p>
                <p class="text-lg">Ane Iturzaeta Agirre</p>
            </div>
            <div class="text-right">
                <p class="text-lg">Universidad Internacional de la Rioja (UNIR)</p>
                <p class="text-lg">Master en Inteligencia Artificial y Aplicaciones</p>
                <p class="text-lg">Julio 2025</p>
            </div>
        </div>
    </div>
</template>