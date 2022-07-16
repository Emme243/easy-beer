<template>
  <v-text-field
    :value="searchQuery"
    placeholder="Búsqueda de cerveza por nombre"
    @input="handleSearchQueryChange"
    prepend-icon="fa-solid fa-magnifying-glass"
    :append-icon="searchQuery && 'fa fa-times'"
    @click:append="handleSearchQueryChange('')"
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
