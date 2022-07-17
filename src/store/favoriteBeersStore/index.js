export const favoriteBeersStore = {
  namespaced: true,
  state: {
    favoriteBeers: [],
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
    handleBeerInFavorites({ commit, getters }, beer) {
      const isBeerInFavorites = getters.isBeerInFavorites(beer.id);
      if (isBeerInFavorites) commit('removeBeerFromFavorites', beer.id);
      else commit('addBeerToFavorites', beer);
    },
    setFavoriteBeers({ commit }, beers) {
      commit('setFavoriteBeers', beers);
    },
    resetFavoriteBeers({ commit }) {
      commit('resetFavoriteBeers');
    },
  },
};
