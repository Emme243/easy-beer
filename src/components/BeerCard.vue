<template>
  <v-card :elevation="0" outlined rounded>
    <v-img height="250" :src="beer.image_url">
      <v-app-bar :elevation="0" color="rgba(0, 0, 0, .4)">
        <button class="white--text text-h6 d-flex align-center">
          <span class="mr-3">Detalles</span>
          <v-icon color="white" size="20">fa fa-circle-info</v-icon>
        </button>
        <v-spacer />
        <button>
          <v-icon color="white" size="20">fa fa-heart-circle-plus</v-icon>
        </button>
      </v-app-bar>
    </v-img>
    <v-card-title class="text-left">
      <h3 class="text-h5 text-truncate">{{ beer.id }} - {{ beer.name }}</h3>
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
export default {
  name: 'BeerCard',
  props: {
    beer: {
      type: Object,
      required: true,
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
