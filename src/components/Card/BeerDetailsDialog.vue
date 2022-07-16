<template>
  <v-dialog
    v-model="isModalOpen"
    transition="dialog-bottom-transition"
    :overlay-opacity="0.2"
    max-width="700px"
    scrollable
  >
    <template #activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on" class="white--text text-h6 d-flex align-center">
        <span class="mr-2">Detalles</span>
        <v-icon color="white" size="20">fa fa-circle-info</v-icon>
      </div>
    </template>

    <v-card max-height="80vh">
      <v-toolbar dark color="primary darken-1">
        <v-btn icon dark @click="isModalOpen = false">
          <v-icon small>fa fa-times</v-icon>
        </v-btn>
        <v-toolbar-title>{{ beer.name }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <AddToFavsButton :beer="beer" />
      </v-toolbar>

      <v-card-text class="pt-5 filterContent">
        <v-row class="text-center">
          <v-col cols="12">
            <span>Nombre de la cerveza:</span>
            <h3 class="text-h6">{{ beer.name }}</h3>
          </v-col>
          <v-col cols="12">
            <v-img :src="beer.image_url" max-width="100px" class="v-img-center" />
          </v-col>
        </v-row>
        <v-divider class="my-3"></v-divider>
        <div>
          <h3 class="text-h6">Eslogan</h3>
          <p class="ma-0">{{ beer.tagline }}</p>
        </div>
        <v-divider class="my-3"></v-divider>
        <div>
          <h3 class="text-h6">Fecha de elaboración</h3>
          <p class="ma-0">{{ firstBrewed }}</p>
        </div>
        <v-divider class="my-3"></v-divider>
        <div>
          <h3 class="text-h6">Descripción</h3>
          <p class="ma-0">{{ beer.description }}</p>
        </div>
        <v-divider class="my-3"></v-divider>
        <div>
          <h3 class="text-h6">Porcentaje de alcohol presente</h3>
          <p class="ma-0">{{ beer.abv }}%</p>
        </div>
        <v-divider class="my-3"></v-divider>
        <div>
          <h3 class="text-h6">Ingredientes</h3>
          <ul>
            <li v-for="ingredient in beerIngredients">
              {{ ingredient }}
            </li>
          </ul>
        </div>
      </v-card-text>

      <v-divider />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" outlined depressed @click="isModalOpen = false">
          <span>Cerrar</span>
          <v-icon right>fa fa-times</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import AddToFavsButton from '@/components/Card/AddToFavsButton';
export default {
  name: 'BeerDetailsDialog',
  components: { AddToFavsButton },

  props: {
    beer: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  computed: {
    firstBrewed() {
      const [month, year] = this.beer.first_brewed.split('/');
      const date = new Date(year, month - 1);
      const options = { year: 'numeric', month: 'long' };
      const formattedDate = date.toLocaleDateString('es-ES', options);
      return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    },
    beerIngredients() {
      const { ingredients } = this.beer;
      const maltList = ingredients.malt.map(
        malt => `${malt.name} (${malt.amount.value} ${malt.amount.unit})`
      );
      const hopsList = ingredients.hops.map(
        hop => `${hop.name} (${hop.amount.value} ${hop.amount.unit})`
      );
      return [...maltList, ...hopsList];
    },
  },
};
</script>

<style scoped>
.v-img-center {
  margin: auto;
}
</style>
