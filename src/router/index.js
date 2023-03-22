import { createRouter, createWebHistory } from 'vue-router'
import Pokedex from '../views/Pokedex.vue'
import PokémonSpecs from "../views/PokémonSpecs.vue"
import FavPokémon from '../views/FavPokémon.vue'

const routes = [
  {
    path: '/',
    name: 'pokedex',
    component: Pokedex
  },
  {
    path: '/pokemonSpecs/:id',
    name: 'pokémonSpecs',
    component: PokémonSpecs,
    props: true
  },
  {
    path: '/favoritePokemon',
    name: 'favPokémon',
    component: FavPokémon
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
