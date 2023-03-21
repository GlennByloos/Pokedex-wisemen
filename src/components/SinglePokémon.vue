<template>
  <router-link :to="{ name: 'pokémonSpecs', params: { id: pokémon.id } }" style="text-decoration: none; color: inherit;">
  <div class="pokémon">
    <img :src="pokémon.sprites.front_default" class="pokémonImg"/>
    <div class="test">
      <h4 style="font-weight: bold">{{ pokémon.name[0].toUpperCase() + pokémon.name.slice(1).toLowerCase() }}</h4>
      <p>Nr. {{ pokémon.id }}</p>
      <font-awesome-icon icon="fa-solid fa-chevron-right" style=" float: right; margin-right: 15px; margin-left: 7px; margin-top: 19px; height: 11px; width: auto; color: rgba(163,173,186,255);"/>
      <div v-for="type in pokémon.types" :key="type.slot" class="pill" :style="{background: colours[type.type.name]}">
        <span>{{ type.type.name[0].toUpperCase() + type.type.name.slice(1).toLowerCase() }}</span>
      </div>
    </div>
  </div>
  </router-link>
</template>

<script>

export default {
  props: ["pokémon"],
  setup() {
    const colours = {
      normal: '#A8A77A',
      fire: '#EE8130',
      water: '#6390F0',
      electric: '#F7D02C',
      grass: '#7AC74C',
      ice: '#96D9D6',
      fighting: '#C22E28',
      poison: '#A33EA1',
      ground: '#E2BF65',
      flying: '#A98FF3',
      psychic: '#F95587',
      bug: '#A6B91A',
      rock: '#B6A136',
      ghost: '#735797',
      dragon: '#6F35FC',
      dark: '#705746',
      steel: '#B7B7CE',
      fairy: '#D685AD',
    };

    return { colours }
  }
}

</script>

<style>

.pokémon {
  background-color: white;
  border-radius: 10px;
  margin-bottom: 11px;
  height: 70px;
  box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
}

.pokémonImg {
  width: 20%;
  height: auto;
  max-height: 72.8px;
  max-width: 72.8px;
  min-height: 72.8px;
  min-width: 72.8px;
  position: absolute;
}

/*.test {
  position: absolute;
}*/

.test h4 {
  margin-bottom: 0; 
  margin-left: 80px; 
  padding-top: 10px; 
  margin-top: 5px; 
  position: absolute;
  font-size: 15px;
}

.test p {
  color: rgba(152,157,159,255); 
  margin-top: 30px; 
  margin-left: 80px; 
  position: absolute;
}

.pill {
  display: inline;
  right: 10px;
  float: right;
  margin-right: 6px;
  margin-top: 13px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  color: #fff;
}
</style>