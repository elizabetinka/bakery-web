import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthStateService {
  private currentUser: string | null = null;

  setAuth(auth: string | boolean | null | undefined): void {
    this.currentUser = auth === 'true' || auth === true ? 'Лиза' : null;
  }

  getUser(): string | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return Boolean(this.currentUser);
  }
}
