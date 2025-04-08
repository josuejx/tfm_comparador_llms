<script setup lang="ts">
import logo_unir from '@/assets/img/logo_unir.vue';
import { isDarkMode } from '@/utils/utils';
</script>

<template>
    <div class="w-full">
        <div class="h-full bg-white dark:bg-theme-midnight rounded-2xl shadow-lg flex flex-col justify-center items-center p-4">
            <logo_unir :color="isDarkMode ? '#FFF' : '#000'" />
            <br />
            <p class="text-lg">Universidad Internacional de la Rioja (UNIR)</p>
            <p class="text-2xl font-bold">Escuela Superior de Ingeniería y Tecnología</p>
            <p class="text-lg">Master en Inteligencia Artificial y Aplicaciones</p>
            <br />
            <p class="text-2xl text-theme-seablue font-bold">Desarrollo de una Plataforma Web para la Experimentación con Modelos de Análisis de Sentimientos</p>
            <br />
            <p class="text-lg">Trabajo Fin de Master (TFM)</p>
            <br />
            <p><strong>Presentado por:</strong></p>
            <p class="text-lg">Josué García Asensi</p>
            <br />
            <p><strong>Dirigido por:</strong></p>
            <p class="text-lg">Ane Iturzaeta Agirre</p>
            <br />
            <p class="text-lg">Julio 2025</p>
        </div>
    </div>
</template>