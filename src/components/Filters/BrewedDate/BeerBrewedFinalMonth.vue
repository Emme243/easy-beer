<template>
  <BeerBrewedMonth
    input-label="Mes final"
    :brewed-month="brewedFinalMonth"
    :brewed-min-month="brewedInitialMonth"
    @setBrewedMonthInStore="setBrewedFinalMonthInStore"
  />
</template>

<script>
import BeerBrewedMonth from '@/components/Filters/BrewedDate/BeerBrewedMonth';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'BeerBrewedFinalMonth',
  components: { BeerBrewedMonth },
  methods: {
    ...mapActions({ setBrewedFinalMonthInStore: 'brewedDate/setFinalMonth' }),
    setBrewedFinalMonthInUrl(month) {
      const urlQuery = { ...this.$route.query, brewedFinalMonth: month };
      if (!month) delete urlQuery.brewedFinalMonth;
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
    brewedFinalMonth(newMonth) {
      this.setBrewedFinalMonthInUrl(newMonth);
    },
  },
};
</script>

<style scoped></style>
