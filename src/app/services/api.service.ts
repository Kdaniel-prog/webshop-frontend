import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import Order from '../classes/Order';
import CartItem from '../classes/Cart';

const BACKEND_PREFIX = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class APIService {

  constructor(private http: HttpClient) { }

  getUserIdFromUsername(username: string): Observable<any> {
    return this.http.get(BACKEND_PREFIX + 'user/userid/' + username, httpOptions);
  }

  getCart(userId:number): Observable<any> {
    return this.http.get(BACKEND_PREFIX + 'cart/'+userId, httpOptions);
  }
  
  getProducts(page:number, size:number): Observable<any> {
    return this.http.get(BACKEND_PREFIX + 'product'+'?page='+page+'&size='+size+'&sort=category', httpOptions);
  }

  getCountedProduct(cartId: number): Observable<any> {
    return this.http.get(BACKEND_PREFIX+'cart_item/size/'+cartId,httpOptions);
  }

  addOrRemoveProduct(cartItem: CartItem): Observable<any>{
    return this.http.post(BACKEND_PREFIX + 'cart_item', cartItem, httpOptions);
  }

  getUserInformation(userId: number): Observable<any>{
    return this.http.get(BACKEND_PREFIX + 'user/'+userId, httpOptions);
  }

  saveUserEdit(form: any): Observable<any>{
    return this.http.put(BACKEND_PREFIX + 'user',form, httpOptions);
  }

  getCartItems(cartId: number): Observable<any>{
    return this.http.get(BACKEND_PREFIX + 'cart_item/'+cartId,httpOptions);
  }

  saveOrdered(user_id:number): Observable<any>{
    return this.http.get(BACKEND_PREFIX + 'cart/ordered/'+user_id,httpOptions);
  }



}