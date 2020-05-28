export interface User {
  name: string | null;
  photo: string | null;
  email: string | null;
}

export interface AuthState {
  user: User;
  token: string;
  provider: string;
  roles: string[];
  isSigningIn: boolean;
  isAuthenticated: boolean;
  setCurrentAuth: (currentAuth: AuthState) => void;
}

export interface Action {
  payload?: any;
  type: string;
}
