<template>
  <div>
    <div class="d-flex align-center">
      <h3 class="text-h6 mr-4">Fecha de elaboración</h3>
      <!--Beer Brewed Date Reset Button-->
      <button
        @click="handleResetBrewedDate"
        v-show="!!initialBrewedMonth || !!finalBrewedMonth"
        data-test-id="reset-brewed-date-btn"
      >
        <v-icon small>fa fa-arrow-rotate-left</v-icon>
      </button>
    </div>
    <v-row>
      <v-col cols="6">
        <InitialBrewedMonth />
      </v-col>
      <v-col cols="6">
        <FinalBrewedMonth />
      </v-col>
    </v-row>
    <span class="font-weight-bold" data-test-id="info-message">
      Se mostrarán cervezas elaboradas {{ helperText }}
    </span>
  </div>
</template>

<script>
import FinalBrewedMonth from '@/components/BeerFilters/BrewedDateFilter/FinalBrewedMonth';
import InitialBrewedMonth from '@/components/BeerFilters/BrewedDateFilter/InitialBrewedMonth';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  name: 'BrewedDateFilter',
  components: { FinalBrewedMonth, InitialBrewedMonth },
  methods: {
    ...mapActions({
      resetBrewedDateInStore: 'filter/resetBrewedDate',
      resetPageInStore: 'filter/resetPage',
    }),
    handleResetBrewedDate() {
      this.resetBrewedDateInStore();
      this.resetPageInStore();
    },
  },
  computed: {
    ...mapGetters({
      initialBrewedMonth: 'filter/initialBrewedMonth',
      finalBrewedMonth: 'filter/finalBrewedMonth',
    }),
    helperText() {
      if (!this.initialBrewedMonth && !this.finalBrewedMonth) return 'hasta la fecha actual';
      if (this.initialBrewedMonth === this.finalBrewedMonth) return `en ${this.initialBrewedMonth}`;
      if (this.initialBrewedMonth && !this.finalBrewedMonth)
        return `después de ${this.initialBrewedMonth}`;
      if (!this.initialBrewedMonth && this.finalBrewedMonth)
        return `antes de ${this.finalBrewedMonth}`;
      if (this.initialBrewedMonth && this.initialBrewedMonth)
        return `entre ${this.initialBrewedMonth} y ${this.finalBrewedMonth}`;
    },
  },
};
</script>

<style scoped></style>
