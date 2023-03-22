<template>
  <router-view/>
  
</template>

<script>
import Pokedex from "./views/Pokedex.vue"

export default {
  name: "App",
  components: { Pokedex },
  setup() {
  
  }
}

</script>

<style> /* shared styles */

nav {
  margin-top: 20px;
}

.font {
  font-family:sans-serif;
  margin-left: 15px;
  margin-right: 15px;
}

.navBack {
  text-decoration: none; 
  color: inherit; 
  margin-left: 5px;
}

.whiteTitle {
  margin-top: 10px; 
  font-size: 32px; 
  color: white; 
  font-weight: bold;
}

</style>
