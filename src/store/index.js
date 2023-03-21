import { createStore } from 'vuex'

export default createStore({
  state: {
    pokémonFavList: {},
    currentPokémon: ""
  },
  getters: {
    getFav(state) {
      if(state.pokémonFavList.length == 0) { return false; }
      for (const fav in state.pokémonFavList) {
        if(fav == state.currentPokémon) { return true; }
      }
      return false;
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
    }
  },
  actions: {
    setCP({ commit }, val) {
      commit("setCurrentPokémon", val)
    }
  },
  modules: {
  }
})
