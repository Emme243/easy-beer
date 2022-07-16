<template>
  <BrewedMonth
    input-label="Mes inicial"
    :brewed-month="initialBrewedMonth"
    :brewed-max-month="finalBrewedMonth"
    @setBrewedMonthInStore="setInitialBrewedMonthInStore"
  />
</template>

<script>
import BrewedMonth from '@/components/Filters/BeerBrewedDate/BrewedMonth';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'InitialBrewedMonth',
  components: { BrewedMonth },
  methods: mapActions({ setInitialBrewedMonthInStore: 'filter/setInitialBrewedMonth' }),
  computed: mapGetters({
    initialBrewedMonth: 'filter/initialBrewedMonth',
    finalBrewedMonth: 'filter/finalBrewedMonth',
  }),
};
</script>

<style scoped></style>
