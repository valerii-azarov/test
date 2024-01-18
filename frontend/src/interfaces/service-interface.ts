interface BaseService {
  id: number;
  name: string;
}

export interface Service extends BaseService {
  category_id?: number;
}
