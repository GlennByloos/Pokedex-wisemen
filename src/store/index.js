import { createStore } from 'vuex'

export default createStore({
  state: {
    pokémonFavList: {},
    pokémonTeamList: {},
    pokémonList: [],
    bgColor: "#FFFFFF",
    currentPokémon: "",
    colours: {
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
    }
  },
  getters: {
    getFav(state) {
      if(state.pokémonFavList.length == 0) { return false; }
      for (const fav in state.pokémonFavList) {
        if(fav == state.currentPokémon) { return true; }
      }
      return false;
    },
    getTeam(state) {
      if(state.pokémonTeamList.length == 0) { return false; }
      for (const team in state.pokémonTeamList) {
        if(team == state.currentPokémon) { return true; }
      }
      return false;
    },
    getColor(state) {
      return state.bgColor
    },
    getLength(state) {
      var size = 0,
        key;
      for (key in state.pokémonFavList) {
        if (state.pokémonFavList.hasOwnProperty(key)) size++;
      }
      return size;
    },
    getLengthTeam(state) {
      var size = 0,
        key;
      for (key in state.pokémonTeamList) {
        if (state.pokémonTeamList.hasOwnProperty(key)) size++;
      }
      return size;
    }
  },
  mutations: {
    addFav(state, val) {
      state.pokémonFavList[val] = val
    }, 
    deleteFav(state, val) {
      delete state.pokémonFavList[val]
    },
    setCurrentPokémon(state, val) {
      state.currentPokémon = val;
    },
    setColor(state, val) {
      state.bgColor = state.colours[val];
    },
    setPokémonList(state, val) {
      state.pokémonList = val;
    },
    addTeam(state, val) {
      var size = 0,
        key;
      for (key in state.pokémonTeamList) {
        if (state.pokémonTeamList.hasOwnProperty(key)) size++;
      }
      if(size >= 0 && size <= 5) {
        state.pokémonTeamList[val] = val
      }
    }, 
    deleteTeam(state, val) {
      delete state.pokémonTeamList[val]
    },
  },
  actions: {
  },
  modules: {
  }
})
