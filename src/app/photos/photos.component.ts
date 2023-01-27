import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';
import { Observable, fromEvent, debounceTime } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Catalog, catalogAttributesMapping } from '../models/catalog.model';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { DetailsDialogComponent } from './details-dialog/details-dialog.component';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;
  search = "";
  loaded = false;
  catalog: Catalog[] = [];
  filteredCatalog: Catalog[] = [];
  catalog$: Observable<Catalog[]> | undefined;
  length = 500;
  pageSize = 10;
  pageIndex = 0;
  startIndex = 0;
  endIndex = 10;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  constructor(private googleSheetsDbService: GoogleSheetsDbService, private sanitizer: DomSanitizer, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.catalog$ = this.googleSheetsDbService.get<Catalog>(
      environment.catalog.spreadsheetId, environment.catalog.worksheetName, catalogAttributesMapping);
    this.catalog$.subscribe(
      value => {
        this.catalog = value.map(
          element => {
            const photoId = element.photo.toString().substring(element.photo.toString().indexOf("id=") + 3);
            element.photo = this.sanitizer.bypassSecurityTrustResourceUrl("https://drive.google.com/file/d/" + photoId + "/preview");
            return element;
          }); 
          this.filteredCatalog = [...this.catalog];
          this.loaded = true;
      }
    );
  }

  ngAfterViewInit() {
    fromEvent<InputEvent>(this.searchInput.nativeElement, 'input')
      .pipe(debounceTime(1000))
      .subscribe(res => {
        const inputValue = (res.target as HTMLInputElement).value;
        if(inputValue.trim() !==""){
          this.filteredCatalog = this.catalog?.filter(photo => photo.name.includes(inputValue) ||  photo.place.includes(inputValue) ||  photo.materials.includes(inputValue));
        } else {
          if(this.catalog){
            this.filteredCatalog = [...this.catalog] ;
          }
        }
        this.pageIndex = 0;
        this.calculateStartAndEndIndex();
      }
      );
  }

  openDetailsDialog(catalog: Catalog) {
    this.dialog.open(DetailsDialogComponent,
      {
        data: catalog,
        height: '700px',
        width: '100vw',
      });
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.calculateStartAndEndIndex();
  }

  calculateStartAndEndIndex(){
    this.startIndex = this.pageIndex*this.pageSize;
    this.endIndex = this.filteredCatalog.length > this.pageSize*(this.pageIndex+1) ? this.pageSize*(this.pageIndex+1) : this.filteredCatalog.length;
  }
}
