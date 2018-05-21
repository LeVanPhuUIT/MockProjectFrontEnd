import { Component, OnInit, NgModule } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Router } from '@angular/router';
import { Books } from '../../model/books';
import { BookService } from '../../services/book.service';
import { CategoryService } from '../../services/category.service';
import { AuthorService } from '../../services/author.service';
import { PublisherService } from '../../services/publisher.service';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Category } from '../../model/category';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
  providers: [BookService, CategoryService, AuthorService, PublisherService],
})
export class AddBookComponent implements OnInit {

  private newBook: Books;
  public listCategoryName: Array<string>;
  public listAuthorName: Array<string>;
  public listPublisher: Array<string>;
  public serverApi = 'http://localhost:18595/image/';
  public imageUrlDefault = 'http://localhost:18595/image/default-image.jpg';
  public fileToUpload: File = null;
  private imageUrl: string;

  constructor(public urlRouter: Router, private bookService: BookService,
    private categoryService: CategoryService, private authorService: AuthorService,
    private publisherService: PublisherService) {
    this.newBook = new Books();
    // console.log(this.gridData);
  }

  ngOnInit() {
    this.onLoad();
  }

  private onLoad() {
    this.categoryService.getAll()
      .then(x => {
        this.listCategoryName = x['CateInfo'],
          console.log(this.listCategoryName);
        // console.log(this.categoryList[1].CateName);
      });

    this.authorService.getAll()
      .then(x => {
        this.listAuthorName = x['AuthorInfo'],
          console.log(this.listAuthorName)
      });

    this.publisherService.getAll()
      .then(x => {
        this.listPublisher = x['PublisherInfo'],
          console.log(this.listPublisher)
      });
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    console.log(file.item(0));
    this.imageUrl = this.serverApi + file.item(0).name;
    console.log(this.imageUrl);
    console.log(event.target);
    // Show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrlDefault = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  OnSubmit(Image) {
    console.log(Image);
    this.bookService.postFile1(this.fileToUpload).subscribe(
      data => {
        console.log('done');
        Image.value = null;
        this.imageUrlDefault = 'http://localhost:18595/image/default-image.jpg';
      }
    );
  }

  public senderData(formBook) {
    this.newBook = formBook.value as Books;
    this.newBook.ImgUrl = this.imageUrl
    console.log(this.newBook);
  }

  public addBook() {
    this.bookService.addBook(this.newBook).subscribe(result => {
      // Handle result
      console.log(result);
      alert('update thành công');
    },
      error => {
        alert('update thất bại');
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
        this.urlRouter.navigateByUrl('/book-management');
      });;
  }
}
