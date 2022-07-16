<template>
  <div class="py-3 beerPagination">
    <v-pagination
      :length="totalOfPages"
      :value="page"
      light
      prev-icon="fa fa-caret-left"
      next-icon="fa fa-caret-right"
      @input="setPageInStore"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BeerPagination',
  data() {
    return {
      totalOfPages: 8,
    };
  },
  methods: mapActions({ setPageInStore: 'filter/setPage' }),
  computed: mapGetters({ page: 'filter/page' }),
};
</script>

<style scoped lang="scss">
.beerPagination {
  position: sticky;
  bottom: 0;
  background-color: rgba(256, 256, 256, 0.9);

  @supports (backdrop-filter: blur(10px)) {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    background-color: rgba(256, 256, 256, 0.8);
  }
}
</style>
