import { createRouter, createWebHistory } from 'vue-router'
import Pokedex from '../views/Pokedex.vue'
import PokémonSpecs from "../views/PokémonSpecs.vue"
import FavPokémon from '../views/FavPokémon.vue'
import PokémonTeam from '../views/PokemonTeam.vue'
import PageNotFound from '../views/PageNotFound.vue'

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
  },
  {
    path: '/pokemonTeam',
    name: 'pokémonTeam',
    component: PokémonTeam
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: PageNotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
