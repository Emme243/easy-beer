<template>
  <v-app>
    <v-container class="text-center mt-5 body-1">
      <TheHeader />
      <TheNavbar />
      <v-main>
        <BeerList />
      </v-main>
      <Pagination />
    </v-container>
  </v-app>
</template>

<script>
import BeerList from '@/components/BeerList';
import Pagination from '@/components/BeerFilters/Pagination';
import TheHeader from '@/components/UI/TheHeader';
import TheNavbar from '@/components/UI/TheNavbar';
import { mapActions } from 'vuex';

export default {
  name: 'HomeView',
  components: {
    BeerList,
    Pagination,
    TheHeader,
    TheNavbar,
  },
  methods: mapActions({
    setAllFiltersInStore: 'filter/setAllFilters',
    setFavoriteBeersInStore: 'favoriteBeers/setFavoriteBeers',
  }),
  mounted() {
    // NOTE: En este punto ya se ha cargado el componente BeerLayout.vue
    //       y se puede acceder a los datos de filtrado en la query de la url,
    //       por lo que podemos setear esos valores en el store.
    //       De este modo, cada vez que el usuario refresque la página, no perderá los filtros.
    this.setAllFiltersInStore(this.$route.query);

    // NOTE: También podemos traer todas las cervezas marcadas como favoritas
    //       por el usuario desde el localStorage y setearlas en el store.
    const favoriteBeers = localStorage.getItem('favoriteBeers');
    if (favoriteBeers) this.setFavoriteBeersInStore(JSON.parse(favoriteBeers));
  },
};
</script>
