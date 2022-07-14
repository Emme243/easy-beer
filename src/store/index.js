import { pageStore } from '@/store/filtering/page';
import { searchStore } from '@/store/filtering/search';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    page: pageStore,
    search: searchStore,
  },
});
