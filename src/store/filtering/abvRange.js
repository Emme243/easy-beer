export const abvRangeStore = {
  namespaced: true,
  state: () => ({
    minAbvValue: 2,
    maxAbvValue: 60,
    abvRange: { min: 0, max: 0 },
  }),
  getters: {
    abvRange: state => state.abvRange,
    maxAbvValue: state => state.maxAbvValue,
    minAbvValue: state => state.minAbvValue,
  },
  mutations: {
    setAbvRange(state, abvRange) {
      state.abvRange = abvRange;
    },
    resetAbvRange(state) {
      state.abvRange = { min: state.minAbvValue, max: state.maxAbvValue };
    },
  },
  actions: {
    setAbvRange({ commit }, abvRange) {
      commit('setAbvRange', abvRange);
    },
    resetAbvRange({ commit }) {
      commit('resetAbvRange');
    },
  },
};
