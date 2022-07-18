import ResetBeerModalFiltersBtn from '@/components/Buttons/ResetBeerModalFiltersBtn';
import store from '@/store';
import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';

describe('Pruebas en ResetBeerModalFiltersBtn.vue', function () {
  let vuetify;
  const localVue = createLocalVue();

  const mountFunction = options => {
    return mount(ResetBeerModalFiltersBtn, {
      localVue,
      vuetify,
      store,
      ...options,
    });
  };

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const resetModalFiltersBtnSelector = '[data-test-id="reset-modal-filters-btn"]';

  it('Debe hacer match con el snapshot', () => {
    const wrapper = mountFunction();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('El botón de reseteo debe llamar al dispatch resetFiltersInFilterModal cuando se hace click', async () => {
    store.dispatch = jest.fn();
    const wrapper = mountFunction();
    const resetModalFiltersBtn = wrapper.find(resetModalFiltersBtnSelector);
    expect(resetModalFiltersBtn.exists()).toBe(true);
    await resetModalFiltersBtn.trigger('click');
    expect(store.dispatch).toHaveBeenCalledWith('filter/resetFiltersInFilterModal');
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
