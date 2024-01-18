export interface ClientInfo {
  booking_id: number;
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
}

export interface BookingDetails {
  record_id?: number | null;
  date?: string;
  time?: string;
  category_id: number;
  category?: string;
  service_id: number;
  service?: string;
  service_type_id: number;
  service_type?: string;
  status_id?: number;
  region_id?: number;
  city_id?: number;
  office_id: number;
}

export interface Booking extends ClientInfo, BookingDetails {}
