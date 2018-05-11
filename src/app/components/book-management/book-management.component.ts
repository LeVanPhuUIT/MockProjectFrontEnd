import { Component, OnInit, NgModule } from '@angular/core';
import { products } from '../../model/products';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Router } from '@angular/router';
import { Books } from '../../model/books';
import { BookService } from '../../services/book.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.scss'],
  providers: [BookService]
})



export class BookManagementComponent implements OnInit {
  // public gridData: any[] = products;
  public gridData: Books[];
  public gridView: GridDataResult;
  public pageSize = 10;
  public skip = 0;
  private data: Object[];
  private subscription: Subscription;

  constructor(public urlRouter: Router, private bookService: BookService) {
    this.loadItems();
  }
  ngOnInit() {

  }
  onButtonClick() {
    console.log('click');
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  private loadItems(): void {

    this.bookService.getAddBook()
      .then(x => {
      this.gridData = x;
        this.gridView = {
          data: this.gridData.slice(this.skip, this.skip + this.pageSize),
          total: this.gridData.length
        };
      });


  }
  private addBook() {
    this.urlRouter.navigateByUrl('/add-book');
  }


}
