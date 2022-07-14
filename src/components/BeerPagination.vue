<template>
  <div class="py-3 beer__pagination">
    <v-pagination
      :length="totalOfPages"
      :value="currentPage"
      light
      prev-icon="fa fa-caret-left"
      next-icon="fa fa-caret-right"
      @input="setCurrentPageInStore"
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
  methods: {
    ...mapActions({ setCurrentPageInStore: 'page/setPage' }),
    setCurrentPageInUrl(page) {
      const urlQuery = { ...this.$route.query, page };
      this.$router.push({ query: urlQuery });
    },
  },
  computed: {
    ...mapGetters({ currentPage: 'page/page' }),
  },
  watch: {
    currentPage(newPage, oldPage) {
      if (oldPage !== 0) this.setCurrentPageInUrl(newPage);
    },
  },
  mounted() {
    const currentPage = +this.$route.query.page || 1;
    this.setCurrentPageInStore(currentPage);
  },
};
</script>

<style scoped lang="scss">
.beer__pagination {
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
