export const brewedDateStore = {
  state: () => ({
    initialBrewedMonth: '',
    finalBrewedMonth: '',
  }),
  getters: {
    initialBrewedMonth(state) {
      return state.initialBrewedMonth;
    },
    finalBrewedMonth(state) {
      return state.finalBrewedMonth;
    },
  },
  mutations: {
    setInitialBrewedMonth(state, month) {
      state.initialBrewedMonth = month;
    },
    setFinalBrewedMonth(state, month) {
      state.finalBrewedMonth = month;
    },
  },
  actions: {
    setInitialBrewedMonth({ commit, dispatch }, month) {
      commit('setInitialBrewedMonth', month || '');
    },
    setFinalBrewedMonth({ commit, dispatch }, month) {
      commit('setFinalBrewedMonth', month || '');
    },
    resetBrewedDate({ commit }) {
      commit('setInitialBrewedMonth', '');
      commit('setFinalBrewedMonth', '');
    },
  },
};
