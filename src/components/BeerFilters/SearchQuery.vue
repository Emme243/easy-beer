<template>
  <v-text-field
    id="search-query-input"
    :append-icon="searchQuery && 'fa fa-times'"
    :value="searchQuery"
    @click:append="handleSearchQueryChange('')"
    @input="handleSearchQueryChange"
    placeholder="Búsqueda de cerveza por nombre"
    prepend-icon="fa-solid fa-magnifying-glass"
  />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'SearchQuery',
  methods: {
    ...mapActions({
      setSearchQueryInStore: 'filter/setSearchQuery',
      resetPageInStore: 'filter/resetPage',
    }),
    handleSearchQueryChange(searchQuery) {
      this.setSearchQueryInStore(searchQuery);
      this.resetPageInStore();
    },
  },
  computed: mapGetters({ searchQuery: 'filter/searchQuery' }),
};
</script>
