import { Component, OnInit, NgModule } from '@angular/core';
import { products } from '../../model/products';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../model/category';
import { Observable } from 'rxjs/Observable';
import { SyncAsync } from '@angular/compiler/src/util';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.scss'],
  providers: [CategoryService]
})

export class ListBookComponent implements OnInit {
  public gridData: Category[];
  public gridView: GridDataResult;
  public pageSize = 10;
  public currentPage =1;
  public searchString = "";
  public skip = 0;
  private data: Object[];

  public categoryList: Observable<Category[]>;
  showEditor = true;
  myName: string;
  newCategory: Category;
  oldCategory: Category;
  private cateID: number;
  private cateName: string;
  private cateDescription: string;

  constructor(public urlRouter: Router, private categoryService: CategoryService) {
    this.newCategory = new Category();
    // console.log(this.gridData);
  }
  ngOnInit() {
    this.loadItems();
  }
  onButtonClick() {
    console.log('click');
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.currentPage = this.skip / this.pageSize +1;
    console.log(this.currentPage);
    this.loadItems();
  }

  // private loadItems(): void {
  //   this.categoryService.getAll()
  //     .then(x => {
  //       this.gridData = x;
  //       this.gridView = {
  //         data: this.gridData.slice(this.skip, this.skip + this.pageSize),
  //         total: this.gridData.length
  //       };
  //     });
  //   console.log('load data');
  // }

  private loadItems(): void {
    this.categoryService.getPagingCategory(this.currentPage, this.pageSize, this.searchString)
      .then(x => {
        this.gridView = {
          data: x["category"],
          total: x["total"],
        };
        console.log(x["category"]);
      });
    console.log('load data');
  }

  private addCategory() {
    this.categoryService.addcategory(this.newCategory)
      .then(data => {
        this.loadItems();
        this.toast('snackbarAdd');
        this.newCategory.CateName = '';
        this.newCategory.Description = '';
      });
  }

  toast(method: string) {
    const x = document.getElementById(method);
    x.className = 'show';
    setTimeout(function () { x.className = x.className.replace('show', ''); }, 3000);
  }
  private async removeCategory(categoryId: number) {
    this.categoryService.removeItem(categoryId);
    this.loadItems();
  }

  private updateCategory() {
    this.oldCategory.CateID = this.cateID;
    this.oldCategory.CateName = this.cateName;
    this.oldCategory.Description = this.cateDescription;
    console.log('cate new');
    console.log(this.cateName);
    console.log(this.cateDescription)
    this.categoryService.updatecategory(this.oldCategory);
  }

  private senderData(dataItem: Category) {
    console.log(dataItem.CateID);
    this.oldCategory = dataItem;

    this.cateID = dataItem.CateID;
    this.cateName = dataItem.CateName;
    this.cateDescription = dataItem.Description;
  }
  private search() {
    this.loadItems();
  }
}
