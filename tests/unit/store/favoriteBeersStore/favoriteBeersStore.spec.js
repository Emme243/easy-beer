import store from '@/store';
import { beersMock } from '../../mocks/beersMock';

describe('Vuex - Pruebas en el estado de la cervezas que son marcadas como favoritas por el usuario', function () {
  let beers = beersMock;
  let beer = beersMock[0];

  // Base
  it('Deber haber un arreglo vacío en las cervezas favoritas como estado inicial', function () {
    const { favoriteBeers } = store.state.favoriteBeers;
    expect(favoriteBeers).toEqual([]);
  });

  // Mutaciones
  it('Deber añadir 1 CERVEZA al store mediante la mutación addBeerToFavorites', function () {
    store.commit('favoriteBeers/addBeerToFavorites', beer);
    const { favoriteBeers } = store.state.favoriteBeers;
    expect(favoriteBeers).toContainEqual(beer);
    expect(favoriteBeers.length).toBe(1);
  });

  it('Deber eliminar la CERVEZA añadida por id del store mediante la mutación removeBeerFromFavorites', function () {
    store.commit('favoriteBeers/removeBeerFromFavorites', beer.id);
    const { favoriteBeers } = store.state.favoriteBeers;
    expect(favoriteBeers).not.toContainEqual(beer);
    expect(favoriteBeers.length).toBe(0);
  });

  it('Deberá setear un arreglo de cervezas al store mediante la mutación setFavoriteBeers', function () {
    store.commit('favoriteBeers/setFavoriteBeers', beers);
    const { favoriteBeers } = store.state.favoriteBeers;
    expect(favoriteBeers).toEqual(beers);
    expect(favoriteBeers.length).toBe(beers.length);
    expect(favoriteBeers.length).toBeGreaterThan(0);
  });

  it('Deberá resetear el arreglo de cervezas al store mediante la mutación resetFavoriteBeers', function () {
    store.commit('favoriteBeers/resetFavoriteBeers');
    const { favoriteBeers } = store.state.favoriteBeers;
    expect(favoriteBeers).toEqual([]);
    expect(favoriteBeers.length).toBe(0);
  });

  // Acciones
  it('Deberá haber llamado a la mutación setFavoriteBeers mediante la acción setFavoriteBeers', function () {
    store.dispatch('favoriteBeers/setFavoriteBeers', beers);
    const { favoriteBeers } = store.state.favoriteBeers;
    expect(favoriteBeers).toEqual(beers);
  });

  it('Deberá eliminar la cerveza del store si esta ya está añadida, esto mediante la acción handleBeerInFavorites', function () {
    store.dispatch('favoriteBeers/handleBeerInFavorites', beer);
    const { favoriteBeers } = store.state.favoriteBeers;
    expect(favoriteBeers.length).toBe(beers.length - 1);
    expect(favoriteBeers.length).toBeGreaterThan(0);
    expect(favoriteBeers).not.toContainEqual(beer);
  });

  it('Deberá añadir la cerveza al store si no está añadida, esto mediante la acción handleBeerInFavorites', function () {
    store.dispatch('favoriteBeers/handleBeerInFavorites', beer);
    const { favoriteBeers } = store.state.favoriteBeers;
    expect(favoriteBeers.length).toBe(beers.length);
    expect(favoriteBeers.length).toBeGreaterThan(0);
    expect(favoriteBeers).toContainEqual(beer);
  });

  // Getters
  it('Deberá obtener el arreglo de cervezas favoritas del store mediante el getter getAllFavoriteBeers', function () {
    const favoriteBeers = store.getters['favoriteBeers/getAllFavoriteBeers'];
    expect(favoriteBeers).toEqual(expect.arrayContaining(beers));
    expect(favoriteBeers.length).toBe(beers.length);
    expect(favoriteBeers.length).toBeGreaterThan(0);
  });

  it('Deberá afirmar que la cerveza se encuentre en el store mediante el getter isBeerInFavorites', function () {
    const isBeerInFavorites = store.getters['favoriteBeers/isBeerInFavorites'](beer.id);
    expect(isBeerInFavorites).toBeTruthy();
  });

  it('Deberá negar que la cerveza se encuentre en el store mediante el getter isBeerInFavorites', function () {
    const isBeerInFavorites = store.getters['favoriteBeers/isBeerInFavorites']('213123');
    expect(isBeerInFavorites).toBeFalsy();
  });
});
