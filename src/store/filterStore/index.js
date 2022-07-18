import { abvRangeStore } from '@/store/filterStore/abvRangeStore';
import { brewedDateStore } from '@/store/filterStore/brewedDateStore';
import { paginationStore } from '@/store/filterStore/paginationStore';
import { searchQueryStore } from '@/store/filterStore/searchQueryStore';

export const filterStore = {
  namespaced: true,
  modules: {
    abvRange: abvRangeStore,
    brewedDate: brewedDateStore,
    page: paginationStore,
    searchQuery: searchQueryStore,
  },
  state: () => ({}),
  getters: {
    filterStore(_, getters) {
      return {
        minAbvValue: getters.minAbvValue,
        maxAbvValue: getters.maxAbvValue,
        initialBrewedMonth: getters.initialBrewedMonth,
        finalBrewedMonth: getters.finalBrewedMonth,
        page: getters.page,
        searchQuery: getters.searchQuery,
      };
    },
    areFiltersWithDefaultValue(_, getters) {
      return (
        getters.isAbvRangeWithDefaultValue &&
        !getters.initialBrewedMonth &&
        !getters.finalBrewedMonth &&
        !getters.searchQuery
      );
    },
    numberOfFiltersApplied(_, getters) {
      let numberOfFiltersApplied = 0;
      if (!getters.isAbvRangeWithDefaultValue) numberOfFiltersApplied++;
      if (getters.initialBrewedMonth || getters.finalBrewedMonth) numberOfFiltersApplied++;
      return numberOfFiltersApplied;
    },
  },
  mutations: {},
  actions: {
    setAllFilters({ dispatch }, filterQuery) {
      dispatch('setPage', filterQuery.page);
      dispatch('setMinAbvValue', filterQuery.minAbvValue);
      dispatch('setMaxAbvValue', filterQuery.maxAbvValue);
      dispatch('setInitialBrewedMonth', filterQuery.initialBrewedMonth);
      dispatch('setFinalBrewedMonth', filterQuery.finalBrewedMonth);
      dispatch('setSearchQuery', filterQuery.searchQuery);
    },
    resetAllFilters({ dispatch }) {
      dispatch('resetAbvRange');
      dispatch('resetBrewedDate');
      dispatch('setSearchQuery', '');
      dispatch('resetPage');
    },
    resetFiltersInFilterModal({ dispatch }) {
      dispatch('resetAbvRange');
      dispatch('resetBrewedDate');
      dispatch('resetPage');
    },
  },
};
