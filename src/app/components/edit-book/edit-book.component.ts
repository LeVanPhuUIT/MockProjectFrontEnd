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
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
  providers: [BookService, CategoryService, AuthorService, PublisherService],
})
export class EditBookComponent implements OnInit {

  private newBook: Books;
  public listCategoryName: Array<string>;
  public listAuthorName: Array<string>;
  public listPublisher: Array<string>;
  public serverApi = 'http://localhost:18595/image/';
  public imageUrlDefault = '';
  public fileToUpload: File = null;
  private imageUrl: string;
  private bookEdit: Books;
  private form: NgForm;
  public Title: string = "";
  public Summary: string;
  public CateID: number;
  public AuthorID: number;
  public PubID: number;
  public Price: number;
  public Quantity: number;
  public Status: string;

  editbookform = new FormGroup({
    bookid: new FormControl(''),
    title: new FormControl('', Validators.required),
    summary: new FormControl('', Validators.required),
    cateid: new FormControl('', Validators.required),
    authorid: new FormControl('', Validators.required),
    pubid: new FormControl('', Validators.required),
    price: new FormControl('', [
      Validators.required,
      Validators.min(1)
    ]),
    quantity: new FormControl('', [
      Validators.required,
      Validators.min(1)
    ]),
    status: new FormControl('', Validators.required),
    ImgUrl: new FormControl('', Validators.required),
  });

  get bookid(): any { return this.editbookform.get('bookid'); }
  get title(): any { return this.editbookform.get('title'); }
  get summary(): any { return this.editbookform.get('summary'); }
  get cateid(): any { return this.editbookform.get('cateid'); }
  get authorid(): any { return this.editbookform.get('authorid'); }
  get pubid(): any { return this.editbookform.get('pubid'); }
  get price(): any { return this.editbookform.get('price'); }
  get quantity(): any { return this.editbookform.get('quantity'); }
  get status(): any { return this.editbookform.get('status'); }
  get ImgUrl(): any { return this.editbookform.get('imgUrl'); }

  constructor(public urlRouter: Router, private bookService: BookService,
    private categoryService: CategoryService, private authorService: AuthorService,
    private publisherService: PublisherService, private shareService: ShareService) {
    this.newBook = new Books();
    this.bookEdit = new Books();
    // console.log(this.gridData);
  }

  ngOnInit() {
    this.onLoad();
    this.loadData();
    //this.editForm = this.bookService.bookEdit;
  }

  //book edit
  private loadData() {
    console.log('data send is: ');
    console.log(this.shareService.bookEdit);
    this.bookEdit = this.shareService.bookEdit;
    this.imageUrlDefault = this.shareService.bookEdit.ImgUrl;

    this.editbookform.setValue({
      bookid: this.bookEdit.BookID,
      title: this.bookEdit.Title,
      summary: this.bookEdit.Summary,
      cateid: this.bookEdit.CateID,
      authorid: this.bookEdit.AuthorID,
      pubid: this.bookEdit.PubID,
      price: this.bookEdit.Price,
      quantity: this.bookEdit.Quantity,
      status: this.bookEdit.Status,
      ImgUrl: this.bookEdit.ImgUrl,

    });
  }

  private onLoad() {
    this.categoryService.getAll()
      .then(x => {
        this.listCategoryName = x['CateInfo']
        // console.log(this.categoryList[1].CateName);
      });

    this.authorService.getAll()
      .then(x => {
        this.listAuthorName = x['AuthorInfo']
      });

    this.publisherService.getAll()
      .then(x => {
        this.listPublisher = x['PublisherInfo']
      });
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    this.imageUrl = this.serverApi + file.item(0).name;
    // Show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrlDefault = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  OnSubmit(Image) {
    if (typeof this.imageUrl !== 'undefined' && this.imageUrl) {
      this.bookService.postFile1(this.fileToUpload).subscribe(
        data => {
          console.log('done');
          Image.value = null;
        }
      );
    }
  }

  // public senderData(formBook) {
  //   console.log(formBook.value);
  //   this.newBook = formBook.value as Books;
  //   this.newBook.ImgUrl = this.imageUrl;
  //   console.log("book was edited");
  //   console.log(this.newBook);
  // }


  public editBook() {
    this.bookEdit = this.editbookform.value as Books;
    this.bookEdit.BookID = this.shareService.bookEdit.BookID;
    if (typeof this.imageUrl !== 'undefined' && this.imageUrl) {
      this.bookEdit.ImgUrl = this.imageUrl;
      //this.editbookform.setValue(ImgUrl:this.imageUrl);
    }
    this.bookService.updateBook(this.bookEdit).map(response => response.json())
    .subscribe(result => {
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
      });

  }

  public back(){
    this.urlRouter.navigateByUrl('/book-management');
   }

}
