<template>
  <div>
    <div class="d-flex align-center">
      <h3 class="text-h6 mr-4">Volumen de alcohol</h3>
      <!--Beer ABV Range Reset Button-->
      <button @click="resetAbvRangeInStore" v-show="!isAbvRangeDefaultValue">
        <v-icon small>fa fa-arrow-rotate-left</v-icon>
      </button>
    </div>
    <span>Cantidad de alcohol en porcentaje (%) que una cerveza tiene.</span>
    <v-range-slider
      :max="maxAbvValue"
      :min="minAbvValue"
      :value="Object.values(abvRange)"
      @change="handleAbvRangeChange"
      dense
      persistent-hint
      step="1"
      thumb-label
      hide-details
    />
    <span class="font-weight-bold">
      Se mostrarán cervezas con % de alcohol entre el ${{ abvRange.min }}% y el ${{ abvRange.max }}%
    </span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BeerABVRange',
  methods: {
    ...mapActions({
      resetAbvRangeInStore: 'abvRange/resetAbvRange',
      setAbvRangeInStore: 'abvRange/setAbvRange',
      setCurrentPageInStore: 'page/setPage',
    }),
    setAbvRangeInUrl({ abvMin, abvMax }) {
      const urlQuery = { ...this.$route.query, abvMin, abvMax };
      this.$router.push({ query: urlQuery });
    },
    handleAbvRangeChange([min, max]) {
      this.setAbvRangeInStore({ min, max });
      this.setCurrentPageInStore(1);
    },
  },
  computed: {
    ...mapGetters({
      abvRange: 'abvRange/abvRange',
      minAbvValue: 'abvRange/minAbvValue',
      maxAbvValue: 'abvRange/maxAbvValue',
    }),
    isAbvRangeDefaultValue() {
      return this.abvRange.min === this.minAbvValue && this.abvRange.max === this.maxAbvValue;
    },
  },
  watch: {
    abvRange(newAbvRange) {
      this.setAbvRangeInUrl({ abvMin: newAbvRange.min, abvMax: newAbvRange.max });
    },
  },
};
</script>

<style scoped></style>
