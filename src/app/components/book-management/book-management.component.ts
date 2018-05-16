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
  public gridData: Books[];
  public gridView: GridDataResult;
  public pageSize = 10;
  public currentPage = 1;
  public searchString = '';
  public skip = 0;
  private data: Object[];

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

    this.bookService.getPagingBook(this.currentPage, this.pageSize, this.searchString)
    .then(x => {
      this.gridView = {
        data: x['book'],
        total: x['total'],
      };
      console.log(x['book']);
    });
  console.log('load data');

  }
  private addBook() {
    this.urlRouter.navigateByUrl('/add-book');
  }


}
