import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from '../components/product-item/product-item.component';
import { APIService } from '../services/api.service';
import { PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import Product from '../classes/Product';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductItemComponent, CommonModule, MatPaginatorModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private apiService: APIService, private sharedService: SharedService) {}

  products:Product[] = [];
  page: number = 0;
  size: number = 6;

  length: number = 0;
  pagesize: number = 6;
  totelElement: number = 0;
  totalPages: number = 0;

  ngOnInit():void {
    this.getProducts();
  }

  getProducts(){
    this.apiService.getProducts(this.page, this.size).subscribe(
      (response) =>{ 
        this.products = response.content;
        this.length = response.totalElements;
        this.totalPages = response.totalPages;
      },
      (error) => {
        console.error('Error: ', error);
      }
    )
  }
  refreshProducts(){
    this.getProducts();
    this.triggerRefresh();
  }

  triggerRefresh() {
    this.sharedService.triggerRefresh();
  }

  handlePageEvent(e: PageEvent) {
    this.page = e.pageIndex;
    this.getProducts();
  }
  
  
    
}
