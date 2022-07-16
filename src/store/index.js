import { favoriteBeersStore } from '@/store/favoriteBeers';
import { abvRangeStore } from '@/store/filtering/abvRange';
import { brewedDateStore } from '@/store/filtering/brewedDate';
import { pageStore } from '@/store/filtering/page';
import { searchStore } from '@/store/filtering/search';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    abvRange: abvRangeStore,
    brewedDate: brewedDateStore,
    page: pageStore,
    search: searchStore,
    favoriteBeers: favoriteBeersStore,
  },
});
