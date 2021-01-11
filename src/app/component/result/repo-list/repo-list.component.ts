import { Component, OnInit, Input } from '@angular/core';
import { GithubRepo } from '../../../models/githubRepository.model';
import { Store } from '@ngrx/store';
import { State } from '../../../store/github-search-repo/state';
import { GithubRepoSearchActions } from '../../../store/github-search-repo';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent implements OnInit {
  @Input() results: GithubRepo[];
  @Input() isLoading: boolean;
  @Input() query: string;
  @Input() error: string;

  public loadingArray = new Array(4).fill('loading');

  constructor(private store: Store<State>) {
    this.store.subscribe( state => console.log(state))
  }

  ngOnInit(): void {
    
  }

  public trackByUser(index: any, repo: GithubRepo) {
    return repo ? repo.id : index;
  }

  public clearSearch() {
    this.store.dispatch(GithubRepoSearchActions.resetState());
  }


}
