import store from '@/store';

describe('Vuex - Pruebas en el estado de los filtros de cerveza (filterStore)', function () {
  const { minAbvDefaultValue, maxAbvDefaultValue } = store.state.filter.abvRange;
  const filterStoreWithDefaultValues = {
    minAbvValue: minAbvDefaultValue,
    maxAbvValue: maxAbvDefaultValue,
    initialBrewedMonth: '',
    finalBrewedMonth: '',
    page: 0,
    searchQuery: '',
  };
  const newFilterStore = {
    minAbvValue: 8,
    maxAbvValue: 10,
    initialBrewedMonth: '2020-01-01',
    finalBrewedMonth: '2020-01-31',
    page: 7,
    searchQuery: 'cerveza linda',
  };
  const newPage = 5;
  const newFinalBrewedMonth = '2020-01-01';
  const newSearchQuery = 'test';
  const newMinAbvValue = 5;
  const newMaxAbvValue = 53;

  // Base
  it('Debe hacer match con el estado inicial de los filtros', function () {
    const { abvRange, brewedDate, page, searchQuery } = store.state.filter;
    expect(abvRange.minAbvValue).toBe(minAbvDefaultValue);
    expect(abvRange.maxAbvValue).toBe(maxAbvDefaultValue);
    expect(brewedDate.initialBrewedMonth).toBe('');
    expect(brewedDate.finalBrewedMonth).toBe('');
    expect(page.page).toBe(0);
    expect(searchQuery.searchQuery).toBe('');
  });

  // Getters
  it('Debe obtener el estado de los filtros en su estado inicial con el getter filterStore', function () {
    const filter = store.getters['filter/filterStore'];
    expect(filter).toEqual(filterStoreWithDefaultValues);
  });

  it('Debe retornar true si todos los filtros (excepto la página) son los predeterminados, esto mediante el getter areFiltersWithDefaultValue', function () {
    store.dispatch('filter/setPage', newPage);
    const areFiltersWithDefaultValue = store.getters['filter/areFiltersWithDefaultValue'];
    expect(areFiltersWithDefaultValue).toBe(true);
  });

  it('Debe obtener el estado de los filtros con los nuevos cambios con el getter filterStore', function () {
    store.dispatch('filter/setMaxAbvValue', newMaxAbvValue);
    store.dispatch('filter/setFinalBrewedMonth', newFinalBrewedMonth);
    const filter = store.getters['filter/filterStore'];
    expect(filter).toEqual({
      ...filterStoreWithDefaultValues,
      maxAbvValue: newMaxAbvValue,
      finalBrewedMonth: newFinalBrewedMonth,
      page: newPage,
    });
  });

  it('Debe retornar false si alguno de los filtros (excepto la página) no son los predeterminados, esto mediante el getter areFiltersWithDefaultValue', function () {
    store.dispatch('filter/setPage', 9);
    const areFiltersWithDefaultValue = store.getters['filter/areFiltersWithDefaultValue'];
    expect(areFiltersWithDefaultValue).toBe(false);
  });

  // Actions
  it('Debe resetear todos los filtros a sus valores por defecto con el action resetAllFilters, tener en cuenta que la propiedad page tendrá un valor de 1', function () {
    store.dispatch('filter/setPage', newPage);
    store.dispatch('filter/setSearchQuery', newSearchQuery);
    store.dispatch('filter/setFinalBrewedMonth', newFinalBrewedMonth);
    store.dispatch('filter/setMinAbvValue', newMinAbvValue);
    store.dispatch('filter/setMaxAbvValue', newMaxAbvValue);

    store.dispatch('filter/resetAllFilters');

    const filter = store.getters['filter/filterStore'];
    expect(filter).toEqual({ ...filterStoreWithDefaultValues, page: 1 });
  });

  it('Debe resetear todos los filtros (excepto el search query) a sus valores por defecto con el action resetFiltersInFilterModal, ya que esto son filtros que se encuentran en el componente modal de filtros, tener en cuenta que la propiedad page tendrá un valor de 1', function () {
    store.dispatch('filter/setPage', newPage);
    store.dispatch('filter/setSearchQuery', newSearchQuery);
    store.dispatch('filter/setFinalBrewedMonth', newFinalBrewedMonth);
    store.dispatch('filter/setMinAbvValue', newMinAbvValue);
    store.dispatch('filter/setMaxAbvValue', newMaxAbvValue);

    store.dispatch('filter/resetFiltersInFilterModal');

    const filter = store.getters['filter/filterStore'];
    expect(filter).toEqual({
      ...filterStoreWithDefaultValues,
      page: 1,
      searchQuery: newSearchQuery,
    });
  });

  it('Debe setear todos los filtros a los nuevos valores con el action setAllFilters', function () {
    store.dispatch('filter/setAllFilters', newFilterStore);
    const filter = store.getters['filter/filterStore'];
    expect(filter).toEqual(newFilterStore);
  });
});
