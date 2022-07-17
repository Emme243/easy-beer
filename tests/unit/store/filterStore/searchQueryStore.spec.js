import store from '@/store';

describe('Vuex - Pruebas en el estado de búsqueda por nombre de cervezas', function () {
  // Base
  it('Debe haber un valor vacío en el estado de búsqueda por nombre de cervezas', function () {
    const { searchQuery } = store.state.filter.searchQuery;
    expect(searchQuery).toBe('');
  });

  // Mutations
  it('Debe poder setear un valor de búsqueda mediante la mutación setSearchQuery', function () {
    const beerSearchQuery = 'Pilsen';
    store.commit('filter/setSearchQuery', beerSearchQuery);
    const { searchQuery } = store.state.filter.searchQuery;
    expect(searchQuery).toBe(beerSearchQuery);
  });

  // Actions
  it('Debe poder setear un valor de búsqueda mediante la acción setSearchQuery', function () {
    const beerSearchQuery = 'Pilsen';
    store.dispatch('filter/setSearchQuery', beerSearchQuery);
    const { searchQuery } = store.state.filter.searchQuery;
    expect(searchQuery).toBe(beerSearchQuery);
  });

  it('Debe poder setear un valor vacío de búsqueda si no recibe un valor de tipo string o numérico', function () {
    const beerSearchQuery = false;
    store.dispatch('filter/setSearchQuery', beerSearchQuery);
    const { searchQuery } = store.state.filter.searchQuery;
    expect(searchQuery).toBe('');
  });

  // Getters
  it('Debe poder obtener el valor de búsqueda mediante el getter searchQuery', function () {
    const beerSearchQuery = 'Pilsen';
    store.commit('filter/setSearchQuery', beerSearchQuery);
    const searchQuery = store.getters['filter/searchQuery'];
    expect(searchQuery).toBe(beerSearchQuery);
  });
});
