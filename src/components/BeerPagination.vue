<template>
  <div class="py-3 beer__pagination">
    <v-pagination
      :length="totalOfPages"
      v-model="currentPage"
      light
      prev-icon="fa fa-caret-left"
      next-icon="fa fa-caret-right"
      @input="setCurrentPageToUrl"
    />
  </div>
</template>

<script>
export default {
  name: 'BeerPagination',
  data() {
    return {
      currentPage: +this.$route.query.page || 1,
      totalOfPages: 8,
    };
  },
  methods: {
    setCurrentPageToUrl() {
      this.$router.push({
        query: { page: this.currentPage.toString() },
      });
      this.$emit('get-beers', this.currentPage);
    },
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
