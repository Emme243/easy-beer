<template>
  <v-container class="text-center mt-5 body-1">
    <h1 class="text-h2">Easy Beer 🍻</h1>
    <p>Encuentra la bebida que más te guste.</p>
    <v-icon>fa fa-user</v-icon>

    <BeerList />
  </v-container>
</template>

<script>
import BeerList from '@/components/BeerList';

export default {
  name: 'BeerContainer',
  components: { BeerList },
};
</script>
