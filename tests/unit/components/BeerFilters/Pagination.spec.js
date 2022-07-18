import Pagination from '@/components/BeerFilters/Pagination';
import store from '@/store';
import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';

describe('Pruebas en el componentes Pagination.vue', function () {
  let vuetify;
  const localVue = createLocalVue();

  const mountFunction = () => {
    return mount(Pagination, {
      localVue,
      vuetify,
      store,
    });
  };

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('Debe hacer match con el snapshot', function () {
    const wrapper = mountFunction();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Debe contener 10 botones: 2 para flechas izq y der, y 8 para las páginas', function () {
    const wrapper = mountFunction();
    expect(wrapper.findAll('button').length).toBe(10);
  });

  it('Debe llamar al dispatch setPageInStore cuando se hace click en un botón', async function () {
    store.dispatch = jest.fn();
    const wrapper = mountFunction();
    const buttonElement = wrapper.findAll('button').at(5);
    await buttonElement.trigger('click');
    expect(store.dispatch).toHaveBeenCalledWith('filter/setPage', 5);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
