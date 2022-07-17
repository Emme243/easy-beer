<template>
  <v-tooltip bottom color="deep-purple" class="d-flex align-center">
    <template #activator="{ on, attrs }">
      <button v-bind="attrs" v-on="on" @click="handleBeerInFavoritesInStore(beer)">
        <v-icon :color="iconColor" size="20">{{ heartIcon }}</v-icon>
      </button>
    </template>
    <v-icon dark small>{{ heartIcon }}</v-icon>
    <span class="ml-2">{{ tooltipText }}</span>
  </v-tooltip>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AddBeerToFavsBtn',
  props: {
    beer: {
      type: Object,
      required: true,
    },
  },
  methods: mapActions({
    handleBeerInFavoritesInStore: 'favoriteBeers/handleBeerInFavorites',
  }),
  computed: {
    ...mapGetters({
      isBeerInFavoritesFromStore: 'favoriteBeers/isBeerInFavorites',
    }),
    isBeerInFavorites() {
      return this.isBeerInFavoritesFromStore(this.beer.id);
    },
    heartIcon() {
      return this.isBeerInFavorites ? 'fa fa-heart-circle-check' : 'fa fa-heart-circle-plus';
    },
    iconColor() {
      return this.isBeerInFavorites ? 'deep-purple lighten-4' : 'white';
    },
    tooltipText() {
      return this.isBeerInFavorites ? 'Añadido a favoritos' : 'Agregar a favoritos';
    },
  },
};
</script>

<style scoped></style>
