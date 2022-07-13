<template>
  <div v-if="isLoading">
    <v-row v-for="i in 2" class="mb-6">
      <v-col v-for="j in 4" :key="i * j">
        <v-skeleton-loader :boilerplate="true" type="image, list-item-two-line, button" />
      </v-col>
    </v-row>
  </div>
  <v-alert v-else-if="hasError" type="error">
    Ha habido un error al traer las cervezas, por qué no te relajas, te tomas una y lo vuelves a
    intentar más tarde 😉
  </v-alert>
  <v-alert v-else-if="beers.length === 0" type="info">
    No hay cervezas que mostrar con el criterio solicitado, intenta reducir los filtros
  </v-alert>
  <div v-else>
    <p v-for="beer in beers">{{ beer.id }} {{ beer.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'BeerList',
  data() {
    return {
      hasError: false,
      isLoading: true,
      beers: [],
    };
  },
  mounted() {
    this.$api.beers
      .getAll()
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
};
</script>

<style scoped></style>
