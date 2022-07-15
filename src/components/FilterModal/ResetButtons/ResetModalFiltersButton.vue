<template>
  <v-btn
    :disabled="disabled"
    @click="$emit('resetFiltersInModal')"
    class="mr-3"
    color="blue"
    depressed
    outlined
  >
    <span>Limpiar filtros</span>
    <v-icon right>fa fa-eraser</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'ResetModalFiltersButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped></style>
