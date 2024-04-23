import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import CreateView from '../views/CreateKnight/CreateKnightView.vue'
import HallOfHeroView from '../views/HallOfHero/HallOfHeroView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/hallOffHero',
      name: 'hallOffHero',
      component: HallOfHeroView
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView
    }
  ]
})

export default router
