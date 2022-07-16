export const paginationStore = {
  state: () => ({
    page: 1,
  }),
  getters: {
    page: state => state.page,
  },
  mutations: {
    setPage(state, page) {
      state.page = page;
    },
  },
  actions: {
    setPage({ commit }, page) {
      commit('setPage', +page || 1);
    },
    resetPage({ commit }) {
      commit('setPage', 1);
    },
  },
};
