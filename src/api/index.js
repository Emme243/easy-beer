import { BeersApiService } from '@/api/entities/beersApi';

export const $api = {
  beers: new BeersApiService(),
};
