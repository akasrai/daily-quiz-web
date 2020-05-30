export interface User {
  name: string | null;
  photo: string | null;
  email: string | null;
}

export interface AuthState {
  user: User;
  token: string;
  roles: string[];
  isSigningIn: boolean;
  isAuthenticated: boolean;
  setCurrentUser: (currentUser: User) => void;
  setCurrentAuth: (currentAuth: AuthState) => void;
}

export interface Action {
  payload?: any;
  type: string;
}

export interface Credentials {
  email: string;
  password: string;
}
