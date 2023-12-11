import { Component } from '@angular/core';
import User from '../classes/User';
import { APIService } from '../services/api.service';
import { UserStorageService } from '../services/user-storage.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-manager',
  standalone: true,
  imports:[ReactiveFormsModule, CommonModule],
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.css'
})
export class UserManagerComponent {
  constructor(
    private apiService: APIService, 
    private userStorageService: UserStorageService, 
    private modalService: NgbModal, 
    private fb: FormBuilder
    ) {}

  user!: User;
  modalOptions: NgbModalOptions | undefined;

  editUserForm = new FormGroup({
    Firstname: new FormControl(),
    Lastname: new FormControl(),
    Username: new FormControl()
  });

  editBillingAddressForm = new FormGroup({
    Zipcode: new FormControl(),
    City: new FormControl(),
    Street: new FormControl(),
    HouseNumber: new FormControl(),
    Stairs: new FormControl(),
    Flat: new FormControl(),
    Door: new FormControl()
  });

  editDeliveryAddressForm = new FormGroup({
    Zipcode: new FormControl(),
    City: new FormControl(),
    Street: new FormControl(),
    HouseNumber: new FormControl(),
    Stairs: new FormControl(),
    Flat: new FormControl(),
    Door: new FormControl()
  });

  ngOnInit():void {
    this.getUserInformation();
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

  public open(content: any) {
    this.editUserForm.patchValue({
      Firstname: this.user.firstName,
      Lastname: this.user.lastName,
      Username: this.user.username
    })
    this.editBillingAddressForm.patchValue({
      Zipcode: this.user.billingAddress.zipCode,
      City: this.user.billingAddress.city,
      Street: this.user.billingAddress.street,
      HouseNumber: this.user.billingAddress.houseNumber,
      Stairs: this.user.billingAddress.stairs,
      Flat: this.user.billingAddress.flat,
      Door: this.user.billingAddress.door,

    })
    this.editDeliveryAddressForm.patchValue({
      Zipcode: this.user.deliveryAddress.zipCode,
      City: this.user.deliveryAddress.city,
      Street: this.user.deliveryAddress.street,
      HouseNumber: this.user.deliveryAddress.houseNumber,
      Stairs: this.user.deliveryAddress.stairs,
      Flat: this.user.deliveryAddress.flat,
      Door: this.user.deliveryAddress.door,

    })
    this.modalService.open(content, this.modalOptions);
  }

  onSubmit(){
    const mergedForm = {
      id: this.user.id,
      ...this.editUserForm.value,
      billingAddress: { ...this.editBillingAddressForm.value },
      deliveryAddress: { ...this.editDeliveryAddressForm.value }
    }
    this.apiService.saveUserEdit(mergedForm).subscribe(
      (response) =>{
        console.log('Update success');
        this.getUserInformation();
      },
      (error) => {
        console.error('Error: ', error);
      }
    )
    this.modalService.dismissAll();
    
  }

}
