
<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand :to="{ name : 'home' }">Code App</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="{ name : 'learners-list' }">Liste des élèves</b-nav-item>
        <b-nav-item :to="{ name : 'results-list' }">Liste des résultats</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
