<template>
  <div class="font">
    <nav>
      <font-awesome-icon icon="fa-solid fa-chevron-left" style="color: white;"/>
      <!--<router-link to="/" class="navBack"><a style="color: white;">Terug</a></router-link>-->
      <a style="color: white;" @click="this.$router.go(-1)">Terug</a>
      <font-awesome-icon v-if="$store.getters.getFav" @click="$store.commit('deleteFav', pokémon.name)" icon="fa-solid fa-heart" class="heartIcon"/>
      <font-awesome-icon v-else-if="!$store.getters.getFav" @click="$store.commit('addFav', pokémon.name)" icon="fa-regular fa-heart" class="heartIcon"/>
    </nav>

    <h3 class="whiteTitle">{{ pokémonName }}</h3>

    <img :src="imageLink" @click="showSingle" class="hqImage"/>
    
    <vue-easy-lightbox
      :visible="visibleRef"
      :imgs="imgsRef"
      :index="indexRef"
      @hide="onHide"
    ></vue-easy-lightbox>

    <!-- ----------------------- About section ----------------------- -->
    
    <p class="sectionTitle">ABOUT</p>

    <div class="boxWrapper">
      <div class="aboutText">
        {{ pokémonAbout }}
      </div>
      <div v-for="(value, key) in pokémonAboutList" :key="key.value" class="aboutSpecsWrapper">
        <div class="specsKey">
          {{ key }}
        </div>
        <div v-if="key == 'Type' && value.length == 2">
          <span :style="{background: $store.state.colours[pokémon.types[1].type.name]}" class="aboutPill">{{ value[1][0].toUpperCase() + value[1].slice(1).toLowerCase() }}</span> <span :style="{background: $store.state.colours[pokémon.types[0].type.name]}" class="aboutPill">{{ value[0][0].toUpperCase() + value[0].slice(1).toLowerCase() }}</span>
        </div>
        <div v-else-if="key == 'Type' && value.length == 1">
          <span :style="{background: $store.state.colours[pokémon.types[0].type.name]}" class="aboutPill">{{ value[0][0].toUpperCase() + value[0].slice(1).toLowerCase() }}</span>
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

    <p class="sectionTitle">STATISTIEKEN</p>

    <div class="boxWrapper">
      <div v-for="(value, key) in pokémonStatsList" :key="key.value" class="statsSpecsWrapper">
        <div class="specsKey" id="statText">
          {{ key }}
        </div>
        <div class="specsValue" id="statNumber">
          {{ value }}
        </div>
        <div v-if="key == 'HP' || key == 'Defense' || key == 'Speed'" class="w-full bg-gray-200 rounded-full h-1" id="progressBar">
          <div v-if="value < 100" class="bg-red-600 h-1 rounded-full" :style="{width: value + '%'}"></div>
          <div v-else-if="value >= 100" class="bg-red-600 h-1 rounded-full" :style="{width: '100%'}"></div>
        </div>
        <div v-if="key == 'Attack' || key == 'Sp. Atk' || key == 'Sp. Def'" class="w-full bg-gray-200 rounded-full h-1" id="progressBar">
          <div v-if="value < 100" class="bg-green-600 h-1 rounded-full" :style="{width: value + '%'}"></div>
          <div v-else-if="value >= 100" class="bg-green-600 h-1 rounded-full" :style="{width: '100%'}"></div>
        </div>
      </div>
    </div>

    <!-- ----------------------- end Stats section ----------------------- -->

    <!-- ----------------------- Moves section ----------------------- -->

    <p class="sectionTitle">MOVESET</p>

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
import store from '../store'
import VueEasyLightbox from 'vue-easy-lightbox'

