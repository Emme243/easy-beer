import store from '@/store';

describe('Vuex - Pruebas en el estado de filtrado de cervezas por fecha de elaboración (Mes inicial y mes final)', function () {
  const newInitialBrewedMonth = '02-2014';
  const newFinalBrewedMonth = '07-2014';

  // Base
  it('Debe haber un valor vacío como valor inicial del mes inicial de elaboración (initialBrewedMonth)', function () {
    const { initialBrewedMonth } = store.state.filter.brewedDate;
    expect(initialBrewedMonth).toBe('');
  });

  it('Debe haber un valor vacío como valor inicial del mes final de elaboración (finalBrewedMonth)', function () {
    const { finalBrewedMonth } = store.state.filter.brewedDate;
    expect(finalBrewedMonth).toBe('');
  });

  // Mutations
  it('Debe poder cambiar el valor initialBrewedMonth mediante la mutación setInitialBrewedMonth', function () {
    store.commit('filter/setInitialBrewedMonth', newInitialBrewedMonth);
    const { initialBrewedMonth } = store.state.filter.brewedDate;
    expect(initialBrewedMonth).toBe(newInitialBrewedMonth);
  });

  it('Debe poder cambiar el valor finalBrewedMonth mediante la mutación setFinalBrewedMonth', function () {
    store.commit('filter/setFinalBrewedMonth', newFinalBrewedMonth);
    const { finalBrewedMonth } = store.state.filter.brewedDate;
    expect(finalBrewedMonth).toBe(newFinalBrewedMonth);
  });

  // Actions
  it('Debe cambiar el valor initialBrewedMonth mediante la acción setInitialBrewedMonth', function () {
    store.dispatch('filter/setInitialBrewedMonth', newInitialBrewedMonth);
    const { initialBrewedMonth } = store.state.filter.brewedDate;
    expect(initialBrewedMonth).toBe(newInitialBrewedMonth);
  });

  it('Debe cambiar el valor initialBrewedMonth a "" si se le pasa un valor no string mediante la acción setInitialBrewedMonth', function () {
    store.dispatch('filter/setInitialBrewedMonth', false);
    const { initialBrewedMonth } = store.state.filter.brewedDate;
    expect(initialBrewedMonth).toBe('');
  });

  it('Debe cambiar el valor finalBrewedMonth mediante la acción setFinalBrewedMonth', function () {
    store.dispatch('filter/setFinalBrewedMonth', newFinalBrewedMonth);
    const { finalBrewedMonth } = store.state.filter.brewedDate;
    expect(finalBrewedMonth).toBe(newFinalBrewedMonth);
  });

  it('Debe cambiar el valor finalBrewedMonth a "" si se le pasa un valor no string mediante la acción setFinalBrewedMonth', function () {
    store.dispatch('filter/setFinalBrewedMonth', false);
    const { finalBrewedMonth } = store.state.filter.brewedDate;
    expect(finalBrewedMonth).toBe('');
  });

  it('Debe resetear ambos valores (brewedInitialMonth y brewedFinalMonth) mediante la acción resetBrewedDate', function () {
    store.dispatch('filter/setInitialBrewedMonth', newInitialBrewedMonth);
    store.dispatch('filter/setFinalBrewedMonth', newFinalBrewedMonth);
    store.dispatch('filter/resetBrewedDate');
    const { initialBrewedMonth, finalBrewedMonth } = store.state.filter.brewedDate;
    expect(initialBrewedMonth).toBe('');
    expect(finalBrewedMonth).toBe('');
  });

  // Getters
  it('Debe obtener el valor initialBrewedMonth mediante el getter initialBrewedMonth', function () {
    store.commit('filter/setInitialBrewedMonth', newInitialBrewedMonth);
    const initialBrewedMonth = store.getters['filter/initialBrewedMonth'];
    expect(initialBrewedMonth).toBe(newInitialBrewedMonth);
  });

  it('Debe obtener el valor finalBrewedMonth mediante el getter finalBrewedMonth', function () {
    store.commit('filter/setFinalBrewedMonth', newFinalBrewedMonth);
    const finalBrewedMonth = store.getters['filter/finalBrewedMonth'];
    expect(finalBrewedMonth).toBe(newFinalBrewedMonth);
  });
});
