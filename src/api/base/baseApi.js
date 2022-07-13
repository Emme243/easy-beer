// NOTE: Esta clase sirve tener la información base que será utilizada para
// acceder a todos los servicios de Punk API
export class BaseApiService {
  baseUrl = 'https://api.punkapi.com/v2';
  entity;

  constructor(entity) {
    if (this.constructor === BaseApiService)
      throw new TypeError('Can not construct abstract class.');

    if (!entity) throw new Error('Entity is not provided');
    this.entity = entity;
  }

  getUrl(id = '') {
    return `${this.baseUrl}/${this.entity}/${id}`;
  }

  async execute(callback) {
    try {
      return await callback();
    } catch (error) {
      console.error({ error });
      throw new Error('Something went wrong - ' + error.message);
    }
  }
}
