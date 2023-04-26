import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../dashboard/dashboard.component";
import {LoginComponent} from "../login/login.component";
import {StoreComponent} from "../store/store.component";
import {AdminComponent} from "../admin/admin.component";
import {AuthGuard} from "../../guards/auth.guard";
import {RoleGuard} from "../../guards/role.guard";
import {ProductsComponent} from "../admin/products/products.component";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'store', component: StoreComponent },
  { path: 'store/:id', component: StoreComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard,RoleGuard], data: {expectedRole: 'admin'}},
  { path: 'admin/products', component: ProductsComponent, canActivate: [AuthGuard,RoleGuard], data: {expectedRole: 'admin'}},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
