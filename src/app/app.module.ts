import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RootStoreModule } from './store/store.module';
import { UserItemComponent } from './component/result/user-item/user-item.component';
import { UserListComponent } from './component/result/user-list/user-list.component';
import { RepoItemComponent } from './component/result/repo-item/repo-item.component';
import { RepoListComponent } from './component/result/repo-list/repo-list.component';
import { SearchFormComponent } from './component/search-form/search-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    UserItemComponent,
    UserListComponent,
    RepoItemComponent,
    RepoListComponent,
    SearchFormComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    RootStoreModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
