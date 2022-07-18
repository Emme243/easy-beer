<template>
  <v-btn
    :disabled="disabled"
    @click="() => resetFiltersInFilterModal()"
    color="blue"
    depressed
    outlined
    data-test-id="reset-modal-filters-btn"
  >
    <span>Limpiar filtros</span>
    <v-icon right>fa fa-eraser</v-icon>
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ResetBeerModalFiltersBtn',
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
