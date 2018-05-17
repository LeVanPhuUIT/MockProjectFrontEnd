import { Component, OnInit, NgModule } from '@angular/core';
import { products } from '../../model/products';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Router } from '@angular/router';
import { Books } from '../../model/books';
import { BookService } from '../../services/book.service';
import { Subscription } from 'rxjs/Subscription';
import { ShareService } from '../../services/share.service';

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

  constructor(public urlRouter: Router, private bookService: BookService, private shareService: ShareService) {
  }
  ngOnInit() {
    this.loadItems();
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
      console.log(x);
    });
  console.log('load data');

  }
  private addBook() {
    this.urlRouter.navigateByUrl('/add-book');
  }

  private async removeBook(bookId: number) {
    this.bookService.removeItem(bookId);
    this.loadItems();
  }

  /// book management
  private sendToEditBook(dataItem) {
    this.shareService.bookEdit = dataItem;
    //this.bookService.bookEdit = dataItem as Books;
    //console.log(this.bookService.bookEdit);
    this.urlRouter.navigateByUrl('/edit-book');
  }

}
