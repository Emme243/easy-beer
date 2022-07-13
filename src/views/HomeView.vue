<template>
  <v-app>
    <v-main>
      <BeerContainer />
    </v-main>
  </v-app>
</template>

<script>
import BeerContainer from '@/components/BeerContainer';

export default {
  name: 'HomeView',
  components: { BeerContainer },
};
</script>
