import SearchQuery from '@/components/BeerFilters/SearchQuery';
import store from '@/store';
import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';

describe('Pruebas en el componente SearchQuery.vue', function () {
  let vuetify;
  const localVue = createLocalVue();

  const mountFunction = () => {
    return mount(SearchQuery, {
      localVue,
      vuetify,
      store,
    });
  };

  beforeEach(() => {
    vuetify = new Vuetify();
    store.dispatch = jest.fn();
  });

  const newSearchQuery = 'cervecita';
  const textInputSelector = '#search-query-input';

  it('Debe hacer match con el snapshot', function () {
    const wrapper = mountFunction();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Debe llamar al dispatch setSearchQueryInStore y al dispatch resetPage cuando se escribe en el input', async function () {
    const wrapper = mountFunction();
    const inputElement = wrapper.find(textInputSelector);
    await inputElement.setValue(newSearchQuery);
    expect(store.dispatch).toHaveBeenCalledWith('filter/setSearchQuery', newSearchQuery);
    expect(store.dispatch).toHaveBeenCalledWith('filter/resetPage');
    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });
});
