import AddBeerToFavsBtn from '@/components/Buttons/AddBeerToFavsBtn';
import store from '@/store';
import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import { beersMock } from '../../mocks/beersMock';

describe('Pruebas en AddBeerToFavsBtn.vue', function () {
  let vuetify;
  const localVue = createLocalVue();

  const beer = beersMock[0];
  const mountFunction = options => {
    return mount(AddBeerToFavsBtn, {
      localVue,
      vuetify,
      store,
      propsData: { beer },
      ...options,
    });
  };

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const heartIconBtnSelector = '[data-test-id="heart-icon-button"]';
  const heartIconSelector = '[data-test-id="heart-icon"]';

  it('Debe hacer match con el snapshot', () => {
    const wrapper = mountFunction();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('El botón debe tener el icono de corazón debe tener la clase `fa-heart-circle-plus` cuando la cerveza no está en favoritos', () => {
    const wrapper = mountFunction();
    const heartIconElement = wrapper.find(heartIconSelector);
    expect(heartIconElement.exists()).toBe(true);
    expect(heartIconElement.classes('fa-heart-circle-plus')).toBe(true);
  });

  it('El botón debe tener el icono de corazón debe tener la clase `fa-heart-circle-check` cuando la cerveza está en favoritos', async () => {
    const wrapper = mountFunction();
    const heartIconElement = wrapper.find(heartIconSelector);
    expect(heartIconElement.exists()).toBe(true);
    const heartIconBtn = wrapper.find(heartIconBtnSelector);
    expect(heartIconBtn.exists()).toBe(true);
    await heartIconBtn.trigger('click');
    expect(heartIconElement.classes('fa-heart-circle-check')).toBe(true);
  });

  it('El botón con el ícono de corazón para añadir o remover la cerveza a favoritos debe llamar al dispatch handleBeerInFavorites con la cerveza', async () => {
    store.dispatch = jest.fn();
    const wrapper = mountFunction();
    const heartIconBtn = wrapper.find(heartIconBtnSelector);
    expect(heartIconBtn.exists()).toBe(true);
    await heartIconBtn.trigger('click');
    expect(store.dispatch).toHaveBeenCalledWith('favoriteBeers/handleBeerInFavorites', beer);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
