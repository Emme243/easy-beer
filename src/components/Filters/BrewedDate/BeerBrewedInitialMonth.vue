<template>
  <BeerBrewedMonth
    input-label="Mes inicial"
    :brewedMonth="brewedInitialMonth"
    :brewedMaxMonth="brewedFinalMonth"
    @setBrewedMonthInStore="setBrewedInitialMonthInStore"
  />
</template>

<script>
import BeerBrewedMonth from '@/components/Filters/BrewedDate/BeerBrewedMonth';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BeerBrewedInitialMonth',
  components: { BeerBrewedMonth },
  methods: {
    ...mapActions({ setBrewedInitialMonthInStore: 'brewedDate/setInitialMonth' }),
    setBrewedInitialMonthInUrl(month) {
      const urlQuery = { ...this.$route.query, brewedInitialMonth: month };
      if (!month) delete urlQuery.brewedInitialMonth;
      this.$router.push({ query: urlQuery });
    },
  },
  computed: {
    ...mapGetters({
      brewedInitialMonth: 'brewedDate/getInitialMonth',
      brewedFinalMonth: 'brewedDate/getFinalMonth',
    }),
  },
  watch: {
    brewedInitialMonth(newMonth) {
      this.setBrewedInitialMonthInUrl(newMonth);
    },
  },
};
</script>

<style scoped></style>
