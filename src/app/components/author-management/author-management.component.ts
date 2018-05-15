import { Component, OnInit } from '@angular/core';
import { products} from '../../model/products';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Router } from '@angular/router';
import { Author } from '../../model/author';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-author-management',
  templateUrl: './author-management.component.html',
  styleUrls: ['./author-management.component.scss'],
  providers: [AuthorService]
})
export class AuthorManagementComponent implements OnInit {

  public gridData: any[] = products;
  public gridView: GridDataResult;
  public pageSize = 10;
  public currentPage = 1;
  public searchString = '';
  public skip = 0;
  private data: Object[];
  public newAuthor: Author;
  public oldAuthor: Author;
  public AuthorID: number;
  public AuthorName: string;
  public AuthorHistory: string;

  constructor(public urlRouter: Router, private authorService: AuthorService) {
    this.newAuthor = new Author();
  }

  ngOnInit() {
    this.loadItems();
  }
  onButtonClick() {
    console.log('click');
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.currentPage = this.skip / this.pageSize + 1;
    console.log(this.currentPage);
    this.loadItems();
  }

  private loadItems(): void {
    this.authorService.getPagingAuthor(this.currentPage, this.pageSize, this.searchString)
      .then(x => {
        this.gridView = {
          data: x['author'],
          total: x['total'],
        };
        console.log(x['author']);
      });
    console.log('load data');

  }
  private search() {
    this.loadItems();
  }

  toast(method: string) {
    const x = document.getElementById(method);
    x.className = 'show';
    setTimeout(function () { x.className = x.className.replace('show', ''); }, 3000);
  }

  private addAuthor() {
    this.authorService.addauthor(this.newAuthor)
      .then(data => {
        this.loadItems();
        // this.toast('snackbarAdd');
        this.newAuthor.AuthorName = '';
        this.newAuthor.History = '';
      });
  }

  private senderData(dataItem: Author) {
    console.log(dataItem.AuthorID);
    this.AuthorID = dataItem.AuthorID;
    this.AuthorName = dataItem.AuthorName;
    this.AuthorHistory = dataItem.History;
  }

  private updateAuthor(formEdit) {
    console.log(formEdit.value.AuthorID);
    this.oldAuthor = formEdit.value;
    this.authorService.updateAuthor(this.oldAuthor);
  }

  private async removeAuthor(AuthorID: number) {
    await this.authorService.removeItem(AuthorID);
    this.loadItems();
  }

}
