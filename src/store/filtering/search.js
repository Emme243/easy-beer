export const searchStore = {
  namespaced: true,
  state: () => ({
    search: '',
  }),
  getters: {
    search: state => state.search,
  },
  mutations: {
    setSearch(state, search) {
      state.search = search;
    },
  },
  actions: {
    setSearch({ commit }, search) {
      commit('setSearch', search);
    },
  },
};
