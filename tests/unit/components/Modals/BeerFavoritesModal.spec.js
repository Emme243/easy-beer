import BeerFavoritesModal from '@/components/Modals/BeerFavoritesModal';
import store from '@/store';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import { beersMock } from '../../mocks/beersMock';

describe('Pruebas en BeerFavoritesModal.spec.js', function () {
  let vuetify;
  const localVue = createLocalVue();

  const mountFunction = options => {
    return shallowMount(BeerFavoritesModal, {
      localVue,
      vuetify,
      store,
      ...options,
    });
  };

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const beer = beersMock[0];
  const closeModalBtnSelector = '[data-test-id="close-modal-btn"]';
  const closeModalCerrarBtnSelector = '[data-test-id="close-modal-cerrar-btn"]';
  const noBeersMessageSelector = '[data-test-id="no-beers-message"]';
  const beersContainerSelector = '[data-test-id="beers-container"]';
  const resetFavoritesBtnSelector = '[data-test-id="reset-favorites-btn"]';

  it('Debe hacer match con el snapshot', () => {
    const wrapper = mountFunction();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('El botón closeModalBtn debe setear la propiedad isModalOpen en false cuando se haga click', async () => {
    const wrapper = mountFunction({ data: () => ({ isModalOpen: true }) });
    const closeModalBtn = wrapper.find(closeModalBtnSelector);
    expect(closeModalBtn.exists()).toBe(true);
    expect(wrapper.vm.isModalOpen).toBe(true);
    closeModalBtn.vm.$emit('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isModalOpen).toBe(false);
  });

  it('El botón closeModalCerrarBtn debe setear la propiedad isModalOpen en false cuando se haga click', async () => {
    const wrapper = mountFunction({ data: () => ({ isModalOpen: true }) });
    const closeModalCerrarBtn = wrapper.find(closeModalCerrarBtnSelector);
    expect(closeModalCerrarBtn.exists()).toBe(true);
    expect(wrapper.vm.isModalOpen).toBe(true);
    closeModalCerrarBtn.vm.$emit('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isModalOpen).toBe(false);
  });

  it('El mensaje noBeersMessage debe mostrarse cuando no hay bebidas favoritas', async () => {
    const wrapper = mountFunction();
    expect(wrapper.find(noBeersMessageSelector).exists()).toBe(true);
  });

  it('El mensaje noBeersMessage debe ocultarse cuando hay bebidas favoritas', async () => {
    const wrapper = mountFunction({ computed: { favoriteBeersInStore: () => [beer] } });
    expect(wrapper.find(noBeersMessageSelector).exists()).toBe(false);
  });

  it('El contenedor beersContainer debe mostrarse cuando hay bebidas favoritas', async () => {
    const wrapper = mountFunction({ computed: { favoriteBeersInStore: () => [beer] } });
    expect(wrapper.find(beersContainerSelector).exists()).toBe(true);
  });

  it('El contenedor beersContainer debe ocultarse cuando no hay bebidas favoritas', async () => {
    const wrapper = mountFunction();
    expect(wrapper.find(beersContainerSelector).exists()).toBe(false);
  });

  it('El botón resetFavoritesBtn debe llamar al dispatch resetFavoriteBeers cuando se haga click, esto cuando haya cervezas favoritas', async () => {
    store.dispatch = jest.fn();
    const wrapper = mountFunction({ computed: { favoriteBeersInStore: () => [beer] } });
    const resetFavoritesBtn = wrapper.find(resetFavoritesBtnSelector);
    expect(resetFavoritesBtn.exists()).toBe(true);
    resetFavoritesBtn.vm.$emit('click');
    await wrapper.vm.$nextTick();
    expect(store.dispatch).toHaveBeenCalledWith('favoriteBeers/resetFavoriteBeers');
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('El botón resetFavoritesBtn debe estar deshabilitado cuando no haya cervezas favoritas', async () => {
    const wrapper = mountFunction();
    const resetFavoritesBtn = wrapper.find(resetFavoritesBtnSelector);
    expect(resetFavoritesBtn.exists()).toBe(true);
    expect(resetFavoritesBtn.attributes().disabled).toBeTruthy();
  });
});
