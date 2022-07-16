<template>
  <div>
    <div class="d-flex align-center">
      <h3 class="text-h6 mr-4">Volumen de alcohol</h3>
      <!--Beer ABV Range Reset Button-->
      <button @click="resetAbvRangeInStore" v-show="!isAbvRangeWithDefaultValue">
        <v-icon small>fa fa-arrow-rotate-left</v-icon>
      </button>
    </div>
    <span>Cantidad de alcohol en porcentaje (%) que una cerveza tiene.</span>
    <v-range-slider
      :max="maxAbvDefaultValue"
      :min="minAbvDefaultValue"
      :value="[minAbvValue, maxAbvValue]"
      @change="handleAbvRangeChange"
      dense
      persistent-hint
      step="1"
      thumb-label
      hide-details
    />
    <span class="font-weight-bold">
      Se mostrarán cervezas con % de alcohol entre el ${{ minAbvValue }}% y el ${{ maxAbvValue }}%
    </span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BeerAbvRange',
  methods: {
    ...mapActions({
      resetAbvRangeInStore: 'filter/resetAbvRange',
      setMinAbvValueInStore: 'filter/setMinAbvValue',
      setMaxAbvValueInStore: 'filter/setMaxAbvValue',
      resetPageInStore: 'filter/resetPage',
    }),
    handleAbvRangeChange([min, max]) {
      this.setMinAbvValueInStore(min);
      this.setMaxAbvValueInStore(max);
      this.resetPageInStore();
    },
  },
  computed: mapGetters({
    minAbvValue: 'filter/minAbvValue',
    maxAbvValue: 'filter/maxAbvValue',
    minAbvDefaultValue: 'filter/minAbvDefaultValue',
    maxAbvDefaultValue: 'filter/maxAbvDefaultValue',
    isAbvRangeWithDefaultValue: 'filter/isAbvRangeWithDefaultValue',
  }),
};
</script>

<style scoped></style>
