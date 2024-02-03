<template>
  <div id="app">
    <header>
      <Navbar />
    </header>
    <router-view />
  </div>
</template>

<script setup>
import Navbar from './global-components/Navbar.vue';
</script>

<style scoped>
</style>
