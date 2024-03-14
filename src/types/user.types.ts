import { Common } from ".";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  email: string;
  password: string;
  phone: string;
};

export interface UserInitialState extends Common {
  userData: User | null;
}
