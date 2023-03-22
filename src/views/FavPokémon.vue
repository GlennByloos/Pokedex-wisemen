<template>
  <div class="font" style="min-height: 900px;">
    <nav>
      <font-awesome-icon icon="fa-solid fa-chevron-left" style="color: white;"/>
      <router-link to="/" class="navBack"><a style="color: white;">Terug</a></router-link>
    </nav>

    <h3 class="whiteTitle">Favorieten</h3>

    <PokémonList :pokémons="filtered" />

  </div>
</template>

<script>
import store from '../store'
import { ref } from 'vue'
import PokémonList from "../components/PokémonList.vue"

  export default {
    components: { PokémonList },
    setup() {
      document.body.style.background = "linear-gradient(to bottom right, rgba(96,203,158,255) 0%, rgba(25,208,217,255) 100%)";
      const pokémons = ref({});
      
      pokémons.value = store.state.pokémonList; 

      function favFilter(val) {
        return val.name == store.state.pokémonFavList[val.name]
      }

      console.log(store.state.pokémonFavList);

      const filtered = pokémons.value.filter(favFilter);

      return { filtered }
    }
  }
</script>

<style>

</style>