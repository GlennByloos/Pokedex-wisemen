import { createRouter, createWebHistory } from 'vue-router'
import Pokedex from '../views/Pokedex.vue'
import PokémonSpecs from "../views/PokémonSpecs.vue"

const routes = [
  {
    path: '/',
    name: 'pokedex',
    component: Pokedex
  },
  {
    path: '/pokémonSpecs/:id',
    name: 'pokémonSpecs',
    component: PokémonSpecs,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
