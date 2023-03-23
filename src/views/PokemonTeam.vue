<template>
  <div class="font" style="min-height: 900px;">
    <nav>
      <font-awesome-icon icon="fa-solid fa-chevron-left" style="color: white;"/>
      <router-link to="/" class="navBack"><a style="color: white;">Terug</a></router-link>
    </nav>
    
    <h3 class="whiteTitle" style="margin-bottom: 20px;">Mijn team</h3>

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
      document.body.style.background = "linear-gradient(to bottom right, rgba(72,69,158,255) 0%, rgba(123,50,220,255) 100%)";
      const pokémons = ref({});
      
      pokémons.value = store.state.pokémonList; 

      function teamFilter(val) {
        return val.name == store.state.pokémonTeamList[val.name]
      }

      const filtered = pokémons.value.filter(teamFilter);

      return { filtered }
    }
  }
</script>

<style>

</style>