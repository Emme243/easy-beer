<template>
  <v-btn :disabled="disabled" @click="resetFiltersInFilterModal" color="blue" depressed outlined>
    <span>Limpiar filtros</span>
    <v-icon right>fa fa-eraser</v-icon>
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ResetFiltersInModalButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: mapActions({ resetFiltersInFilterModal: 'filter/resetFiltersInFilterModal' }),
};
</script>

<style scoped></style>
