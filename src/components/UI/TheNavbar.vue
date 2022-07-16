<template>
  <nav class="navbar align-center px-6 d-flex">
    <BeerFavoritesModal class="mr-5" />
    <SearchQuery class="mr-3" />
    <BeerFiltersModal>
      <AbvRangeFilter />
      <v-divider class="my-5" />
      <BrewedDateFilter />
      <v-divider class="my-5" />
    </BeerFiltersModal>
    <ResetAllBeerFiltersBtn class="ml-3" />
  </nav>
</template>

<script>
import AbvRangeFilter from '@/components/BeerFilters/AbvRangeFilter';
import BrewedDateFilter from '@/components/BeerFilters/BrewedDateFilter';
import SearchQuery from '@/components/BeerFilters/SearchQuery';
import ResetAllBeerFiltersBtn from '@/components/Buttons/ResetAllBeerFiltersBtn';
import BeerFavoritesModal from '@/components/Modals/BeerFavoritesModal';
import BeerFiltersModal from '@/components/Modals/BeerFiltersModal';

export default {
  name: 'TheNavbar',
  components: {
    ResetAllBeerFiltersBtn,
    BrewedDateFilter,
    AbvRangeFilter,
    BeerFiltersModal,
    SearchQuery,
    BeerFavoritesModal,
  },
};
</script>

<style scoped lang="scss">
.navbar {
  position: sticky;
  top: 0;
  background-color: rgba(256, 256, 256, 0.9);
  z-index: 10;

  @supports (backdrop-filter: blur(10px)) {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    background-color: rgba(256, 256, 256, 0.8);
  }
}
</style>
