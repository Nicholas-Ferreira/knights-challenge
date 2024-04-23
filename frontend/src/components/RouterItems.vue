<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <RouterLink to="/">
    <v-icon name="md-home-round" animation="ring" scale="1.5" speed="slow" hover="true" />
    <span>Home</span>
  </RouterLink>
  <RouterLink to="/hallOffHero">
    <v-icon name="gi-tombstone" animation="ring" scale="1.5" speed="slow" hover="true" />
    <span>Hall of Hero</span>
  </RouterLink>
  <RouterLink to="/create">
    <v-icon name="fa-user-plus" animation="ring" scale="1.5" speed="slow" hover="true" />
    <span>Create</span>
  </RouterLink>
</template>

<style scoped>
.menu-mobile a {
  color: var(--text-color);
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s;
  width: 200px;
}

.menu-mobile a span,
.menu a span {
  margin-left: 0.2rem;
}

.menu a {
  display: none;
  color: var(--text-color);
  text-decoration: none;
  font-size: 1.2rem;
}

.menu a.router-link-exact-active,
.menu-mobile a.router-link-exact-active {
  color: var(--green-color);
}

.menu a.router-link-exact-active:hover,
.menu-mobile a.router-link-exact-active:hover {
  background-color: transparent;
}

.menu a:first-of-type,
.menu-mobile a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  .menu a {
    display: initial;
  }
}
</style>
