import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { APIService } from '../../services/api.service';
import { UserStorageService } from '../../services/user-storage.service';
import { FormsModule } from '@angular/forms';
import CartItem from '../../classes/Cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'c-product-item',
  standalone: true,
  imports: [MatIconModule, FormsModule, CommonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  constructor(
    private apiService: APIService, 
    private userStorageService: UserStorageService) {}

  @Input() id = '';
  @Input() name = '';
  @Input() quantity = ''; 
  @Input() category = ''
  @Input() price = '';
  @Output() refreshData = new EventEmitter<string>();

  refreshDataEvent() {
    this.refreshData.emit();
  }

  wantedQuantity = 0;

  saveProduct(){
    if(this.wantedQuantity && this.wantedQuantity <= Number(this.quantity)){
      const cartItem: CartItem = {
        productId: Number(this.id),        
        quantity: this.wantedQuantity,            
        cartId: this.userStorageService.getCartId(),           
        isIncrease: true,
        productName: this.name,
        category: this.category,
        price: Number(this.price),
        fullPrice: Number(this.price) * this.wantedQuantity 
      };
      this.apiService.addOrRemoveProduct(cartItem).subscribe(
        (response) =>{ 
          console.log(response)
          this.refreshDataEvent();
        },
        (error) => {
          console.error('Error: ', error.error);
        }
      )
    }
  }

  handleChange(event: Event){
    const inputElement = event.target as HTMLInputElement;
    this.wantedQuantity = Number(inputElement.value);
  }
  
}
