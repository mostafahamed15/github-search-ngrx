import { Component, OnInit, Input } from '@angular/core';
import { GithubUser } from '../../../models/githubUser.model';
import { Store } from '@ngrx/store';
import { State } from '../../../store/github-search-user/state';
import { GithubUserSearchActions } from '../../../store/github-search-user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() results: GithubUser[];
  @Input() isLoading: boolean;
  @Input() query: string;
  @Input() error: string;

  public loadingArray = new Array(4).fill('loading');

  constructor(private store: Store<State>) {}

  ngOnInit(): void {}

  public trackByUser(index: any, user: GithubUser) {
    return user ? user.id : index;
  }

  public clearSearch() {
    this.store.dispatch(GithubUserSearchActions.resetState());
  }

}
