export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  isProfileComplete?: boolean;
  password?: string;
  address?: string;
  dateOfBirth?: string;
}