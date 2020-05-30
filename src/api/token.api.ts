import { AUTH_LS_KEY } from 'auth/auth.state';
import { securedLS } from 'helper/local-storage-helper';

export class Token {
  private static accessToken: string = '';

  static getAccessToken(): string {
    return this.accessToken;
  }

  static setAccessToken(token: string): void {
    this.accessToken = token;
  }

  static refreshAccessToken(token: string): void {
    this.setAccessToken(token);
    const { data } = securedLS.get(AUTH_LS_KEY);
    securedLS.set(AUTH_LS_KEY, { ...data, token });
  }

  static deleteAccessToken(): void {
    this.accessToken = '';
  }
}
