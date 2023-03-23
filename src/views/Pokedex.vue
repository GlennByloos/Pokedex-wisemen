<template>
  <div class="font">
    <nav>
      <img src="../assets/sort-icon.png" class="sortIcon"/>
      <img src="../assets/filter-icon.jpg" class="filterIcon"/>
    </nav>

    <h1 class="title">Pokédex</h1>

    <input type="text" placeholder="pokemon zoeken" class="searchBar" v-model="search" @input="e => search = e.target.value"/>

    <div class="teamFavWrapper">
      <router-link :to="{ name: 'pokémonTeam'}">
        <div class="myTeamWrapper">
          <div></div><div></div>
          <div class="teamFavTitle">Mijn team</div>
          <div class="teamText">{{ $store.getters.getLengthTeam }} pokemons</div>
        </div>
      </router-link>
      <router-link :to="{ name: 'favPokémon' }">
      <div class="myFavWrapper">
        <div></div><div></div>
        <div class="teamFavTitle">Favorieten</div>
        <div class="favText">{{ $store.getters.getLength }} pokemons</div>
      </div>
      </router-link>
    </div>
    <div v-if="pokémons.length == 0" >
      <div style="display: flex; justify-content: center; margin-top: 50px;"><a>loading</a></div>
      <div style="display: flex; justify-content: center;"><img src="../assets/pokeball.png" style="width: 60px; height: auto;"/></div>
    </div>
    <div v-else>
      <PokémonList :pokémons="matchingNames" />
    </div>
    <router-view />
  </div>
</template>

<script>

import PokémonList from "../components/PokémonList.vue"
import { ref, computed } from 'vue'
import store from '../store'

export default {
  name: "Pokedex",
  components: { PokémonList },
  setup() {
    const pokémons = ref([]);
    const search = ref("");

    document.body.style.backgroundColor = "white";
    document.body.style.background = "white";

    const load = async () => {
      try {
        let data = await fetch("https://stoplight.io/mocks/appwise-be/pokemon/57519009/pokemon");
        if (!data.ok) {
          throw Error("No data available");
        }
        pokémons.value = await data.json();
        store.commit("setPokémonList", pokémons.value);
      } catch (err) {
        console.log(err.message);
      }
    }
    load()

    const matchingNames = computed(() => {
      return pokémons.value.filter((name) => {

        if (isNaN(search.value) || search.value === "") {
          return name.name.includes(search.value.toLowerCase());
        } else if (!isNaN(search.value)) {
          //return name.id == search.value;                                       --> specific one number search
          return name.id.toString().includes(search.value.toString()); //         --> contains number search
        }

      })
    })
    return { pokémons, search, matchingNames }
  }
}

</script>

<style scoped>

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

/* ----------------------- Team/Favorites buttons section ----------------------- */

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

/* ----------------------- End Team/Favorites buttons section ----------------------- */

</style>