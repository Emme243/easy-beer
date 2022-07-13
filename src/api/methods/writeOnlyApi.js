import { BaseApiService } from '@/api/base/baseApi';

// NOTA: Esta clase implementa solamente los métodos para modificar la información
// de cualquier entidad en una API
class WriteOnlyApiService extends BaseApiService {
  constructor(entity) {
    super(entity);
  }

  async post(data = {}) {
    return await this.execute(async () => {
      const response = await fetch(this.getUrl(), {
        method: 'POST',
        body: JSON.stringify(data),
      });
      const { id } = await response.json();
      return id;
    });
  }

  async put(id, data = {}) {
    return await this.execute(async () => {
      if (!id) throw Error('Id is not provided');
      const response = await fetch(this.getUrl(id), {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      const { id: responseId } = await response.json();
      return responseId;
    });
  }

  async delete(id) {
    return await this.execute(async () => {
      if (!id) throw Error('Id is not provided');
      await fetch(this.getUrl(id), {
        method: 'DELETE',
      });
      return true;
    });
  }
}
