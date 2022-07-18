import { $api } from '@/api';
import BeerList from '@/components/BeerList';
import store from '@/store';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import { beersMock } from '../mocks/beersMock';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(beersMock),
  })
);

describe('Pruebas en el componente beerList.vue', function () {
  let vuetify;
  const localVue = createLocalVue();

  // router mock
  const router = { push: jest.fn() };
  // route mock
  const route = { query: {} };
  const mountFunction = options => {
    return shallowMount(BeerList, {
      localVue,
      vuetify,
      store,
      mocks: { $route: route, $router: router, $api },
      ...options,
    });
  };

  beforeEach(() => {
    fetch.mockClear();
    vuetify = new Vuetify();
  });

  const beerLoaderSelector = '[data-test-id="beer-loader"]';
  const beerErrorMessageSelector = '[data-test-id="beer-error-message"]';
  const noBeerMessageSelector = '[data-test-id="no-beer-message"]';
  const beerContainerSelector = '[data-test-id="beer-container"]';

  it('Debe hacer match con el snapshot', () => {
    const wrapper = mountFunction();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Debe mostrar un loader cuando se carga la lista de cervezas', () => {
    const wrapper = mountFunction({ data: () => ({ isLoading: true }) });
    expect(wrapper.find(beerLoaderSelector).exists()).toBe(true);
  });

  it('Debe mostrar un mensaje de error cuando se produce un error al cargar la lista de cervezas', () => {
    const wrapper = mountFunction({ data: () => ({ isLoading: false, hasError: true }) });
    expect(wrapper.find(beerErrorMessageSelector).exists()).toBe(true);
  });

  it('Debe mostrar un mensaje al usuario cuando no se encuentran cervezas', () => {
    const wrapper = mountFunction({
      data: () => ({ isLoading: false, hasError: false, beers: [] }),
    });
    expect(wrapper.find(noBeerMessageSelector).exists()).toBe(true);
  });

  it('Debe mostrar la lista de cervezas', () => {
    const wrapper = mountFunction({
      data: () => ({ isLoading: false, hasError: false, beers: beersMock }),
    });
    const cards = wrapper.findAll(`${beerContainerSelector} > beerinfocard-stub`);
    expect(cards.length).toBe(beersMock.length);
    expect(wrapper.find(beerContainerSelector).exists()).toBe(true);
  });

  it('Cuando el filterStore cambia, se debe disparar el método updateQueryParamsInUrl', async () => {
    const wrapper = mountFunction();
    const spy = jest.spyOn(wrapper.vm, 'updateQueryParamsInUrl');
    store.commit('filter/setPage', 2);
    await wrapper.vm.$nextTick();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('El filterStore no debe dispararse cuando se monte el componente', () => {
    const wrapper = mountFunction({});
    const spy = jest.spyOn(wrapper.vm, 'fetchBeers');
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('Cuando el filterStore cambiar, se debe disparar el método fetchBeers', async () => {
    const wrapper = mountFunction({});
    const spy = jest.spyOn(wrapper.vm, 'fetchBeers');
    store.commit('filter/setInitialBrewedMonth', '01-2019');
    await wrapper.vm.$nextTick();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Cuando varias propiedades del filterStore cambian, se debe disparar el método fetchBeers una vez', async () => {
    const wrapper = mountFunction({});
    const spy = jest.spyOn(wrapper.vm, 'fetchBeers');
    store.commit('filter/setPage', 2);
    store.commit('filter/setInitialBrewedMonth', '01-2019');
    store.commit('filter/setFinalBrewedMonth', '02-2022');
    store.commit('filter/setMinAbvValue', 7);
    await wrapper.vm.$nextTick();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
