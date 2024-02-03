
<template>
  <nav>
    <router-link :to="{ name : 'learners-list' }">Liste des apprenants</router-link>
    <router-link :to="{ name : 'results-list' }">Liste des résultats</router-link>
  </nav>
</template>

<script setup>
</script>

<style scoped>
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
