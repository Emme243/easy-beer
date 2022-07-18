<template>
  <div>
    <v-tooltip bottom :color="color">
      <template #activator="{ on, attrs }">
        <v-btn
          :color="color"
          :disabled="areFiltersWithDefaultValue"
          @click="resetAllFiltersAndSearchBar"
          depressed
          small
          v-bind="attrs"
          v-on="on"
          data-test-id="reset-all-filters-button"
        >
          <v-icon small color="white">fa-solid fa-filter-circle-xmark</v-icon>
        </v-btn>
      </template>
      <span>Limpiar TODOS los filtros de búsqueda</span>
    </v-tooltip>

    <InfoAlert v-model="isAlertShown" color="red darken-3">
      Se han limpiado TODOS los filtros de búsqueda.
    </InfoAlert>
  </div>
</template>

<script>
import InfoAlert from '@/components/Alerts/InfoAlert';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ResetAllBeerFiltersBtn',
  components: { InfoAlert },
  props: {
    color: {
      type: String,
      default: 'red darken-3',
    },
  },
  data: () => ({ isAlertShown: false }),
  methods: {
    ...mapActions({ resetAllFilters: 'filter/resetAllFilters' }),
    resetAllFiltersAndSearchBar() {
      this.resetAllFilters();
      this.isAlertShown = true;
      setTimeout(() => {
        this.isAlertShown = false;
      }, 3000);
    },
  },
  computed: mapGetters({
    areFiltersWithDefaultValue: 'filter/areFiltersWithDefaultValue',
  }),
};
</script>

<style scoped></style>
