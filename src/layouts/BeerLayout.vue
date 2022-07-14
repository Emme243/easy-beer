<template>
  <v-container class="text-center mt-5 body-1">
    <h1 class="text-h2">Easy Beer 🍻</h1>
    <p class="mt-3">Encuentra la cerveza que más te guste 😋</p>

    <div class="beerLayout__search align-center px-6 d-flex">
      <BeerSearch class="mr-6" />
      <BeerFilterDialog>
        <BeerABVRange />
      </BeerFilterDialog>
      <BeerClearFilterButton class="ml-6" />
    </div>
    <BeerList />
    <BeerPagination />
  </v-container>
</template>

<script>
import BeerABVRange from '@/components/BeerABVRange';
import BeerClearFilterButton from '@/components/BeerClearFilterButton';
import BeerFilterDialog from '@/components/BeerFilterDialog';
import BeerList from '@/components/BeerList';
import BeerPagination from '@/components/BeerPagination';
import BeerSearch from '@/components/BeerSearch';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BeerLayout',
  components: {
    BeerClearFilterButton,
    BeerABVRange,
    BeerFilterDialog,
    BeerSearch,
    BeerPagination,
    BeerList,
  },
  methods: mapActions({
    setAbvRangeInStore: 'abvRange/setAbvRange',
    setCurrentPageInStore: 'page/setPage',
    setSearchQueryInStore: 'search/setSearch',
  }),
  computed: mapGetters({
    minAbvValue: 'abvRange/minAbvValue',
    maxAbvValue: 'abvRange/maxAbvValue',
  }),
  mounted() {
    // NOTE: En este punto ya se ha cargado el componente BeerLayout.vue
    //       y se puede acceder a los datos de la query en la url,
    //       entonces se pueden setear los valores de búsqueda en el store.

    const { abvMin, abvMax } = this.$route.query;
    this.setAbvRangeInStore({
      min: +abvMin || this.minAbvValue,
      max: +abvMax || this.maxAbvValue,
    });

    const currentPage = +this.$route.query.page || 1;
    this.setCurrentPageInStore(currentPage);

    const searchQuery = this.$route.query.search || '';
    this.setSearchQueryInStore(searchQuery);
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
