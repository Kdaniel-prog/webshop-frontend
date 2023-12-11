import { Component } from '@angular/core';
import { APIService } from '../services/api.service';
import { UserStorageService } from '../services/user-storage.service';
import { CommonModule } from '@angular/common';
import Cart from '../classes/Cart';
import CartItems from '../classes/CartItems';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../services/shared.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule,  RouterLink, RouterLinkActive],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})

export class ShoppingCartComponent {
  total = 0;
  cartItems: CartItems[] = [];

  constructor(private apiService: APIService, private userStorageService: UserStorageService, private sharedService: SharedService) {}
  
  ngOnInit():void{
    this.getCartItems();
  }

  getCartItems(){
    this.apiService.getCartItems(this.userStorageService.getCartId()).subscribe(
      (response) =>{ 
        console.log(response)
        this.cartItems = response;
        if(this.cartItems){
          this.total = this.cartItems[0]?.cartId?.total ? this.cartItems[0].cartId.total : 0 ;
        }
      },
      (error) => {
        console.error('Error: ', error.error);
      }
    )
  }

  removeXproduct(q: number, product: string, category: string, price: number){
    const cartItem: Cart = {
      productId: 0,        
      quantity: q,            
      cartId: this.userStorageService.getCartId(),           
      isIncrease: false,
      productName: product,
      category: category,
      price: price,
      fullPrice: price * q    
    };
    this.apiService.addOrRemoveProduct(cartItem).subscribe(
      (response) =>{ 
        console.log(response)
        this.getCartItems();
        this.triggerRefreshCart();
      },
      (error) => {
        console.error('Error: ', error.error);
      }
    )
  }

  deleteProduct(q: number, product: string, category: string, price: number) {
    const cartItem: Cart = {
      productId: 0,        
      quantity: q,            
      cartId: this.userStorageService.getCartId(),
      isIncrease: false,
      productName: product,
      category: category,
      price: price,
      fullPrice: price * q      
    };
    this.apiService.addOrRemoveProduct(cartItem).subscribe(
      (response) =>{ 
        console.log(response)
        this.getCartItems();
        this.triggerRefreshCart();
      },
      (error) => {
        console.error('Error: ', error);
      }
    )
  }

  triggerRefreshCart() {
    this.sharedService.triggerRefresh();
  }
}
