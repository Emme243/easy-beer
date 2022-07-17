import store from '@/store';

describe('Vuex - Pruebas en el estado de filtrado de cerveza mediante porcentaje de alcohol que estas contienes, en un rango de valor mínimo(2) y valor máximo(60)', function () {
  const { minAbvDefaultValue, maxAbvDefaultValue } = store.state.filter.abvRange;
  const newMinAbvValue = 15;
  const newMaxAbvValue = 36;

  // Base
  it('Debe el minAbvValue ser igual al valor mínimo por defecto', function () {
    const { minAbvValue } = store.state.filter.abvRange;
    expect(minAbvValue).toBe(minAbvDefaultValue);
  });

  it('Debe el maxAbvValue ser igual al valor máximo por defecto', function () {
    const { maxAbvValue } = store.state.filter.abvRange;
    expect(maxAbvValue).toBe(maxAbvDefaultValue);
  });

  // Mutations
  it('Debe setear el nuevo valor mínimo de porcentaje de alcohol mediante la mutación setMinAbvValue', function () {
    store.commit('filter/setMinAbvValue', newMinAbvValue);
    const { minAbvValue } = store.state.filter.abvRange;
    expect(minAbvValue).toBe(newMinAbvValue);
  });

  it('Debe setear el nuevo valor máximo de porcentaje de alcohol mediante la mutación setMaxAbvValue', function () {
    store.commit('filter/setMaxAbvValue', newMaxAbvValue);
    const { maxAbvValue } = store.state.filter.abvRange;
    expect(maxAbvValue).toBe(newMaxAbvValue);
  });

  it('Debe resetear el rango de porcentaje de alcohol mediante la mutación resetAbvRange a los valores por defecto', function () {
    store.commit('filter/resetAbvRange');
    const { minAbvValue, maxAbvValue } = store.state.filter.abvRange;
    expect(minAbvValue).toBe(minAbvDefaultValue);
    expect(maxAbvValue).toBe(maxAbvDefaultValue);
  });

  // Actions
  it('Debe setear el nuevo valor mínimo de porcentaje de alcohol mediante la acción setMinAbvValue', function () {
    store.dispatch('filter/setMinAbvValue', newMinAbvValue);
    const { minAbvValue } = store.state.filter.abvRange;
    expect(minAbvValue).toBe(newMinAbvValue);
  });

  it('Debe setear el nuevo valor máximo de porcentaje de alcohol mediante la acción setMaxAbvValue', function () {
    store.dispatch('filter/setMaxAbvValue', newMaxAbvValue);
    const { maxAbvValue } = store.state.filter.abvRange;
    expect(maxAbvValue).toBe(newMaxAbvValue);
  });

  it('Debe setear el valor mínimo por defecto cuando el nuevo valor mínimo no sea válido', function () {
    store.dispatch('filter/setMinAbvValue', 'hola');
    const { minAbvValue } = store.state.filter.abvRange;
    expect(minAbvValue).toBe(minAbvDefaultValue);
  });

  it('Debe setear el valor máximo por defecto cuando el nuevo valor máximo no sea válido', function () {
    store.dispatch('filter/setMaxAbvValue', 'hola');
    const { maxAbvValue } = store.state.filter.abvRange;
    expect(maxAbvValue).toBe(maxAbvDefaultValue);
  });

  it('Debe resetear el rango de porcentaje de alcohol mediante la acción resetAbvRange', function () {
    store.dispatch('filter/resetAbvRange');
    const { minAbvValue, maxAbvValue } = store.state.filter.abvRange;
    expect(minAbvValue).toBe(minAbvDefaultValue);
    expect(maxAbvValue).toBe(maxAbvDefaultValue);
  });

  // Getters
  it('Debe el getter isAbvRangeWithDefaultValue retornar true cuando el valor mínimo y máximo son iguales al valor mínimo por defecto y el valor máximo por defecto', function () {
    const isAbvRangeWithDefaultValue = store.getters['filter/isAbvRangeWithDefaultValue'];
    expect(isAbvRangeWithDefaultValue).toBeTruthy();
  });

  it('Debe el getter isAbvRangeWithDefaultValue retornar false cuando el valor mínimo y máximo no son iguales al valor mínimo por defecto y el valor máximo por defecto', function () {
    store.dispatch('filter/setMaxAbvValue', newMaxAbvValue);
    const isAbvRangeWithDefaultValue = store.getters['filter/isAbvRangeWithDefaultValue'];
    expect(isAbvRangeWithDefaultValue).toBeFalsy();
  });

  it('Debe el getter newValidAbvValue retornar el valor mínimo por defecto cuando el nuevo valor mínimo no esté en el rango definido por defecto (2-60)', function () {
    const newValidAbvValue = store.getters['filter/newValidAbvValue'](923, 'min');
    expect(newValidAbvValue).toBe(minAbvDefaultValue);
  });

  it('Debe el getter newValidAbvValue retornar el valor máximo por defecto cuando el nuevo valor máximo no esté en el rango definido por defecto (2-60)', function () {
    const newValidAbvValue = store.getters['filter/newValidAbvValue'](923, 'max');
    expect(newValidAbvValue).toBe(maxAbvDefaultValue);
  });

  it('Debe el getter newValidAbvValue retornar el valor mínimo por defecto cuando el nuevo valor mínimo no sea numérico', function () {
    const newValidAbvValue = store.getters['filter/newValidAbvValue']('hola', 'min');
    expect(newValidAbvValue).toBe(minAbvDefaultValue);
  });

  it('Debe el getter newValidAbvValue retornar el valor máximo por defecto cuando el nuevo valor máximo no sea numérico', function () {
    const newValidAbvValue = store.getters['filter/newValidAbvValue']('hola', 'max');
    expect(newValidAbvValue).toBe(maxAbvDefaultValue);
  });

  it('Debe el getter newValidAbvValue retornar el nuevo valor mínimo cuando el nuevo valor mínimo esté en el rango definido por defecto (2-60)', function () {
    const newValidAbvValue = store.getters['filter/newValidAbvValue'](15, 'min');
    expect(newValidAbvValue).toBe(15);
  });

  it('Debe el getter newValidAbvValue retornar el nuevo valor máximo cuando el nuevo valor máximo esté en el rango definido por defecto (2-60)', function () {
    const newValidAbvValue = store.getters['filter/newValidAbvValue'](39, 'max');
    expect(newValidAbvValue).toBe(39);
  });

  it('Debe traer el valor mínimo de porcentaje de alcohol mediante el getter minAbvValue', function () {
    store.dispatch('filter/setMinAbvValue', newMinAbvValue);
    const minAbvValue = store.getters['filter/minAbvValue'];
    expect(minAbvValue).toBe(newMinAbvValue);
  });

  it('Debe traer el valor máximo de porcentaje de alcohol mediante el getter maxAbvValue', function () {
    store.dispatch('filter/setMaxAbvValue', newMaxAbvValue);
    const maxAbvValue = store.getters['filter/maxAbvValue'];
    expect(maxAbvValue).toBe(newMaxAbvValue);
  });
});
