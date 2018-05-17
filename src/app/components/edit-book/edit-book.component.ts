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
  public imageUrlDefault = 'http://localhost:18595/image/default-image.jpg';
  public fileToUpload: File = null;
  private imageUrl: string;
  private bookEdit: Books;
  private form: NgForm;
  public Title: string="";
  public Summary: string;
  public CateID: number;
  public AuthorID: number;
  public PubID: number;
  public Price: number;
  public Quantity: number;
  public Status: string;

  public editForm: FormGroup = new FormGroup({
    'Title': new FormControl('', Validators.required),
    'Summary': new FormControl(),
    'Image': new FormControl(),
    'CategoryID': new FormControl('', Validators.required),
    'AuthorID': new FormControl('', Validators.required),
    'PublisherID': new FormControl(),
    'Price': new FormControl(),
    'Quantity': new FormControl(),
    'Status': new FormControl(),
    
}); 

  constructor(public urlRouter: Router, private bookService: BookService,
    private categoryService: CategoryService, private authorService: AuthorService,
    private publisherService: PublisherService) {
    this.newBook = new Books();
    this.bookEdit = new Books();
    // console.log(this.gridData);
  }

  ngOnInit() {
    this.onLoad();
    this.loadData();
    //this.editForm = this.bookService.bookEdit;
  }

  private loadData(){
    // this.bookEdit = this.bookService.bookEdit;
    // this.Title = this.bookEdit.Title;
    // this.Summary = this.bookEdit.Summary;
    // this.CateID = this.bookEdit.CateID;
    // this.AuthorID = this.bookEdit.AuthorID;
    // this.PubID = this.bookEdit.PubID;
    // this.Price = this.bookEdit.Price;
    // this.Quantity = this.bookEdit.Quantity;
    // this.Status = this.bookEdit.Status;
    console.log("di me")
    console.log(this.bookService.bookEdit);
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
    this.bookService.addBook(this.newBook);
  }

}
