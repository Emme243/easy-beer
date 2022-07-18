import ResetAllBeerFiltersBtn from '@/components/Buttons/ResetAllBeerFiltersBtn';
import store from '@/store';
import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import { beersMock } from '../../mocks/beersMock';

describe('Pruebas en ResetAllBeerFiltersBtn.vue', function () {
  let vuetify;
  const localVue = createLocalVue();

  const beer = beersMock[0];
  const mountFunction = options => {
    return mount(ResetAllBeerFiltersBtn, {
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

  const resetAllFiltersBtnSelector = '[data-test-id="reset-all-filters-button"]';

  it('Debe hacer match con el snapshot', () => {
    const wrapper = mountFunction();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('El botón de reseteo debe llamar al dispatch resetAllFilters cuando se hace click y la propiedad isAlertShown debe ser true', async () => {
    store.dispatch = jest.fn();
    const wrapper = mountFunction();
    const resetAllFiltersBtn = wrapper.find(resetAllFiltersBtnSelector);
    expect(resetAllFiltersBtn.exists()).toBe(true);
    resetAllFiltersBtn.vm.$emit('click');
    await wrapper.vm.$nextTick();
    expect(store.dispatch).toHaveBeenCalledWith('filter/resetAllFilters');
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.isAlertShown).toBe(true);
  });
});
