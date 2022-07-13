<template>
  <v-app>
    <v-main>
      <BeerLayout />
    </v-main>
  </v-app>
</template>

<script>
import BeerLayout from '@/layouts/BeerLayout';

export default {
  name: 'HomeView',
  components: { BeerLayout },
};
</script>
