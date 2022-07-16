<template>
  <BrewedMonth
    input-label="Mes final"
    :brewed-month="finalBrewedMonth"
    :brewed-min-month="initialBrewedMonth"
    @setBrewedMonthInStore="setFinalBrewedMonthInStore"
  />
</template>

<script>
import BrewedMonth from '@/components/Filters/BeerBrewedDate/BrewedMonth';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'FinalBrewedMonth',
  components: { BrewedMonth },
  methods: mapActions({ setFinalBrewedMonthInStore: 'filter/setFinalBrewedMonth' }),
  computed: mapGetters({
    initialBrewedMonth: 'filter/initialBrewedMonth',
    finalBrewedMonth: 'filter/finalBrewedMonth',
  }),
};
</script>

<style scoped></style>
