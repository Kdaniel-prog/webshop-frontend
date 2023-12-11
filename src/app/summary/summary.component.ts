import { Component } from '@angular/core';
import { APIService } from '../services/api.service';
import { UserStorageService } from '../services/user-storage.service';
import User from '../classes/User';
import { CommonModule } from '@angular/common';
import CartItems from '../classes/CartItems';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {
  user!: User;
  cartItems: CartItems[] = [];
  total = 0;
  constructor(
    private apiService: APIService, 
    private userStorageService: UserStorageService,
    private sharedService: SharedService
  ) {}

  ngOnInit():void {
    this.getUserInformation();
    this.getCartItems();
  }

  getUserInformation(){
    this.apiService.getUserInformation(this.userStorageService.getUserId()).subscribe(
      (response) =>{ 
        this.user = response;
        console.log(this.user);
      },
      (error) => {
        console.error('Error: ', error);
      }
    )
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
  handleOrder(){
    this.apiService.saveOrdered(this.user.id).subscribe(
      (response) => {
        console.log('ordered successfully');
        this.triggerRefreshCart();
        this. getCartItems();
      },
      (error) => {
        console.log('error '+error);
      }
    )
  }
  triggerRefreshCart() {
    this.sharedService.triggerRefresh();
  }

}
