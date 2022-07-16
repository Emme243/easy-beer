export const searchQueryStore = {
  state: () => ({
    searchQuery: '',
  }),
  getters: {
    searchQuery: state => state.searchQuery,
  },
  mutations: {
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
  },
  actions: {
    setSearchQuery({ commit }, searchQuery) {
      commit('setSearchQuery', searchQuery || '');
    },
  },
};
