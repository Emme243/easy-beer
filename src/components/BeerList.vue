<template>
  <div v-if="isLoading" class="grid-list" data-test-id="beer-loader">
    <v-skeleton-loader
      min-width="250"
      v-for="i in 6"
      :key="i"
      :boilerplate="true"
      type="image, list-item-two-line, button"
    />
  </div>
  <v-alert v-else-if="hasError" type="error" data-test-id="beer-error-message">
    Ha habido un error al traer las cervezas, por qué no te relajas, te tomas una y lo vuelves a
    intentar más tarde 😉
  </v-alert>
  <v-alert v-else-if="beers.length === 0" type="info" data-test-id="no-beer-message">
    <h3 class="text-h5">No hay cervezas que mostrar con el criterio solicitado.</h3>
    <span>Intenta reducir los criterios de búsqueda (barra de búsqueda y filtros)</span>
    <ResetAllBeerFiltersBtn color="blue darken-4" />
  </v-alert>
  <div v-else class="grid-list mb-3 mt-5" data-test-id="beer-container">
    <BeerInfoCard v-for="beer in beers" :key="`${beer.id}-${beer.name}`" :beer="beer" />
  </div>
</template>

<script>
import BeerInfoCard from '@/components/Cards/BeerInfoCard';
import ResetAllBeerFiltersBtn from '@/components/Buttons/ResetAllBeerFiltersBtn';
import { mapGetters } from 'vuex';

const beersPerPage = 15;
export default {
  name: 'BeerList',
  components: { ResetAllBeerFiltersBtn, BeerInfoCard },
  data() {
    return {
      hasError: false,
      isLoading: true,
      beers: [],
    };
  },
  methods: {
    fetchBeers() {
      this.isLoading = true;
      this.hasError = false;
      this.$api.beers
        .getAll(this.apiQueryParams)
        .then(beers => {
          this.beers = beers || [];
        })
        .catch(() => {
          this.hasError = true;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    updateQueryParamsInUrl() {
      const newQueryParams = Object.entries(this.filterStore).reduce(
        (queryParams, [key, value]) => {
          if (!!value) queryParams[key] = value + '';
          else delete queryParams[key];
          return queryParams;
        },
        {}
      );
      if (JSON.stringify(newQueryParams) !== JSON.stringify(this.$route.query))
        this.$router.push({ query: newQueryParams });
    },
  },
  computed: {
    ...mapGetters({ filterStore: 'filter/filterStore' }),
    apiQueryParams() {
      return {
        per_page: beersPerPage,
        page: this.filterStore.page,
        ...(this.filterStore.minAbvValue !== 0 &&
          this.filterStore.maxAbvValue !== 0 && {
            abv_gt: this.filterStore.minAbvValue,
            abv_lt: this.filterStore.maxAbvValue,
          }),
        ...(this.filterStore.searchQuery && { beer_name: this.filterStore.searchQuery }),
        ...(this.filterStore.initialBrewedMonth && {
          brewed_after: this.filterStore.initialBrewedMonth.split('-').reverse().join('-'),
        }),
        ...(this.filterStore.finalBrewedMonth && {
          brewed_before: this.filterStore.finalBrewedMonth.split('-').reverse().join('-'),
        }),
      };
    },
  },
  watch: {
    // NOTE: Al tener solamente una propiedad reactiva (filterStore) que contiene todos los datos de filtrado,
    //       cada vez que una propiedad de filtrado (ya sea searchQuery, minAbvValue, maxAbvValue, etc) cambia,
    //       se hace el fetch de todas las cervezas UNA SOLA VEZ.
    //
    //       Anteriormente, cuando se cambiaba una propiedad de filtrado, se hacía el fetch por cada cambio que había,
    //       es decir, cuando se cambiaba searchQuery se hacía un fetch,
    //       cuando se cambiaba minAbvValue se hacía otro fetch, y así por cada cambio en los filtros de forma individual.
    //       EJEMPLO: En la app, se tiene un botón que resetea los 4 tipos de filtrado en una sola vez,
    //       por lo que al resetear los 4 filtros, se hacía el fetch de todas las cervezas 4 veces,
    //       se escuchaban de manera individual estos filtros.
    //
    //       Ahora, al haber creado un único filtro reactivo (/store/filterStore.js) que contiene todos los datos de filtrado,
    //       aun si se cambian las 4 propiedades de filtrado uno por uno,
    //       se hace el fetch de todas las cervezas 1 VEZ,
    //       ya que se escuchan de manera reactiva todas las propiedades de filtrado
    //       centralizadas en un único objeto que las contiene.
    filterStore() {
      this.fetchBeers();

      // NOTE: Cada vez que haya un cambió en el estado de los filtros,
      //       se actualiza el query route con la información del mismo,
      //       por lo que el query route solo se actualiza desde un solo lugar (aquí)
      //       y no desde cada componente que tenga el estado de los filtros.
      this.updateQueryParamsInUrl();
    },
  },
};
</script>

<style scoped lang="scss">
.grid-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 30px;
}
</style>
