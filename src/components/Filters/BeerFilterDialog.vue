<template>
  <v-dialog
    v-model="isDialogOpen"
    transition="dialog-bottom-transition"
    :overlay-opacity="0.2"
    max-width="500"
    scrollable
  >
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
        <v-btn
          :disabled="numberOfFiltersApplied === 0"
          @click="resetFiltersInDialog"
          class="mr-3"
          color="blue"
          depressed
          outlined
        >
          <span>Limpiar filtros</span>
          <v-icon right>fa fa-eraser</v-icon>
        </v-btn>
        <v-btn color="blue" dark depressed @click="isDialogOpen = false">
          <span>OK</span>
          <v-icon right>fa fa-check</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BeerFilterDialog',
  data() {
    return {
      isDialogOpen: false,
    };
  },
  methods: {
    ...mapActions({
      resetAbvRangeInStore: 'abvRange/resetAbvRange',
      resetBrewedDateInStore: 'brewedDate/resetBrewedDate',
      setCurrentPageInStore: 'page/setPage',
    }),
    resetFiltersInDialog() {
      this.resetAbvRangeInStore();
      this.resetBrewedDateInStore();
      this.setCurrentPageInStore(1);
    },
  },
  computed: {
    ...mapGetters({
      abvRange: 'abvRange/abvRange',
      minAbvValue: 'abvRange/minAbvValue',
      maxAbvValue: 'abvRange/maxAbvValue',
      brewedInitialMonth: 'brewedDate/getInitialMonth',
      brewedFinalMonth: 'brewedDate/getFinalMonth',
    }),
    numberOfFiltersApplied() {
      let numberOfFiltersApplied = 0;
      if (this.abvRange.min !== this.minAbvValue || this.abvRange.max !== this.maxAbvValue)
        numberOfFiltersApplied++;
      if (this.brewedInitialMonth || this.brewedFinalMonth) numberOfFiltersApplied++;
      return numberOfFiltersApplied;
    },
  },
};
</script>

<style scoped>
.filterContent {
  height: 50vh;
}
</style>
