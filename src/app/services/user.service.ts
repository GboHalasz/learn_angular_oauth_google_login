import {Injectable} from '@angular/core';

export interface User {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: User | null = null;
  private readonly storageKey = 'user';

  constructor() {
    const stored = sessionStorage.getItem(this.storageKey);
    if (stored) {
      this._user = JSON.parse(stored);
    }
  }

  get user(): User | null {
    return this._user;
  }

  set user(user: User | null) {
    this._user = user;
    if (user) {
      sessionStorage.setItem(this.storageKey, JSON.stringify(user));
    } else {
      sessionStorage.removeItem(this.storageKey);
    }
  }

  clearUser() {
    this.user = null;
  }

  isLoggedIn(): boolean {
    return !!this._user;
  }
}
