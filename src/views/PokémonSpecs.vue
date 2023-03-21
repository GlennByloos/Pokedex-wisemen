<template>
  <div class="font">
    <nav style="margin-top: 20px;">
      <font-awesome-icon icon="fa-solid fa-chevron-left" style="color: white;"/>
      <router-link to="/" style="text-decoration: none; color: inherit; margin-left: 5px;"><a style="color: white;">Terug</a></router-link>
      <font-awesome-icon v-if="$store.getters.getFav" @click="$store.commit('deleteFav', pokémon.name)" icon="fa-solid fa-heart" style="float: right; margin-right: 5px; color: white; height: 20px; width: 20px;"/>
      <font-awesome-icon v-else-if="!$store.getters.getFav" @click="$store.commit('addFav', pokémon.name)" icon="fa-regular fa-heart" style="float: right; margin-right: 5px; color: white; height: 20px; width: 20px;" />
    </nav>

    <h3 style="margin-top: 10px; font-size: 32px; color: white; font-weight: bold;">{{ pokémon.name }}</h3>

    <img :src="imageLink" style="width: 180px; height: 180px; display: block; margin-left: auto; margin-right: auto;"/>
    
    <!-- ----------------------- About section ----------------------- -->
    
    <p style="font-weight: bold; font-size: 12px; color: white; margin-bottom: 4px;">ABOUT</p>

    <div class="boxWrapper">
      <div class="aboutText">
        {{ pokémonAbout }}
      </div>
      <div v-for="(value, key) in pokémonAboutList" :key="key.value" class="aboutSpecsWrapper">
        <div class="specsKey">
          {{ key }}
        </div>
        <div v-if="key == 'Type' && value.length == 2">
          <span style="background: lightseagreen" class="aboutPill">{{ value[0] }}</span> <span style="background: lightseagreen" class="aboutPill">{{ value[1] }}</span>
        </div>
        <div v-else-if="key == 'Type' && value.length == 1">
          <span style="background: lightseagreen" class="aboutPill">{{ value[0] }}</span>
        </div>
        <div v-else-if="key != 'Geslacht' && key != 'Type'" class="specsValue">
          {{ value }}
        </div>
        <div v-else-if="value == -1"> <!-- Genderless --> <!-- Gender-rate: The chance of this Pokémon being female, in eighths -->
          <font-awesome-icon icon="fa-solid fa-genderless" />
        </div>
        <div v-else-if="value == 0"> <!-- male -->
          <font-awesome-icon icon="fa-solid fa-mars" />
        </div>
        <div v-else-if="value == 8"> <!-- female -->
          <font-awesome-icon icon="fa-solid fa-venus" />
        </div>
        <div v-else-if="value > 0"> <!-- male/female -->
          <font-awesome-icon icon="fa-solid fa-venus-mars" />
        </div>
      </div>
    </div>
    
    <!-- ----------------------- end About section ----------------------- -->

    <!-- ----------------------- Stats section ----------------------- -->

    <p style="font-weight: bold; font-size: 12px; color: white; margin-bottom: 4px;">STATISTIEKEN</p>

    <div class="boxWrapper">
      <div v-for="(value, key) in pokémonStatsList" :key="key.value" class="statsSpecsWrapper">
        <div class="specsKey">
          {{ key }}
        </div>
        <div class="specsValue">
          {{ value }}
        </div>
        <div v-if="key == 'HP' || key == 'Defense' || key == 'Speed'" class="w-full bg-gray-200 rounded-full h-1">
          <div class="bg-red-600 h-1 rounded-full" :style="{width: value + '%'}"></div>
        </div>
        <div v-if="key == 'Attack' || key == 'Sp. Atk' || key == 'Sp. Def'" class="w-full bg-gray-200 rounded-full h-1">
          <div class="bg-green-600 h-1 rounded-full" :style="{width: value + '%'}"></div>
        </div>
      </div>
    </div>

    <!-- ----------------------- end Stats section ----------------------- -->

    <!-- ----------------------- Moves section ----------------------- -->

    <p style="font-weight: bold; font-size: 12px; color: white; margin-bottom: 4px;">MOVESET</p>

    <div class="boxWrapperMove">
        <div class="movesWrapper">
          <div v-for="(value, key) in pokémonMovesList" :key="key.value">
            <div>
              <span class="movesPill" style="background: rgba(32, 178, 171, 0.25); margin-right: 2px;">Level {{ value }}</span> <span style="font-size: 13px;">{{ key }}</span>
            </div>
          </div>
        </div>
    </div>
    

    <!-- ----------------------- end Moves section ----------------------- -->

  </div>
  <!--<router-view />-->
</template>

<script>
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import store from '../store'

