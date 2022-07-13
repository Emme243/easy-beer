<template>
  <v-container class="text-center mt-5 body-1">
    <h1 class="text-h2">Easy Beer 🍻</h1>
    <p class="mt-3">Encuentra la cerveza que más te guste 😋</p>

    <BeerList class="my-10" />
  </v-container>
</template>

<script>
import BeerList from '@/components/BeerList';

export default {
  name: 'BeerContainer',
  components: { BeerList },
};
</script>
