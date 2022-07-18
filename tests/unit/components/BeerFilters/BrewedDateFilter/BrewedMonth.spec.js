import BrewedMonth from '@/components/BeerFilters/BrewedDateFilter/BrewedMonth';
import store from '@/store';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

describe('Pruebas en el componente BrewedMonth.vue', function () {
  let vuetify;
  const localVue = createLocalVue();

  const minBrewedMonthProps = {
    brewedMonth: '02-2014',
    inputLabel: 'Mes de elaboración de la cerveza',
    brewedMaxMonth: '10-2014',
  };

  const mountFunction = options => {
    return shallowMount(BrewedMonth, {
      localVue,
      vuetify,
      store,
      propsData: minBrewedMonthProps,
      ...options,
    });
  };

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const resetButtonSelector = '[data-test-id="reset-brewed-month-btn"]';
  const monthPickerSelector = '[data-test-id="brewed-month-date-picker"]';
  const closeModalButtonSelector = '[data-test-id="close-date-picker-button"]';
  const brewedMonthTextField = '[data-test-id="brewed-month-text-field"]';

  it('Debe hacer match con el snapshot', function () {
    const wrapper = mountFunction();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('El botón de limpiar debe emitir el evento setBrewedMonthInStore con un string vacío y llamar al dispatch resetPage cuando se hace click', async function () {
    store.dispatch = jest.fn();
    const wrapper = mountFunction();
    const resetButton = wrapper.find(resetButtonSelector);
    expect(resetButton.exists()).toBeTruthy();
    resetButton.vm.$emit('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('setBrewedMonthInStore').length).toBe(1);
    expect(wrapper.emitted('setBrewedMonthInStore')[0][0]).toBe('');
    expect(store.dispatch).toHaveBeenCalledWith('filter/resetPage');
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('El datepicker debe emitir el evento setBrewedMonthInStore con el nuevo mes y llamar al dispatch resetPage cuando se hace click', async function () {
    store.dispatch = jest.fn();
    const wrapper = mountFunction();
    const monthPicker = wrapper.find(monthPickerSelector);
    expect(monthPicker.exists()).toBeTruthy();
    monthPicker.vm.$emit('input', '02-2014');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('setBrewedMonthInStore').length).toBe(1);
    expect(wrapper.emitted('setBrewedMonthInStore')[0][0]).toBe('02-2014');
    expect(store.dispatch).toHaveBeenCalledWith('filter/resetPage');
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('El botón de OK debe cerrar el datepicker cuando se hace click, la propiedad isModalOpen debe ser false', async function () {
    const wrapper = mountFunction({ data: () => ({ isModalOpen: true }) });
    expect(wrapper.vm.isModalOpen).toBeTruthy();
    const closeModalButton = wrapper.find(closeModalButtonSelector);
    expect(closeModalButton.exists()).toBeTruthy();
    closeModalButton.vm.$emit('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isModalOpen).toBeFalsy();
  });
});
