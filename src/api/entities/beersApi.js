import { ReadOnlyApiService } from '@/api/methods/readOnlyApi';

export class BeersApiService extends ReadOnlyApiService {
  constructor() {
    super('beers');
  }
}
