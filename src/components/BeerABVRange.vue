<template>
  <div>
    <div class="d-flex align-center">
      <h3 class="text-h6 mr-4">Volumen de alcohol</h3>
      <!--ABV Beer Range Reset Button-->
      <button
        @click="handleAbvRangeChange([minAbvValue, maxAbvValue])"
        v-show="isAbvRangeDefaultValue"
      >
        <v-icon small>fa fa-arrow-rotate-left</v-icon>
      </button>
    </div>
    <v-range-slider
      :hint="`Cantidad de alcohol que tiene una cerveza [${abvRange.min} - ${abvRange.max}]%`"
      :max="maxAbvValue"
      :min="minAbvValue"
      :value="Object.values(abvRange)"
      @change="handleAbvRangeChange"
      dense
      persistent-hint
      step="1"
      thumb-label
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BeerABVRange',
  methods: {
    ...mapActions({
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
