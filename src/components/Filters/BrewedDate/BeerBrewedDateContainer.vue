<template>
  <div>
    <div class="d-flex align-center">
      <h3 class="text-h6 mr-4">Fecha de elaboración</h3>
      <!--Beer Brewed Date Reset Button-->
      <button @click="handleResetBrewedDate" v-show="!!brewedInitialMonth || !!brewedFinalMonth">
        <v-icon small>fa fa-arrow-rotate-left</v-icon>
      </button>
    </div>
    <v-row>
      <v-col cols="6">
        <BeerBrewedInitialMonth />
      </v-col>
      <v-col cols="6">
        <BeerBrewedFinalMonth />
      </v-col>
    </v-row>
    <span class="font-weight-bold">Se mostrarán cervezas elaboradas {{ helperText }}</span>
  </div>
</template>

<script>
import BeerBrewedFinalMonth from '@/components/Filters/BrewedDate/BeerBrewedFinalMonth';
import BeerBrewedInitialMonth from '@/components/Filters/BrewedDate/BeerBrewedInitialMonth';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  name: 'BeerBrewedDateContainer',
  components: { BeerBrewedFinalMonth, BeerBrewedInitialMonth },
  methods: {
    ...mapActions({
      resetBrewedDate: 'brewedDate/resetBrewedDate',
      setCurrentPageInStore: 'page/setPage',
    }),
    handleResetBrewedDate() {
      this.resetBrewedDate();
      this.setCurrentPageInStore(1);
    },
  },
  computed: {
    ...mapGetters({
      brewedInitialMonth: 'brewedDate/getInitialMonth',
      brewedFinalMonth: 'brewedDate/getFinalMonth',
    }),
    helperText() {
      if (!this.brewedInitialMonth && !this.brewedFinalMonth) return 'hasta la fecha actual';
      if (this.brewedInitialMonth === this.brewedFinalMonth) return `en ${this.brewedInitialMonth}`;
      if (this.brewedInitialMonth && !this.brewedFinalMonth)
        return `después de ${this.brewedInitialMonth}`;
      if (!this.brewedInitialMonth && this.brewedFinalMonth)
        return `antes de ${this.brewedFinalMonth}`;
      if (this.brewedInitialMonth && this.brewedInitialMonth)
        return `entre ${this.brewedInitialMonth} y ${this.brewedFinalMonth}`;
    },
  },
};
</script>

<style scoped></style>
