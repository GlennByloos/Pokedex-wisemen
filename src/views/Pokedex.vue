<template>
  <div class="font">

    <img src="../assets/sort-icon.png" class="sortIcon"/>
    <img src="../assets/filter-icon.jpg" class="filterIcon"/>

    <h1 class="title">Pokédex</h1>

    <input type="text" placeholder="pokemon zoeken" class="searchBar" v-model="search" @input="e => search = e.target.value"/>

    <div class="navbtns">
      <div class="myTeam">
        <router-link to="/" style="color: white; text-decoration: none; margin-bottom:0; font-size: 17px;">Mijn team</router-link>
        <p style="color: rgba(164,146,215,255); margin : 0; padding-top:5px; font-size: 14px;">4 pokemons</p>
      </div>
      <div class="myFavorates">
        <router-link to="/about" style="color: white; text-decoration: none; margin-bottom:0; font-size: 17px;">Favorieten</router-link>
        <p style="color: rgba(131,224,214,255); margin : 0; padding-top:5px; font-size: 14px;">12 pokemons</p>
      </div>
    </div>
    <PokémonList :pokémons="matchingNames" />
    <router-view />

  </div>
</template>

<script>

import PokémonList from "../components/PokémonList.vue"
import { ref, computed, watch } from 'vue'
import { Namespaces } from "@vue/compiler-core"

export default {
  name: "Pokedex",
  components: { PokémonList },
  setup() {
    const pokémons = ref([])
    const search = ref("")

    const load = async () => {
      try {
        let data = await fetch("https://stoplight.io/mocks/appwise-be/pokemon/57519009/pokemon")
        if (!data.ok) {
          throw Error("No data available")
        }
        pokémons.value = await data.json()
      } catch (err) {
        console.log(err.message);
      }
    }
    load()

    const matchingNames = computed(() => {
      return pokémons.value.filter((name) => name.name.includes(search.value.toLowerCase()))
    })
    return { pokémons, search, matchingNames }
  }
}

</script>

<style>

.myTeam {
  background: linear-gradient(to bottom right, rgba(72,69,158,255) 0%, rgba(123,50,220,255) 100%);
  padding: 10px;
  padding-top: 40px;
  padding-left: 15px;
  border-radius: 10px;
  margin-right: 4px;
  margin-top: 15px;
  margin-bottom: 15px;
  width: 50%;
  height: 50px;
}
.myFavorates {
  background: linear-gradient(to bottom right, rgba(96,203,158,255) 0%, rgba(25,208,217,255) 100%);
  padding: 10px;
  padding-top: 40px;
  padding-left: 15px;
  border-radius: 10px;
  margin-left: 4px;
  margin-top: 15px;
  margin-bottom: 15px;
  width: 50%;
  height: 50px;
}

.navbtns {
  display: flex;
}

.font {
  font-family:verdana;
  margin-left: 15px;
  margin-right: 15px;
}

.searchBar {
  box-sizing: border-box;
  width: 100%;
  font-size: 17px;
  border-radius: 8px;
  border: none;
  background-color: rgba(239,240,241,255);
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 8px;
}

.title {
  margin-top: 50px;
}

.sortIcon {
  width: 22px;
  height: auto;
  position: absolute;
  right: 15px;
}

.filterIcon {
  width: 20px;
  height: auto;
  position: absolute;
  right: 45px;
}
</style>