export default {
  props: ["id"],
  setup(props) {
    const imageLink = ref("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + props.id + ".png")
    const pokémon = ref([])
    const pokémonSpecies = ref([])
    const pokémonAbout = ref()
    const pokémonAboutList = ref({})
    const pokémonStatsList = ref({})
    const pokémonMovesList = ref({})

    onMounted(async () => {

      try {
        let data = await fetch("https://pokeapi.co/api/v2/pokemon/" + props.id);
        let dataSpecies = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + props.id + "/");
        let pokémonCategory = "";
        let pokémonType = [];
        let pokémonMoves = {};
        let testArray = [];

        if (!data.ok) {
          throw Error("No data available");
        }
        pokémon.value = await data.json(); // pokémon api
        pokémonSpecies.value = await dataSpecies.json(); // pokémon-species api
        pokémonAbout.value = pokémonSpecies.value.flavor_text_entries[0].flavor_text.replace(/\f?\n|\f/g, " "); //get about text

        store.commit("setCurrentPokémon", pokémon.value.name);

        for (let i = 0; i < pokémonSpecies.value.genera.length; i++) { // find category in English
          if (pokémonSpecies.value.genera[i].language.name == "en") {
            pokémonCategory = pokémonSpecies.value.genera[i].genus;
            pokémonCategory = pokémonCategory.substring(0, pokémonCategory.length - 8); // delete last 8 chars. From "Seed Pokémon" to "Seed"
          }
        }

        for (let i = 0; i < pokémon.value.types.length; i++) { // find type(s) for pokémon
          pokémonType[i] = pokémon.value.types[i].type.name;
        }

        for (let i = 0; i < pokémon.value.moves.length; i++) {
          for (let j = 0; j < pokémon.value.moves[i].version_group_details.length; j++) {
            if (pokémon.value.moves[i].version_group_details[j].version_group.name == "sword-shield" && pokémon.value.moves[i].version_group_details[j].level_learned_at != 0) {
              pokémonMoves[pokémon.value.moves[i].move.name[0].toUpperCase() + pokémon.value.moves[i].move.name.slice(1).toLowerCase()] = pokémon.value.moves[i].version_group_details[j].level_learned_at;
            }
          }
        }

        for (let i = 0; i < 4; i++) {
          pokémonMovesList.value[Object.entries(pokémonMoves).sort((a,b) => a[1]-b[1])[i][0]] = Object.entries(pokémonMoves).sort((a,b) => a[1]-b[1])[i][1];
        }

        pokémonStatsList.value = {
          HP: pokémon.value.stats[0].base_stat,
          Attack: pokémon.value.stats[1].base_stat,
          Defense: pokémon.value.stats[2].base_stat,
          "Sp. Atk": pokémon.value.stats[3].base_stat,
          "Sp. Def": pokémon.value.stats[4].base_stat,
          Speed: pokémon.value.stats[5].base_stat
        }

        pokémonAboutList.value = { // get about specs
          Type: pokémonType,
          Nummer: pokémon.value.id,
          Hoogte: pokémon.value.height/10 + " m",
          Gewicht: pokémon.value.weight/10 + " kg",
          Category: pokémonCategory,
          Geslacht: pokémonSpecies.value.gender_rate,
          Vaardigheden: pokémon.value.abilities[0].ability.name[0].toUpperCase() + pokémon.value.abilities[0].ability.name.slice(1).toLowerCase()
        }
      } catch (err) {
        console.log(err.message);
      }
    })

    return { pokémon, imageLink, pokémonAbout, pokémonAboutList, pokémonStatsList, pokémonMovesList }

  }
}
</script>

<style>

.aboutSpecsWrapper {
  display: grid;
  grid-template-columns: 4fr 6fr;
  justify-items: start;
  margin-top: 12px
}

.statsSpecsWrapper {
  display: grid;
  /*align-self: center;*/
  grid-template-columns: 5fr 2fr 18fr;
  justify-items: start;
  /*margin-top: 6px*/
  align-items: center;
  grid-gap: 20px;
}

.boxWrapper {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
  margin-bottom: 30px;
}

.boxWrapperMove {
  background-color: white;
  border-radius: 10px;
  padding: 20px 0px 20px 13px;
  box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
  margin-bottom: 30px;
}

.aboutText {
  font-size: 14px;
  color: black;
}

.specsKey {
  color: rgba(152,157,159,255); 
  font-size: 14px;
}

.specsValue {
  font-size: 14px;
}

.aboutPill {
  border-radius: 20px;
  padding: 4px 10px;
  font-size: 11px;
  color: white;
}

.movesPill {
  border-radius: 20px;
  padding: 6px 11px;
  font-size: 11px;
  color: lightseagreen;
  border: 1px solid lightseagreen;
}

.movesWrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 10px;
  grid-column-gap: 0px;
}

</style>