<template>
  <v-container class="text-center mt-5 body-1">
    <h1 class="text-h2">Easy Beer 🍻</h1>
    <p class="mt-3">Encuentra la cerveza que más te guste 😋</p>

    <div class="beerLayout__search align-center px-6 d-flex">
      <BeerSearch class="mr-3" />
      <FilterModal>
        <BeerABVRange />
        <v-divider class="my-5" />
        <BeerBrewedDateContainer />
        <v-divider class="my-5" />
      </FilterModal>
      <ResetAllFiltersButton class="ml-3" />
    </div>
    <BeerList />
    <BeerPagination />
  </v-container>
</template>

<script>
import BeerBrewedDateContainer from '@/components/Filters/BrewedDate/BeerBrewedDateContainer';
import { mapActions, mapGetters } from 'vuex';
import BeerABVRange from '@/components/Filters/BeerABVRange';
import ResetAllFiltersButton from '@/components/FilterModal/ResetButtons/ResetAllFiltersButton';
import FilterModal from '@/components/FilterModal';
import BeerList from '@/components/BeerList';
import BeerPagination from '@/components/Filters/BeerPagination';
import BeerSearch from '@/components/Filters/BeerSearch';

export default {
  name: 'BeerLayout',
  components: {
    BeerBrewedDateContainer,
    BeerABVRange,
    ResetAllFiltersButton,
    FilterModal,
    BeerList,
    BeerPagination,
    BeerSearch,
  },
  methods: mapActions({
    setAbvRangeInStore: 'abvRange/setAbvRange',
    setCurrentPageInStore: 'page/setPage',
    setSearchQueryInStore: 'search/setSearch',
    setBrewedFinalMonthInStore: 'brewedDate/setFinalMonth',
    setBrewedInitialMonthInStore: 'brewedDate/setInitialMonth',
  }),
  computed: mapGetters({
    minAbvValue: 'abvRange/minAbvValue',
    maxAbvValue: 'abvRange/maxAbvValue',
  }),
  mounted() {
    // NOTE: En este punto ya se ha cargado el componente BeerLayout.vue
    //       y se puede acceder a los datos de la query en la url,
    //       entonces se pueden setear los valores de búsqueda en el store de la app.

    const { abvMin, abvMax } = this.$route.query;
    this.setAbvRangeInStore({
      min: +abvMin || this.minAbvValue,
      max: +abvMax || this.maxAbvValue,
    });

    const currentPage = +this.$route.query.page || 1;
    this.setCurrentPageInStore(currentPage);

    const searchQuery = this.$route.query.search || '';
    this.setSearchQueryInStore(searchQuery);

    const brewedFinalMonth = this.$route.query.brewedFinalMonth || '';
    this.setBrewedFinalMonthInStore(brewedFinalMonth);

    const brewedInitialMonth = this.$route.query.brewedInitialMonth || '';
    this.setBrewedInitialMonthInStore(brewedInitialMonth);
  },
};
</script>

<style scoped lang="scss">
.beerLayout__search {
  position: sticky;
  top: 0;
  background-color: rgba(256, 256, 256, 0.9);
  z-index: 10;

  @supports (backdrop-filter: blur(10px)) {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    background-color: rgba(256, 256, 256, 0.8);
  }
}
</style>