export default {
  props: ["id"],
  components: {
    VueEasyLightbox
  },
  setup(props) {
    const imageLink = ref("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + props.id + ".png");
    const pokémon = ref([]);
    const pokémonSpecies = ref([]);
    const pokémonAbout = ref();
    const pokémonId = ref();
    const pokémonAboutList = ref({});
    const pokémonStatsList = ref({});
    const pokémonMovesList = ref({});
    const pokémonName = ref();

    const visibleRef = ref(false);
    const indexRef = ref(0); // default 0
    const imgsRef = ref([]);

    onMounted(async () => {

      try {
        let data = await fetch("https://pokeapi.co/api/v2/pokemon/" + props.id);
        let dataSpecies = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + props.id + "/");
        let pokémonCategory = "";
        let pokémonType = [];
        let pokémonMoves = {};

        if (!data.ok) {
          throw Error("No data available");
        }
        pokémon.value = await data.json(); // pokémon api
        pokémonSpecies.value = await dataSpecies.json(); // pokémon-species api

        store.commit("setColor", pokémon.value.types[0].type.name);
        store.commit("setCurrentPokémon", pokémon.value.name);
        document.body.style.backgroundColor = store.getters.getColor;
        document.body.style.background = store.getters.getColor;

        pokémonName.value = pokémon.value.name[0].toUpperCase() + pokémon.value.name.slice(1).toLowerCase();

        /* ----------------------- About section ----------------------- */

        for (let i = 0; i < pokémonSpecies.value.flavor_text_entries.length; i++) {
          if(pokémonSpecies.value.flavor_text_entries[i].language.name == "en" && pokémonSpecies.value.flavor_text_entries[i].version.name == "red") {
            pokémonAbout.value = pokémonSpecies.value.flavor_text_entries[i].flavor_text.replace(/\f?\n|\f/g, " ");
          }
        }

        for (let i = 0; i < pokémonSpecies.value.genera.length; i++) { // find category in English
          if (pokémonSpecies.value.genera[i].language.name == "en") {
            pokémonCategory = pokémonSpecies.value.genera[i].genus;
            pokémonCategory = pokémonCategory.substring(0, pokémonCategory.length - 8); // delete last 8 chars. From "Seed Pokémon" to "Seed"
          }
        }

        for (let i = 0; i < pokémon.value.types.length; i++) { // find type(s)
          pokémonType[i] = pokémon.value.types[i].type.name;
        }

        if (pokémon.value.id >= 0 && pokémon.value.id <= 9) { pokémonId.value = "00" + pokémon.value.id.toString() }
        else if (pokémon.value.id >= 10 && pokémon.value.id <= 99) { pokémonId.value = "0" + pokémon.value.id.toString() }
        else { pokémonId.value = pokémon.value.id.toString() }

        pokémonAboutList.value = { // get about data
          Type: pokémonType,
          Nummer: pokémonId.value,
          Hoogte: pokémon.value.height/10 + " m",
          Gewicht: pokémon.value.weight/10 + " kg",
          Category: pokémonCategory,
          Geslacht: pokémonSpecies.value.gender_rate,
          Vaardigheden: pokémon.value.abilities[0].ability.name[0].toUpperCase() + pokémon.value.abilities[0].ability.name.slice(1).toLowerCase()
        }

        /* ----------------------- End About section ----------------------- */

        for (let i = 0; i < pokémon.value.moves.length; i++) { // find move(s)
          for (let j = 0; j < pokémon.value.moves[i].version_group_details.length; j++) {
            if (pokémon.value.moves[i].version_group_details[j].version_group.name == /*"sword-shield"*/ "red-blue" && pokémon.value.moves[i].version_group_details[j].level_learned_at != 0) {
              pokémonMoves[pokémon.value.moves[i].move.name[0].toUpperCase() + pokémon.value.moves[i].move.name.slice(1).toLowerCase()] = pokémon.value.moves[i].version_group_details[j].level_learned_at;
            }
          }
        }

        if (Object.keys(pokémonMoves).length < 4) { // dynamic amount move(s) amount: 1 - 4
          for (let i = 0; i < Object.keys(pokémonMoves).length; i++) {
            pokémonMovesList.value[Object.entries(pokémonMoves).sort((a,b) => a[1]-b[1])[i][0]] = Object.entries(pokémonMoves).sort((a,b) => a[1]-b[1])[i][1];
          }
        } else {
          for (let i = 0; i < 4; i++) {
            pokémonMovesList.value[Object.entries(pokémonMoves).sort((a,b) => a[1]-b[1])[i][0]] = Object.entries(pokémonMoves).sort((a,b) => a[1]-b[1])[i][1];
          }
        }

        pokémonStatsList.value = { // get specs data
          HP: pokémon.value.stats[0].base_stat,
          Attack: pokémon.value.stats[1].base_stat,
          Defense: pokémon.value.stats[2].base_stat,
          "Sp. Atk": pokémon.value.stats[3].base_stat,
          "Sp. Def": pokémon.value.stats[4].base_stat,
          Speed: pokémon.value.stats[5].base_stat
        }

        
      } catch (err) {
        console.log(err.message);
      }
    })

    /* ----------------------- Lightbox section ----------------------- */

    const onShow = () => {
      visibleRef.value = true
    }
    const showSingle = () => {
      imgsRef.value = imageLink.value
      // or
      // imgsRef.value  = {
      //   title: 'this is a placeholder',
      //   src: 'http://via.placeholder.com/350x150'
      // }
      onShow()
    }
    const showMultiple = () => {
      imgsRef.value = [
        'http://via.placeholder.com/350x150',
        'http://via.placeholder.com/350x150'
      ]
      // or
      // imgsRef.value = [
      //   { title: 'test img', src: 'http://via.placeholder.com/350x150' },
      //   'http://via.placeholder.com/350x150'
      // ]
      indexRef.value = 0 // index of imgList
      onShow()
    }
    const onHide = () => (visibleRef.value = false)

    /* ----------------------- End Lightbox section ----------------------- */

    return { pokémon, imageLink, pokémonAbout, pokémonAboutList, pokémonStatsList, pokémonMovesList, visibleRef, indexRef, imgsRef, showSingle, showMultiple, onHide, pokémonName }

  }
}
</script>

