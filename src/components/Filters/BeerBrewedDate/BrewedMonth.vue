<template>
  <v-dialog
    v-model="isModalOpen"
    overlay-opacity="0.3"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="brewedMonth"
        :label="inputLabel"
        readonly
        :append-icon="brewedMonth && 'fa fa-arrow-rotate-left'"
        v-bind="attrs"
        v-on="on"
        @click:append="handleBrewedMonthChange('')"
      ></v-text-field>
    </template>
    <v-date-picker
      type="month"
      scrollable
      @input="handleBrewedMonthChange"
      :value="brewedMonth"
      :min="brewedMinMonth"
      :max="brewedMaxMonth"
      show-current="2014-01"
    >
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="handleBrewedMonthChange('')"> Limpiar </v-btn>
      <v-btn text color="primary" @click="isModalOpen = false"> OK </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'BrewedMonth',
  props: {
    inputLabel: {
      type: String,
      required: true,
    },
    brewedMonth: {
      type: String,
      required: true,
    },
    brewedMinMonth: {
      type: String,
      default: '',
    },
    brewedMaxMonth: {
      type: String,
      default: '',
    },
  },
  data: () => ({ isModalOpen: false }),
  methods: {
    ...mapActions({ resetPageInStore: 'filter/resetPage' }),
    handleBrewedMonthChange(month) {
      this.$emit('setBrewedMonthInStore', month);
      this.resetPageInStore();
    },
  },
};
</script>

<style scoped></style>
