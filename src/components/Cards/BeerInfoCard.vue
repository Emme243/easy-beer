<template>
  <v-card :elevation="0" outlined rounded>
    <v-img height="250" :src="beer.image_url" :alt="beerFullName">
      <v-app-bar :elevation="0" color="rgba(25,118,210, .7)" height="50">
        <BeerDetailsModal :beer="beer" />
        <v-spacer />
        <AddBeerToFavsBtn :beer="beer" />
      </v-app-bar>
    </v-img>
    <v-card-title class="text-left">
      <v-tooltip bottom max-width="300px">
        <template #activator="{ on, attrs }">
          <h3 v-bind="attrs" v-on="on" class="text-h5 text-truncate">
            {{ beerFullName }}
          </h3>
        </template>

        <span>{{ beerFullName }}</span>
      </v-tooltip>
    </v-card-title>
    <v-card-subtitle class="text-left">
      <div class="d-flex align-baseline">
        <span class="mr-2">Elaborado en</span>
        <h4 class="text-h6">{{ beer.first_brewed }}</h4>
      </div>
      <span class="font-weight-bold">con {{ beer.abv }}% de alcohol</span>
    </v-card-subtitle>
    <v-divider class="mx-4"></v-divider>
    <v-card-text class="text--primary text-left text-truncate-3-lines pa-0 ma-4 pr-8">
      {{ beer.description }}
    </v-card-text>
  </v-card>
</template>

<script>
import BeerDetailsModal from '@/components/Modals/BeerDetailsModal';
import AddBeerToFavsBtn from '@/components/Buttons/AddBeerToFavsBtn';

export default {
  name: 'BeerInfoCard',
  components: { AddBeerToFavsBtn, BeerDetailsModal },
  props: {
    beer: {
      type: Object,
      required: true,
    },
  },
  computed: {
    beerFullName() {
      return `${this.beer.id} - ${this.beer.name}`;
    },
  },
};
</script>

<style scoped>
.text-truncate-3-lines {
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: break-all;
  overflow: hidden;
  hyphens: auto;
  text-align: right;
}
</style>
