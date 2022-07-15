<template>
  <div>
    <v-tooltip bottom :color="color">
      <template #activator="{ on, attrs }">
        <v-btn
          :color="color"
          :disabled="areFiltersWithDefaultValue"
          @click="resetAllFiltersAndSearchBar"
          depressed
          small
          v-bind="attrs"
          v-on="on"
        >
          <v-icon small color="white">fa-solid fa-filter-circle-xmark</v-icon>
        </v-btn>
      </template>
      <span>Limpiar TODOS los filtros de búsqueda</span>
    </v-tooltip>

    <Alert v-model="isAlertShown" color="red darken-3">
      Se han limpiado TODOS los filtros de búsqueda.
    </Alert>
  </div>
</template>

<script>
import Alert from '@/components/UI/Alert';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ResetAllFiltersButton',
  components: { Alert },
  props: {
    color: {
      type: String,
      default: 'red darken-3',
    },
  },
  data() {
    return {
      isAlertShown: false,
    };
  },
  methods: {
    ...mapActions({
      setSearchQueryInStore: 'search/setSearch',
      setCurrentPageInStore: 'page/setPage',
      resetAbvRangeInStore: 'abvRange/resetAbvRange',
      resetBrewedDateInStore: 'brewedDate/resetBrewedDate',
    }),
    resetAllFiltersAndSearchBar() {
      this.setSearchQueryInStore('');
      this.setCurrentPageInStore(1);
      this.resetAbvRangeInStore();
      this.resetBrewedDateInStore();
      this.isAlertShown = true;
      setTimeout(() => {
        this.isAlertShown = false;
      }, 3000);
    },
  },
  computed: {
    ...mapGetters({
      abvRange: 'abvRange/abvRange',
      minAbvValue: 'abvRange/minAbvValue',
      maxAbvValue: 'abvRange/maxAbvValue',
      currentPage: 'page/page',
      brewedInitialMonth: 'brewedDate/getInitialMonth',
      brewedFinalMonth: 'brewedDate/getFinalMonth',
      searchQuery: 'search/search',
    }),
    areFiltersWithDefaultValue() {
      return (
        this.abvRange.min === this.minAbvValue &&
        this.abvRange.max === this.maxAbvValue &&
        !this.brewedInitialMonth &&
        !this.brewedFinalMonth &&
        !this.searchQuery
      );
    },
  },
};
</script>

<style scoped></style>
