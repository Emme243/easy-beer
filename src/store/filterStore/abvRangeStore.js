export const abvRangeStore = {
  state: () => ({
    minAbvDefaultValue: 2,
    maxAbvDefaultValue: 60,
    minAbvValue: 2,
    maxAbvValue: 60,
  }),
  getters: {
    maxAbvDefaultValue: state => state.maxAbvDefaultValue,
    minAbvDefaultValue: state => state.minAbvDefaultValue,
    minAbvValue: state => state.minAbvValue,
    maxAbvValue: state => state.maxAbvValue,
    isAbvRangeWithDefaultValue(state) {
      return (
        state.minAbvValue === state.minAbvDefaultValue &&
        state.maxAbvValue === state.maxAbvDefaultValue
      );
    },
    newValidAbvValue(state) {
      return (newAbvValue, type) => {
        if (
          +newAbvValue &&
          +newAbvValue >= state.minAbvDefaultValue &&
          +newAbvValue <= state.maxAbvDefaultValue
        )
          return +newAbvValue;
        return type === 'min' ? state.minAbvDefaultValue : state.maxAbvDefaultValue;
      };
    },
  },
  mutations: {
    setMinAbvValue(state, minAbv) {
      state.minAbvValue = minAbv;
    },
    setMaxAbvValue(state, maxAbv) {
      state.maxAbvValue = maxAbv;
    },
    resetAbvRange(state) {
      state.minAbvValue = state.minAbvDefaultValue;
      state.maxAbvValue = state.maxAbvDefaultValue;
    },
  },
  actions: {
    setMinAbvValue({ commit, getters }, minAbv) {
      commit('setMinAbvValue', getters.newValidAbvValue(minAbv, 'min'));
    },
    setMaxAbvValue({ commit, getters }, maxAbv) {
      commit('setMaxAbvValue', getters.newValidAbvValue(maxAbv, 'max'));
    },
    resetAbvRange({ commit }) {
      commit('resetAbvRange');
    },
  },
};
