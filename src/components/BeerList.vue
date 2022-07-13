<template>
  <div v-if="isLoading" class="grid-list">
    <v-skeleton-loader
      min-width="300"
      v-for="i in 8"
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
  <div v-else>
    <div class="grid-list mb-3 mt-5">
      <BeerCard v-for="beer in beers" :key="beer.id" :beer="beer" />
    </div>
    <div class="py-3 beer__pagination">
      <v-pagination
        :length="totalOfPages"
        v-model="currentPage"
        light
        prev-icon="fa fa-caret-left"
        next-icon="fa fa-caret-right"
        @input="getBeers"
      />
    </div>
  </div>
</template>

<script>
import BeerCard from '@/components/BeerCard';

export default {
  name: 'BeerList',
  components: { BeerCard },
  data() {
    return {
      hasError: false,
      isLoading: true,
      beers: [],
      beersPerPage: 15,
      currentPage: 1,
      totalOfPages: 8,
    };
  },
  methods: {
    getBeers() {
      this.$api.beers
        .getAll({ per_page: this.beersPerPage, page: this.currentPage })
        .then(beers => {
          this.beers = beers;
        })
        .catch(() => {
          this.hasError = true;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getCurrentPageFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const page = urlParams.get('page');
      if (page) this.currentPage = parseInt(page);
    },
    setCurrentPageToUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('page', this.currentPage);
      window.history.pushState({}, '', `?${urlParams.toString()}`);
    },
  },
  mounted() {
    this.getCurrentPageFromUrl();
    this.getBeers();
  },
  watch: {
    currentPage() {
      this.setCurrentPageToUrl();
    },
  },
};
</script>

<style scoped lang="scss">
.grid-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 30px;
}

.beer__pagination {
  position: sticky;
  bottom: 0;
  background-color: rgba(256, 256, 256, 0.9);

  @supports (backdrop-filter: blur(10px)) {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    background-color: rgba(256, 256, 256, 0.8);
  }
}
</style>
