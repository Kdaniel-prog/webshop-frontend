import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { UserStorageService } from '../services/user-storage.service';
import { APIService } from '../services/api.service';
import { SharedService } from '../services/shared.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private userStorageService: UserStorageService, private apiService: APIService, private sharedService: SharedService) {}
  cartCounter:number = 0;

  ngOnInit(): void{
    this.getCountedProduct();
    this.sharedService.refreshData$.subscribe(() => {
      this.getCountedProduct();
      console.log('refresh')
    });
  }
  
  getCountedProduct(){
    this.apiService.getCountedProduct(this.userStorageService.getCartId()).subscribe(
      (response) =>{
       this.cartCounter = response.count;
      },
      (error) => {
        console.error('Error: ', error.error);
      }
    )
  }


}
