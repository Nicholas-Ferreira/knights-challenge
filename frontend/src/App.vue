<script setup lang="ts">
import { ref } from 'vue'

import './App.css'
import 'vue-toast-notification/dist/theme-bootstrap.css'

import RouterItems from './components/RouterItems.vue'

const isOpenMenu = ref(false)
</script>

<template>
  <nav class="menu">
    <h1 class="title-menu">Knights Challenge</h1>

    <div class="menu-items">
      <button class="menu-button" @click="isOpenMenu = !isOpenMenu">
        <v-icon name="gi-hamburger-menu" scale="1.5" />
      </button>

      <RouterItems />
    </div>
  </nav>

  <transition name="menu-mobile">
    <div v-if="isOpenMenu" class="menu-mobile">
      <RouterItems />
    </div>
  </transition>

  <section class="content-section">
    <RouterView />
  </section>
</template>