<style scoped>

/* ----------------------- About section ----------------------- */

.aboutSpecsWrapper {
  display: grid;
  grid-template-columns: 4fr 6fr;
  justify-items: start;
  margin-top: 12px
}

.aboutText {
  font-size: 14px;
  color: black;
}

.aboutPill {
  border-radius: 20px;
  padding: 3px 10px;
  font-size: 11px;
  color: white;
}

/* ----------------------- End About section ----------------------- */

/* ----------------------- Stat section ----------------------- */

.statsSpecsWrapper {
  display: grid;
  grid-template-columns: 6fr 3fr 19fr;/*5fr 3fr 16fr;*//*5fr 3fr 17fr;*/
  align-items: center;
  margin-top: 6px;
}

#progressBar {
  grid-column: 3/4;
}

#statNumber {
  grid-column: 2/3;
}

#statText {
  grid-column: 1/2;
}

/* ----------------------- End Stat section ----------------------- */

/* ----------------------- Move section ----------------------- */

.boxWrapperMove {
  background-color: white;
  border-radius: 10px;
  padding: 20px 0px 20px 13px;
  box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
  margin-bottom: 30px;
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

/* ----------------------- End Move section ----------------------- */

.boxWrapper {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
  margin-bottom: 30px;
}

.heartIcon {
  float: right; 
  margin-right: 5px; 
  color: white; 
  height: 20px; 
  width: 20px;
}

.hqImage {
  width: 180px; 
  height: 180px; 
  display: block; 
  margin-left: auto; 
  margin-right: auto;
}

.specsKey {
  color: rgba(152,157,159,255); 
  font-size: 14px;
}

.specsValue {
  font-size: 14px;
}

.sectionTitle {
  font-weight: bold; 
  font-size: 12px; 
  color: white; 
  margin-bottom: 4px;
}
</style>