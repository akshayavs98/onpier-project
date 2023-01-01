import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewCarComponent } from './components/add-new-car/add-new-car.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileNewComponent } from './components/profile-new/profile-new.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch: 'full' },
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent,canActivate: [AuthGuard] },
  {path: 'add-new-car', component: AddNewCarComponent },
  {path: 'new-profile', component: ProfileNewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
