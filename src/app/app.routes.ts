import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SummaryComponent } from './summary/summary.component';

export const routes: Routes = [
    { path: '', pathMatch: 'prefix', component: HomePageComponent},
    { path: 'user-managment', component: UserManagerComponent},
    { path: 'shopping-cart', component: ShoppingCartComponent},
    { path: 'summary', component: SummaryComponent}
];
