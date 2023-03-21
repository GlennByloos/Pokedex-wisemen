<template>
  <div class="font">

    <img src="../assets/sort-icon.png" class="sortIcon"/>
    <img src="../assets/filter-icon.jpg" class="filterIcon"/>

    <h1 class="title">Pokédex</h1>

    <input type="text" placeholder="pokemon zoeken" class="searchBar" v-model="search" @input="e => search = e.target.value"/>

    <div class="teamFavWrapper">
      <router-link to="/">
        <div class="myTeamWrapper">
          <div></div><div></div>
          <div class="teamFavTitle">Mijn team</div>
          <div class="teamText">4 pokemons</div>
        </div>
      </router-link>
      <router-link to="/">
      <div class="myFavWrapper">
        <div></div><div></div>
        <div class="teamFavTitle">Favorieten</div>
        <div class="favText">12 pokemons</div>
      </div>
      </router-link>
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
      return pokémons.value.filter((name) => {

        if (isNaN(search.value) || search.value === "") {
          return name.name.includes(search.value.toLowerCase())
        } else if (!isNaN(search.value)) {
          //return name.id == search.value                                        --> specific one number search
          return name.id.toString().includes(search.value.toString()); //         --> contains number search
        }

      })
    })
    return { pokémons, search, matchingNames }
  }
}

</script>

<style>

.font {
  font-family:sans-serif;
  margin-left: 15px;
  margin-right: 15px;
}

.searchBar {
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  background-color: rgba(239,240,241,255);
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 8px;
  height: 37px;
  margin-bottom: 15px;
  margin-top: 15px;
}

.title {
  margin-top: 50px;
  font-size: 32px;
  font-weight: bold;
}

.sortIcon {
  width: 22px;
  height: auto;
  position: absolute;
  right: 15px;
  padding-top: 15px;
}

.filterIcon {
  width: 20px;
  height: auto;
  position: absolute;
  right: 45px;
  padding-top: 15px;
}

.teamFavWrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 15px;
  grid-gap: 10px;
}

.myTeamWrapper {
  padding: 13px;
  border-radius: 8px;
  display: grid;
  grid-template-rows: 2fr;
  background: linear-gradient(to bottom right, rgba(72,69,158,255) 0%, rgba(123,50,220,255) 100%);
  height: 100px;
}

.myFavWrapper {
  padding: 13px;
  display: grid;
  border-radius: 8px;
  grid-template-rows: 2fr;
  background: linear-gradient(to bottom right, rgba(96,203,158,255) 0%, rgba(25,208,217,255) 100%);
  height: 100px;
}

.teamFavTitle {
  color: white;
  font-size: 17px;
}

.teamText {
  color: rgba(164,146,215,255);
  font-size: 14px;
}

.favText {
  color: rgba(131,224,214,255);
  font-size: 14px;
}

</style>