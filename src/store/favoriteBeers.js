export const favoriteBeersStore = {
  namespaced: true,
  state: {
    favoriteBeers: [],
  },
  mutations: {
    addBeerToFavorites(state, beer) {
      state.favoriteBeers.push(beer);
    },
    removeBeerFromFavorites(state, id) {
      state.favoriteBeers = state.favoriteBeers.filter(beer => beer.id !== id);
    },
    setFavoriteBeers(state, beers) {
      state.favoriteBeers = beers;
    },
    resetFavoriteBeers(state) {
      state.favoriteBeers = [];
    },
  },
  actions: {
    addBeerToFavorites({ commit }, beer) {
      commit('addBeerToFavorites', beer);
    },
    removeBeerFromFavorites({ commit }, beerId) {
      commit('removeBeerFromFavorites', beerId);
    },
    setFavoriteBeers({ commit }, beers) {
      commit('setFavoriteBeers', beers);
    },
    resetFavoriteBeers({ commit }) {
      commit('resetFavoriteBeers');
    },
  },
  getters: {
    getAllFavoriteBeers(state) {
      return state.favoriteBeers;
    },
    isBeerInFavorites(state) {
      return id => {
        return state.favoriteBeers.some(beer => beer.id === id);
      };
    },
  },
};
