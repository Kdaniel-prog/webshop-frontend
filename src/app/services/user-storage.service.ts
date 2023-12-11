import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';
const CART_ID = 'auth-cart';

@Injectable({
  providedIn: 'root'
})

export class UserStorageService {

  constructor() { }

  public saveUserid(id: number): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, String(id));
  }

  public getUserId(): number {
    return Number(window.sessionStorage.getItem(USER_KEY));
  }

  public saveCartid(id: number): void {
    window.sessionStorage.removeItem(CART_ID);
    window.sessionStorage.setItem(CART_ID, String(id));
  }

  public getCartId(): number {
    return Number(window.sessionStorage.getItem(CART_ID));
  }

}
