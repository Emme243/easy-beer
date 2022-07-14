<template>
  <div v-if="isLoading" class="grid-list">
    <v-skeleton-loader
      min-width="250"
      v-for="i in 6"
      :key="i"
      :boilerplate="true"
      type="image, list-item-two-line, button"
    />
  </div>
  <v-alert v-else-if="hasError" type="error">
    Ha habido un error al traer las cervezas, por qué no te relajas, te tomas una y lo vuelves a
    intentar más tarde 😉
  </v-alert>
  <v-alert v-else-if="beers.length === 0" type="info">
    No hay cervezas que mostrar con el criterio solicitado, intenta reducir los filtros
  </v-alert>
  <div v-else class="grid-list mb-3 mt-5">
    <BeerCard v-for="beer in beers" :key="`${beer.id}-${beer.name}`" :beer="beer" />
  </div>
</template>

<script>
import BeerCard from '@/components/BeerCard';
import { mapGetters } from 'vuex';

const beersPerPage = 15;
export default {
  name: 'BeerList',
  components: { BeerCard },
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
        .getAll({
          per_page: beersPerPage,
          page: this.currentPage,
          ...(this.searchQuery && { beer_name: this.searchQuery }),
        })
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
  },
  computed: {
    ...mapGetters({ currentPage: 'page/page', searchQuery: 'search/search' }),
  },
  watch: {
    currentPage() {
      this.fetchBeers();
    },
    searchQuery() {
      this.fetchBeers();
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
