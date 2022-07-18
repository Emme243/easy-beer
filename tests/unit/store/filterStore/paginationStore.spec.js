import store from '@/store';

describe('Vuex - Pruebas en el estado de la paginación de cervezas', function () {
  // Base
  it('Debe tener 0 como valor inicial de la paginación', function () {
    const { page } = store.state.filter.page;
    expect(page).toBe(0);
  });

  // Mutations
  it('Debe poder cambiar el valor de la paginación a 5 mediante la mutación setPage', function () {
    const newPage = 5;
    store.commit('filter/setPage', newPage);
    const { page } = store.state.filter.page;
    expect(page).toBe(newPage);
  });

  // Actions
  it('Debe cambiar el valor de la paginación a 1 si se le pasa un valor no numérico mediante la acción setPage', function () {
    store.dispatch('filter/setPage', 'a');
    const { page } = store.state.filter.page;
    expect(page).toBe(1);
  });

  it('Debe resetear el valor de la paginación a 1 mediante la acción resetPage', function () {
    store.dispatch('filter/setPage', 5);
    store.dispatch('filter/resetPage');
    const { page } = store.state.filter.page;
    expect(page).toBe(1);
  });

  // Getters
  it('Debe obtener el valor de la paginación mediante el getter page', function () {
    const newPage = 5;
    store.commit('filter/setPage', newPage);
    const page = store.getters['filter/page'];
    expect(page).toBe(newPage);
  });
});
