import { Days } from '../entities/Days';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  days: Days[];
  createdAt: string;
  updatedAt: string;
}

export interface CheckUserNameTaken {
  username: string;
}

export interface Register {
  username: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface ChoiseDay {
  dayId: number;
}
