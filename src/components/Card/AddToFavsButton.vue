<template>
  <v-tooltip bottom color="deep-purple" class="d-flex align-center">
    <template #activator="{ on, attrs }">
      <button v-bind="attrs" v-on="on">
        <v-icon color="white" size="20">fa fa-heart-circle-plus</v-icon>
      </button>
    </template>
    <v-icon dark small>fa fa-plus</v-icon>
    <span class="ml-2">Añadir a favoritos</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'AddToFavsButton',
  props: {
    beer: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
