import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';
const CART_ID = 'auth-cart';

@Injectable({
  providedIn: 'root'
})

export class UserStorageService {

  constructor() { }

  cartId = 0;

  public saveUserid(id: number): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, String(id));
  }

  public getUserId(): number {
    return Number(window.localStorage.getItem(USER_KEY));
  }

  public saveCartid(id: number): void {
    window.localStorage.removeItem(CART_ID);
    window.localStorage.setItem(CART_ID, String(id));
    
  }

  public getCartId(): number {
    return Number(window.localStorage.getItem(CART_ID));
  }

}
