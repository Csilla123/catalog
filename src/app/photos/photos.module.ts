import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosComponent } from './photos.component';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon'; 
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { API_KEY, GoogleSheetsDbService } from 'ng-google-sheets-db';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { DetailsDialogComponent } from './details-dialog/details-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';




@NgModule({
  declarations: [
    PhotosComponent,
    DetailsDialogComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatCardModule,
    PhotosRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatPaginatorModule
  ]
  ,
  providers: [
    {
      provide: API_KEY,
      useValue: environment.googleSheetsApiKey,
    },
    GoogleSheetsDbService
  ]
})
export class PhotosModule { }
