import store from '@/store';
import HomeView from '@/views/HomeView';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import { beersMock } from '../mocks/beersMock';

describe('Pruebas en el componente HomeView.vue', function () {
  let vuetify;
  const localVue = createLocalVue();
  const initialQueryParams = {
    page: 5,
    searchQuery: 'Cerveza linda',
    minAbvValue: 5,
    initialBrewedMonth: '01-2020',
  };

  const mountFunction = () => {
    return shallowMount(HomeView, {
      localVue,
      vuetify,
      store,
      mocks: {
        $route: { query: initialQueryParams },
      },
    });
  };

  beforeEach(() => {
    vuetify = new Vuetify();
    store.dispatch = jest.fn();
  });

  it('Debe hacer match con el snapshot', function () {
    const wrapper = mountFunction();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Debe haber llamado el dispatch setAllFilters con los query params del url al haberse montado', function () {
    mountFunction();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith('filter/setAllFilters', initialQueryParams);
  });

  it('No debe llamar al dispatch setFavoriteBeers si no hay cervezas favoritas en el localStorage', function () {
    mountFunction();
    expect(store.dispatch).not.toHaveBeenCalledWith('favoriteBeers/setFavoriteBeers');
    expect(store.dispatch).toHaveBeenCalledTimes(1); // Se llama al dispatch setAllFilters
  });

  it('Debe llamar al dispatch setFavoriteBeers si hay cervezas favoritas en el localStorage', function () {
    localStorage.setItem('favoriteBeers', JSON.stringify(beersMock));
    mountFunction();
    expect(store.dispatch).toHaveBeenCalledWith('favoriteBeers/setFavoriteBeers', beersMock);
    expect(store.dispatch).toHaveBeenCalledTimes(2); // Se llama al dispatch setAllFilters y al dispatch setFavoriteBeers
  });
});
