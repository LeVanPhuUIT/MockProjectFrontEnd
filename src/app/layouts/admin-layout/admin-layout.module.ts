import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ListBookComponent } from '../../components/list-book/list-book.component';
import {AddBookComponent } from '../../components/add-book/add-book.component';
import { NotFoundComponent } from '../../components/not-found/not-found.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
} from '@angular/material';
import { AuthorManagementComponent } from '../../components/author-management/author-management.component';
import { PublisherManagementComponent } from '../../components/publisher-management/publisher-management.component';
import { BookManagementComponent } from '../../components/book-management/book-management.component';
import { EditBookComponent } from '../../components/edit-book/edit-book.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
    GridModule,
    ButtonsModule,

  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    ListBookComponent,
    AuthorManagementComponent,
    PublisherManagementComponent,
    BookManagementComponent,
    AddBookComponent,
    EditBookComponent,
    NotFoundComponent,
  ]
})

export class AdminLayoutModule {}
