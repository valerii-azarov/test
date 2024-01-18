export interface ServiceInfo {
  id: number;
  service_id: number;
  service_name?: string;
  description: string;
  required_documents: string;
  regulatory_documents: string;
  delivery_time: string;
  price_id: number;
}
