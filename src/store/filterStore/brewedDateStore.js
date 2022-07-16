export const brewedDateStore = {
  state: () => ({
    initialBrewedMonth: '',
    finalBrewedMonth: '',
  }),
  mutations: {
    setInitialBrewedMonth(state, month) {
      state.initialBrewedMonth = month;
    },
    setFinalBrewedMonth(state, month) {
      state.finalBrewedMonth = month;
    },
  },
  actions: {
    setInitialBrewedMonth({ commit }, month) {
      commit('setInitialBrewedMonth', month || '');
    },
    setFinalBrewedMonth({ commit }, month) {
      commit('setFinalBrewedMonth', month || '');
    },
    resetBrewedDate({ commit }) {
      commit('setInitialBrewedMonth', '');
      commit('setFinalBrewedMonth', '');
    },
  },
  getters: {
    initialBrewedMonth(state) {
      return state.initialBrewedMonth;
    },
    finalBrewedMonth(state) {
      return state.finalBrewedMonth;
    },
  },
};
