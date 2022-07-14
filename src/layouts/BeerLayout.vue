<template>
  <v-container class="text-center mt-5 body-1">
    <h1 class="text-h2">Easy Beer 🍻</h1>
    <p class="mt-3">Encuentra la cerveza que más te guste 😋</p>

    <div class="beerLayout__search align-center px-6 d-flex">
      <BeerFilterDialog />
      <BeerSearch class="ml-6" />
    </div>
    <BeerList />
    <BeerPagination />
  </v-container>
</template>

<script>
import BeerFilterDialog from '@/components/BeerFilterDialog';
import BeerList from '@/components/BeerList';
import BeerPagination from '@/components/BeerPagination';
import BeerSearch from '@/components/BeerSearch';

export default {
  name: 'BeerLayout',
  components: { BeerFilterDialog, BeerSearch, BeerPagination, BeerList },
};
</script>

<style scoped lang="scss">
.beerLayout__search {
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
