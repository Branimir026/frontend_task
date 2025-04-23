<script setup lang="ts">
import HomeView from '@/views/HomeView.vue'
</script>

<template>
    <HomeView />
</template>

<style>
::-webkit-scrollbar {
    width: 4px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
}

::-webkit-scrollbar-button {
    display: none;
}
</style>
