<template>
  <div>
    <v-dialog
      v-model="isModalOpen"
      transition="dialog-bottom-transition"
      :overlay-opacity="0.2"
      max-width="400"
      scrollable
    >
      <template #activator="{ on, attrs }">
        <v-badge
          :content="numberOfFavoriteBeers"
          :value="numberOfFavoriteBeers"
          bordered
          color="deep-purple lighten-1"
          overlap
        >
          <v-btn
            :disabled="isFavoriteBeersEmpty"
            color="deep-purple"
            depressed
            small
            v-bind="attrs"
            v-on="on"
          >
            <v-tooltip bottom color="deep-purple">
              <template #activator="{ on, attrs }">
                <v-icon small color="white">fa-solid fa-heart-circle-check</v-icon>
              </template>
              <span>Cervezas favoritas ({{ numberOfFavoriteBeers }})</span>
            </v-tooltip>
          </v-btn>
        </v-badge>
      </template>

      <v-card>
        <v-toolbar dark color="deep-purple">
          <v-btn icon dark @click="isModalOpen = false" data-test-id="close-modal-btn">
            <v-icon small>fa fa-times</v-icon>
          </v-btn>
          <v-toolbar-title>
            <span>Cervezas favoritas ({{ numberOfFavoriteBeers }})</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-icon small>fa-solid fa-heart-circle-check</v-icon>
        </v-toolbar>

        <v-card-text class="pt-5">
          <v-alert
            color="deep-purple lighten-1"
            type="info"
            v-if="isFavoriteBeersEmpty"
            data-test-id="no-beers-message"
          >
            No tienes cervezas favoritas por el momento.
          </v-alert>
          <div class="beerFavoritesModal__beerCards" v-else data-test-id="beers-container">
            <BeerInfoCard v-for="beer in favoriteBeersInStore" :key="beer.id" :beer="beer" />
          </div>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="deep-purple"
            depressed
            @click="resetFavoriteBeersInStore"
            :disabled="isFavoriteBeersEmpty"
            data-test-id="reset-favorites-btn"
          >
            <span :class="{ 'white--text': !isFavoriteBeersEmpty }">Vacíar</span>
            <v-icon right color="white">fa fa-eraser</v-icon>
          </v-btn>
          <v-btn
            color="deep-purple"
            outlined
            dark
            depressed
            @click="isModalOpen = false"
            data-test-id="close-modal-cerrar-btn"
          >
            <span>Cerrar</span>
            <v-icon right>fa fa-times</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import BeerInfoCard from '@/components/Cards/BeerInfoCard';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BeerFavoritesModal',
  components: { BeerInfoCard },
  data: () => ({ isModalOpen: false }),
  methods: mapActions({
    resetFavoriteBeersInStore: 'favoriteBeers/resetFavoriteBeers',
  }),
  computed: {
    ...mapGetters({
      favoriteBeersInStore: 'favoriteBeers/getAllFavoriteBeers',
    }),
    numberOfFavoriteBeers() {
      return this.favoriteBeersInStore.length;
    },
    isFavoriteBeersEmpty() {
      return this.numberOfFavoriteBeers === 0;
    },
  },
  watch: {
    favoriteBeersInStore() {
      localStorage.setItem('favoriteBeers', JSON.stringify(this.favoriteBeersInStore));
    },
  },
};
</script>

<style scoped lang="scss">
.beerFavoritesModal__beerCards {
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
}
</style>
