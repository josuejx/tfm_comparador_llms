<script setup lang="ts">
import Utils from '@/utils/utils';
import MoonIcon from '@/assets/icons/MoonIcon.vue';
import SunIcon from '@/assets/icons/SunIcon.vue';
</script>

<template>
    <button @click="Utils.toggleDarkMode(undefined)"
        class="cursor-pointer rounded p-2 hover:scale-125 active:scale-95 transition">
        <MoonIcon color="#1C2E4C" class="size-4 dark:hidden" />
        <SunIcon color="#fff" class="size-4 hidden dark:block" />
    </button>
</template>