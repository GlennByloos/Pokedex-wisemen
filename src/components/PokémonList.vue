<template>
  
  <div class="pokemon-list">
    <div v-for="pokémon in pokémons" :key="pokémon.id">
      <SinglePokémon :pokémon="pokémon"/>
    </div>
  </div>
    
</template>

<script>
import SinglePokémon from "./SinglePokémon.vue"

export default {
  props: ["pokémons"],
  components: { SinglePokémon }
}

</script>

<style>

</style>