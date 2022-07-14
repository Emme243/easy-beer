<template>
  <v-tooltip bottom color="red darken-2">
    <template #activator="{ on, attrs }">
      <v-btn depressed color="red darken-2" dark v-bind="attrs" v-on="on" small>
        <v-icon small>fa-solid fa-filter-circle-xmark</v-icon>
      </v-btn>
    </template>
    <span>Limpiar todos los filtros</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'BeerClearFilterButton',
};
</script>

<style scoped></style>
