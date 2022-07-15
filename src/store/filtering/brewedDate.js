export const brewedDateStore = {
  namespaced: true,
  state: () => ({
    initialMonth: '',
    finalMonth: '',
  }),
  mutations: {
    setInitialMonth(state, month) {
      state.initialMonth = month;
    },
    setFinalMonth(state, month) {
      state.finalMonth = month;
    },
  },
  actions: {
    setInitialMonth({ commit }, month) {
      commit('setInitialMonth', month);
    },
    setFinalMonth({ commit }, month) {
      commit('setFinalMonth', month);
    },
    resetBrewedDate({ commit }) {
      commit('setInitialMonth', '');
      commit('setFinalMonth', '');
    },
  },
  getters: {
    getInitialMonth(state) {
      return state.initialMonth;
    },
    getFinalMonth(state) {
      return state.finalMonth;
    },
  },
};
