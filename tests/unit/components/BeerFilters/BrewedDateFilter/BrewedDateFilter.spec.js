import BrewedDateFilter from '@/components/BeerFilters/BrewedDateFilter';
import store from '@/store';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

describe('Pruebas en el componente BrewedDateFilter/index.vue', function () {
  let vuetify;
  const localVue = createLocalVue();

  const mountFunction = options => {
    return shallowMount(BrewedDateFilter, {
      localVue,
      vuetify,
      store,
      ...options,
    });
  };

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const resetBrewedDateBtnSelector = '[data-test-id="reset-brewed-date-btn"]';
  const infoMessageSelector = '[data-test-id="info-message"]';

  it('Debe hacer match con el snapshot', function () {
    const wrapper = mountFunction();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('El botón de reseteo de fechas debe emitir el dispatch resetBrewedDate y el dispatch resetPage cuando se hace click', async function () {
    store.dispatch = jest.fn();
    const wrapper = mountFunction();
    const resetBrewedDateBtn = wrapper.find(resetBrewedDateBtnSelector);
    expect(resetBrewedDateBtn.exists()).toBeTruthy();
    await resetBrewedDateBtn.trigger('click');
    expect(store.dispatch).toHaveBeenCalledWith('filter/resetBrewedDate');
    expect(store.dispatch).toHaveBeenCalledWith('filter/resetPage');
    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });

  it('El mensaje de información debe decir `Se mostrarán cervezas elaboradas hasta la fecha actual` cuando initialBrewedMonth y finalBrewedMonth no tengan un valor', function () {
    const wrapper = mountFunction({
      computed: {
        initialBrewedMonth: () => '',
        finalBrewedMonth: () => '',
      },
    });
    const infoMessage = wrapper.find(infoMessageSelector);
    expect(infoMessage.exists()).toBeTruthy();
    expect(infoMessage.text()).toBe('Se mostrarán cervezas elaboradas hasta la fecha actual');
  });

  it('El mensaje de información debe decir `Se mostrarán cervezas elaboradas entre ${initialBrewedMonth} y ${finalBrewedMonth}` cuando initialBrewedMonth y finalBrewedMonth tengan un valor y sean diferentes', function () {
    const wrapper = mountFunction({
      computed: {
        initialBrewedMonth: () => '02-2014',
        finalBrewedMonth: () => '02-2015',
      },
    });
    const infoMessage = wrapper.find(infoMessageSelector);
    expect(infoMessage.exists()).toBeTruthy();
    expect(infoMessage.text()).toBe('Se mostrarán cervezas elaboradas entre 02-2014 y 02-2015');
  });

  it('El mensaje de información debe decir `Se mostrarán cervezas elaboradas en ${initialBrewedMonth}` cuando initialBrewedMonth y finalBrewedMonth tengan un valor y sean iguales', function () {
    const wrapper = mountFunction({
      computed: {
        initialBrewedMonth: () => '02-2014',
        finalBrewedMonth: () => '02-2014',
      },
    });
    const infoMessage = wrapper.find(infoMessageSelector);
    expect(infoMessage.exists()).toBeTruthy();
    expect(infoMessage.text()).toBe('Se mostrarán cervezas elaboradas en 02-2014');
  });

  it('El mensaje de información debe decir `Se mostrarán cervezas elaboradas después de ${initialBrewedMonth}` cuando initialBrewedMonth tenga un valor y finalBrewedMonth no tenga un valor', function () {
    const wrapper = mountFunction({
      computed: {
        initialBrewedMonth: () => '02-2014',
        finalBrewedMonth: () => '',
      },
    });
    const infoMessage = wrapper.find(infoMessageSelector);
    expect(infoMessage.exists()).toBeTruthy();
    expect(infoMessage.text()).toBe('Se mostrarán cervezas elaboradas después de 02-2014');
  });

  it('El mensaje de información debe decir `Se mostrarán cervezas elaboradas antes de ${finalBrewedMonth}` cuando initialBrewedMonth no tenga un valor y finalBrewedMonth tenga un valor', function () {
    const wrapper = mountFunction({
      computed: {
        initialBrewedMonth: () => '',
        finalBrewedMonth: () => '02-2014',
      },
    });
    const infoMessage = wrapper.find(infoMessageSelector);
    expect(infoMessage.exists()).toBeTruthy();
    expect(infoMessage.text()).toBe('Se mostrarán cervezas elaboradas antes de 02-2014');
  });
});
