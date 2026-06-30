export interface LoginData {
    username: string;
    password: string;
}

export interface RegisterData extends LoginData {
    name: string;
}

export interface User {
   id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
    user: User | null;
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
}