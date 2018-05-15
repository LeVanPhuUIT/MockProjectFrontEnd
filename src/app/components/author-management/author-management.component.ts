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
  public currentPage =1;
  public searchString = "";
  public skip = 0;
  private data: Object[];
  public newAuthor: Author;

  constructor(public urlRouter:Router, private authorService: AuthorService) {
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
    this.currentPage = this.skip/this.pageSize +1;
    console.log(this.currentPage);
    this.loadItems();
  }

  private loadItems(): void {
    this.authorService.getPagingAuthor(this.currentPage, this.pageSize, this.searchString)
      .then(x => {
        this.gridView = {
          data: x["author"],
          total: x["total"],
        };
        console.log(x["author"]);
      });
    console.log('load data');

  }
  private search(){
    this.loadItems();
  }

}
