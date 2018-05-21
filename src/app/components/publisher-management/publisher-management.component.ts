import { Component, OnInit, NgModule } from '@angular/core';
import { products } from '../../model/products';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Router } from '@angular/router';
import { PublisherService } from '../../services/publisher.service'
import { Publisher } from '../../model/publisher';
import { error } from 'protractor';

@Component({
  selector: 'app-publisher-management',
  templateUrl: './publisher-management.component.html',
  styleUrls: ['./publisher-management.component.scss'],
  providers: [PublisherService]
})
export class PublisherManagementComponent implements OnInit {
  public gridData: any[] = products;
  public gridView: GridDataResult;
  public pageSize = 10;
  public currentPage = 1;
  public searchString = '';
  public skip = 0;
  private data: Object[];
  public newPublisher: Publisher;
  public oldPublisher: Publisher;
  public PublisherID: number;
  public PublisherName: string;
  public PublisherHistory: string;

  constructor(public urlRouter: Router, private publisherService: PublisherService) {
    this.newPublisher = new Publisher();
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
    this.publisherService.getPagingPublisher(this.currentPage, this.pageSize, this.searchString)
      .then(x => {
        this.gridView = {
          data: x['publisher'],
          total: x['total'],
        };
        console.log(x['publisher']);
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

  private addPublisher() {
    this.publisherService.addpublisher(this.newPublisher)
      .then(data => {
        this.loadItems();
        this.toast('snackbarAdd');
        this.newPublisher.Name = '';
        this.newPublisher.Description = '';
        console.log(this.newPublisher);
      },
    error => {
      alert('add thất bại');
    });
  }

  private senderData(dataItem: Publisher) {
    console.log(dataItem.PubID);
    this.PublisherID = dataItem.PubID;
    this.PublisherName = dataItem.Name;
    this.PublisherHistory = dataItem.Description;
  }

  private updatePublisher(formEdit) {
    console.log(formEdit.value.PublisherID);
    this.oldPublisher = formEdit.value;
    console.log('old: ' + this.oldPublisher.PubID);
    this.publisherService.updatePublisher(this.oldPublisher).subscribe(result => {
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
        this.loadItems();
      });;
  }

  private async removePublisher(PublisherID: number) {
    await this.publisherService.removeItem(PublisherID).subscribe(result => {
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
        this.loadItems();
      });;
  }
}
