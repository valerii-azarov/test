export interface PersonalInfo {
  id: number;
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
  email: string;
}

export interface AccountInfo {
  username: string;
  password: string;
  confirmPassword?: string;
}

export interface EmploymentDetails {
  status_id?: number;
  role_id?: number;
  position_id: number;
  region?: string;
  region_id?: number;
  city?: string;
  city_id?: number;
  office?: string;
  office_id?: number;
}

export interface Employee extends PersonalInfo, AccountInfo, EmploymentDetails {};
