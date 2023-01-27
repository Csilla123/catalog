import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{ path: 'photos', loadChildren: () => import('./photos/photos.module').then(m => m.PhotosModule) },
/*{ path: 'login', component: LoginComponent },*/
{ path: '', redirectTo: '/photos', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
