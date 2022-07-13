import { BaseApiService } from '@/api/base/baseApi';

// NOTE: Esta clase implementa solamente los métodos getters
// para cualquier entidad en una API
export class ReadOnlyApiService extends BaseApiService {
  constructor(entity) {
    super(entity);
  }

  getQueryParams(params) {
    return Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&');
  }

  async getAll(params = {}) {
    return await this.execute(async () => {
      const response = await fetch(this.getUrl() + this.getQueryParams(params), {});
      return await response.json();
    });
  }

  async getById(id) {
    return await this.execute(async () => {
      if (!id) throw Error('Id is not provided');
      const response = await fetch(this.getUrl(id));
      return await response.json();
    });
  }
}
