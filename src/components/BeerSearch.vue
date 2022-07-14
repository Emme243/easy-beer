<template>
  <div class="d-flex align-center">
    <v-text-field :value="searchQuery" placeholder="Búsqueda" @input="handleSearchQueryChange" />
    <button class="ml-5" @click="handleSearchQueryChange('')">
      <v-icon>fa fa-times</v-icon>
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BeerSearch',
  methods: {
    ...mapActions({
      setSearchQueryInStore: 'search/setSearch',
      setCurrentPageInStore: 'page/setPage',
    }),
    setSearchQueryInUrl(searchQuery) {
      const urlQuery = { ...this.$route.query, search: searchQuery };
      if (!searchQuery) delete urlQuery.search;
      this.$router.push({ query: urlQuery });
    },
    handleSearchQueryChange(searchQuery) {
      this.setSearchQueryInStore(searchQuery);
      this.setCurrentPageInStore(1);
    },
  },
  computed: {
    ...mapGetters({ searchQuery: 'search/search' }),
  },
  watch: {
    searchQuery(newSearchQuery, oldSearchQuery) {
      if (oldSearchQuery) this.setSearchQueryInUrl(newSearchQuery);
    },
  },
  mounted() {
    const searchQuery = this.$route.query.search || '';
    this.setSearchQueryInStore(searchQuery);
  },
};
</script>

<style scoped></style>
