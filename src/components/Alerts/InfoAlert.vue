<template>
  <v-snackbar bottom :value="isAlertShown" :color="color">
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text outlined v-bind="attrs" @click="handleInput(false)">
        <v-icon>fa fa-times</v-icon>
      </v-btn>
    </template>
    <slot></slot>
  </v-snackbar>
</template>

<script>
export default {
  name: 'InfoAlert',
  props: ['isAlertShown', 'color'],
  model: {
    prop: 'isAlertShown',
  },
  methods: {
    handleInput(value) {
      this.$emit('input', value);
    },
  },
};
</script>

<style scoped></style>
