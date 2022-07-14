<template>
  <v-dialog transition="dialog-bottom-transition" :overlay-opacity="0.2" max-width="500" scrollable>
    <template #activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on">
        <v-tooltip bottom color="primary">
          <template #activator="{ on, attrs }">
            <v-badge
              bordered
              color="blue lighten-1"
              overlap
              :content="numberOfFiltersApplied"
              :value="numberOfFiltersApplied"
            >
              <v-btn depressed color="primary" light v-bind="attrs" v-on="on" small>
                <v-icon small>fa fa-filter</v-icon>
              </v-btn>
            </v-badge>
          </template>
          <span>Filtros de búsqueda ({{ numberOfFiltersApplied }})</span>
        </v-tooltip>
      </div>
    </template>

    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="isDialogOpen = false">
          <v-icon small>fa fa-times</v-icon>
        </v-btn>
        <v-toolbar-title> Filtros de búsqueda ({{ numberOfFiltersApplied }}) </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card-text class="pt-5 filterContent">
        <slot></slot>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue lighten-5" light depressed @click="isDialogOpen = false">
          <span>Limpiar</span>
          <v-icon right>fa fa-eraser</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'BeerFilterDialog',
  data() {
    return {
      isDialogOpen: false,
      numberOfFiltersApplied: 3,
    };
  },
};
</script>

<style scoped>
.filterContent {
  height: 50vh;
}
</style>
