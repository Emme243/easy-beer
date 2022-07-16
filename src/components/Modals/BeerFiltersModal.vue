<template>
  <v-dialog
    v-model="isModalOpen"
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
        <v-btn icon dark @click="isModalOpen = false">
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
        <ResetBeerModalFiltersBtn :disabled="numberOfFiltersApplied === 0" />
        <v-btn class="ml-3" color="blue" dark depressed @click="isModalOpen = false">
          <span>OK</span>
          <v-icon right>fa fa-check</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ResetBeerModalFiltersBtn from '@/components/Buttons/ResetBeerModalFiltersBtn';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BeerFiltersModal',
  components: { ResetBeerModalFiltersBtn },
  data: () => ({ isModalOpen: false }),
  methods: {
    ...mapActions({
      resetAbvRangeInStore: 'filter/resetAbvRange',
      resetBrewedDateInStore: 'filter/resetBrewedDate',
      setPageInStore: 'filter/setPage',
    }),
  },
  computed: {
    ...mapGetters({
      minAbvValue: 'filter/minAbvValue',
      maxAbvValue: 'filter/maxAbvValue',
      minAbvDefaultValue: 'filter/minAbvDefaultValue',
      maxAbvDefaultValue: 'filter/maxAbvDefaultValue',
      initialBrewedMonth: 'filter/initialBrewedMonth',
      finalBrewedMonth: 'filter/finalBrewedMonth',
    }),
    numberOfFiltersApplied() {
      let numberOfFiltersApplied = 0;
      if (
        this.minAbvValue !== this.minAbvDefaultValue ||
        this.maxAbvValue !== this.maxAbvDefaultValue
      )
        numberOfFiltersApplied++;
      if (this.initialBrewedMonth || this.finalBrewedMonth) numberOfFiltersApplied++;
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
