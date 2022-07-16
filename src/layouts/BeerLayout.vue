<template>
  <v-container class="text-center mt-5 body-1">
    <h1 class="text-h2">Easy Beer 🍻</h1>
    <p class="mt-3">Encuentra la cerveza que más te guste 😋</p>

    <div class="navbar align-center px-6 d-flex">
      <FavoriteBeersModal class="mr-5" />
      <BeerSearchQuery class="mr-3" />
      <BeerFilterModal>
        <BeerAbvRange />
        <v-divider class="my-5" />
        <BeerBrewedDateContainer />
        <v-divider class="my-5" />
      </BeerFilterModal>
      <ResetAllFiltersButton class="ml-3" />
    </div>
    <v-main>
      <BeerList />
    </v-main>
    <BeerPagination />
  </v-container>
</template>

<script>
import BeerAbvRange from '@/components/Filters/BeerAbvRange';
import BeerBrewedDateContainer from '@/components/Filters/BeerBrewedDate/BeerBrewedDateContainer';
import BeerFilterModal from '@/components/FilterModal';
import BeerList from '@/components/BeerList';
import BeerPagination from '@/components/Filters/BeerPagination';
import BeerSearchQuery from '@/components/Filters/BeerSearchQuery';
import FavoriteBeersModal from '@/components/FavoriteBeersModal';
import ResetAllFiltersButton from '@/components/FilterModal/ResetButtons/ResetAllFiltersButton';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BeerLayout',
  components: {
    FavoriteBeersModal,
    BeerBrewedDateContainer,
    BeerAbvRange,
    ResetAllFiltersButton,
    BeerFilterModal,
    BeerList,
    BeerPagination,
    BeerSearchQuery,
  },
  methods: mapActions({
    setAllFiltersInStore: 'filter/setAllFilters',
    setFavoriteBeersInStore: 'favoriteBeers/setFavoriteBeers',
  }),
  computed: mapGetters({
    filterStore: 'filter/filterStore',
  }),
  watch: {
    // NOTE: Cada vez que haya un cambió en el estado de los filtros,
    //       se actualiza el query route con la información del mismo,
    //       por lo que el query route solo se actualiza desde un solo lugar
    //       y no desde cada componente que tenga el estado de los filtros.
    filterStore(newFilterStore) {
      const newQueryParams = Object.entries(newFilterStore).reduce((queryParams, [key, value]) => {
        if (!!value) queryParams[key] = value + '';
        else delete queryParams[key];
        return queryParams;
      }, {});
      if (JSON.stringify(newQueryParams) !== JSON.stringify(this.$route.query))
        this.$router.push({ query: newQueryParams });
    },
  },
  mounted() {
    // NOTE: En este punto ya se ha cargado el componente BeerLayout.vue
    //       y se puede acceder a los datos de filtrado en la query de la url,
    //       por lo que podemos setear esos valores en el store.
    //       De este modo, cada vez que el usuario refresque la página, no perderá los filtros.
    this.setAllFiltersInStore(this.$route.query);

    // NOTE: También podemos traer todas las cervezas marcadas como favoritas
    // por el usuario desde el localStorage y setearlas en el store.
    const favoriteBeers = localStorage.getItem('favoriteBeers');
    if (favoriteBeers) this.setFavoriteBeersInStore(JSON.parse(favoriteBeers));
  },
};
</script>

<style scoped lang="scss">
.navbar {
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
