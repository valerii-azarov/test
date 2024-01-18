export interface Record {
  id: number | null;
  date: string;
  time: string;
  availability: boolean;
}

export interface Schedule {
  [date: string]: Record[];
}
