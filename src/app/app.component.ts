import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { UserStorageService } from './services/user-storage.service';
import { APIService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgbModule, NavbarComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  constructor(private userStorageService: UserStorageService, private apiService: APIService) {}

  ngOnInit(): void{
    this.apiService.getUserIdFromUsername('test').subscribe( 
      (response) => {
        this.userStorageService.saveUserid(response.userId);
      },
      (error) => {
        console.error('Error: ', error);
      }
    )

    this.apiService.getCart(this.userStorageService.getUserId()).subscribe(
      (response) => {
        this.userStorageService.saveCartid(response.id);
      },
      (error) => {
        console.error('Error: ', error);
      }
    )

  }
  refreshProducts(){
    console.log('hello world')
  }

 }
