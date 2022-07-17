import store from '@/store';

describe('Vuex - Pruebas en el estado de los filtros de cerveza (filterStore)', function () {
  it('Debe hacer match con el estado inicial de los filtros', function () {
    const { abvRange, brewedDate, page, searchQuery } = store.state.filter;
    expect(abvRange.minAbvValue).toBe(abvRange.minAbvDefaultValue);
    expect(abvRange.maxAbvValue).toBe(abvRange.maxAbvDefaultValue);
    expect(brewedDate.initialBrewedMonth).toBe('');
    expect(brewedDate.finalBrewedMonth).toBe('');
    expect(page.page).toBe(0);
    expect(searchQuery.searchQuery).toBe('');
  });
});
