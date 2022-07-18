import AbvRangeFilter from '@/components/BeerFilters/AbvRangeFilter';
import store from '@/store';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

describe('Pruebas en el componente AbvRangeFilter.vue', function () {
  let vuetify;
  const localVue = createLocalVue();

  const mountFunction = options => {
    return shallowMount(AbvRangeFilter, {
      localVue,
      vuetify,
      store,
      ...options,
    });
  };

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const resetButtonSelector = '#reset-abv-range-btn';
  const abvRangeSlideSelector = '[data-test-id="abv-range-slider"]';
  const abvInfoMessageSelector = '[data-test-id="abv-info-message"]';

  const abvInfoMessage = (minAbvValue, maxAbvValue) =>
    `Se mostrarán cervezas con % de alcohol entre el ${minAbvValue}% y el ${maxAbvValue}%`;

  it('Debe hacer match con el snapshot', function () {
    const wrapper = mountFunction();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('El botón de reseteo debe llamar al dispatch resetAbvRange cuando se hace click', async function () {
    store.dispatch = jest.fn();
    const wrapper = mountFunction();
    const resetButton = wrapper.find(resetButtonSelector);
    await resetButton.trigger('click');
    expect(store.dispatch).toHaveBeenCalledWith('filter/resetAbvRange');
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('Debe llamar al dispatch resetPage, setMinAbvValue y setMaxAbvValue cuando se hace un cambio en los rangos de abv', async function () {
    const newMinAbvValue = 5;
    const newMaxAbvValue = 10;
    store.dispatch = jest.fn();
    const wrapper = mountFunction();
    const abvRangeSlide = wrapper.find(abvRangeSlideSelector);
    expect(abvRangeSlide.exists()).toBe(true);
    abvRangeSlide.vm.$emit('change', [newMinAbvValue, newMaxAbvValue]);
    await wrapper.vm.$nextTick();
    expect(store.dispatch).toHaveBeenCalledWith('filter/resetPage');
    expect(store.dispatch).toHaveBeenCalledWith('filter/setMinAbvValue', newMinAbvValue);
    expect(store.dispatch).toHaveBeenCalledWith('filter/setMaxAbvValue', newMaxAbvValue);
    expect(store.dispatch).toHaveBeenCalledTimes(3);
  });

  it('El abv info message debe mostrar el mensaje correcto con los valores de abv predeterminados (2 y 60)', function () {
    const wrapper = mountFunction();
    const abvInfoMessageElement = wrapper.find(abvInfoMessageSelector);
    const { minAbvValue, maxAbvValue } = wrapper.vm;
    expect(abvInfoMessageElement.text()).toBe(abvInfoMessage(minAbvValue, maxAbvValue));
  });

  it('El abv info message debe mostrar el mensaje correcto con los valores de abv modificados', function () {
    const minAbvValue = 5;
    const maxAbvValue = 10;
    const wrapper = mountFunction({
      computed: {
        minAbvValue() {
          return minAbvValue;
        },
        maxAbvValue() {
          return maxAbvValue;
        },
      },
    });
    const abvInfoMessageElement = wrapper.find(abvInfoMessageSelector);
    expect(abvInfoMessageElement.text()).toBe(abvInfoMessage(minAbvValue, maxAbvValue));
  });
});
