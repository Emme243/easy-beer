import { favoriteBeersStore } from '@/store/favoriteBeers';
import { filterStore } from '@/store/filterStore';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    filter: filterStore,
    favoriteBeers: favoriteBeersStore,
  },
});
