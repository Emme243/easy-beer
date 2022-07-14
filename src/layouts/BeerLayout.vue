<template>
  <v-container class="text-center mt-5 body-1">
    <h1 class="text-h2">Easy Beer 🍻</h1>
    <p class="mt-3">Encuentra la cerveza que más te guste 😋</p>

    <BeerSearch />
    <BeerList />
    <BeerPagination />
  </v-container>
</template>

<script>
import BeerList from '@/components/BeerList';
import BeerPagination from '@/components/BeerPagination';
import BeerSearch from '@/components/BeerSearch';

export default {
  name: 'BeerLayout',
  components: { BeerSearch, BeerPagination, BeerList },
};
</script>
