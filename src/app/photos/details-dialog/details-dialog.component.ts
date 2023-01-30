import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Catalog } from 'src/app/models/catalog.model';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.scss']
})
export class DetailsDialogComponent implements OnInit{
  imageWidth = "720"
  imageHeight = "480";
  constructor(@Inject(MAT_DIALOG_DATA) public data: Catalog, private deviceService: DeviceDetectorService) {}

  ngOnInit(): void {
    if(this.deviceService.isMobile()){
      this.imageWidth = "300";
      this.imageHeight = "200";
    }
  }
}
