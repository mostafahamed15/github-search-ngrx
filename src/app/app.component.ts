import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from './store/state';
import { GithubUserSearchSelectors, GithubUserSearchActions } from './store/github-search-user';
import { GithubRepoSearchSelectors, GithubRepoSearchActions } from './store/github-search-repo';
import { RouteSelector } from './store/routing-store';
import { Observable, BehaviorSubject } from 'rxjs';
import { GithubUser } from './models/githubUser.model';
import { GithubRepo } from './models/githubRepository.model';
import { debounceTime, withLatestFrom, distinctUntilChanged } from 'rxjs/operators';
import { Router, Params } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'github-search';
  public results$: Observable<GithubUser[]>;
  public resultsRepo$: Observable<GithubRepo[]>;
  public isLoading$: Observable<boolean>;
  public isLoaded$: Observable<boolean>;
  public error$: Observable<string>;
  public query$: Observable<string>;
  public api$: Observable<string>;
  public routeParam$: Observable<Params>;
  public modifier: string = 'user';
  

  constructor(private store: Store<RootState>) {}

  ngOnInit() {
    this.setUpSelectors();
    this.setUpUrlLoading();
  }

  public setUpSelectors() {

    this.results$ = this.store.select(
      GithubUserSearchSelectors.getGithubUserSearchStateSuccess
    );
    this.resultsRepo$ = this.store.select(
      GithubRepoSearchSelectors.getGithubRepoSearchStateSuccess
    );
    this.isLoading$ = this.store.select(
      GithubUserSearchSelectors.getGithubUserSearchStateLoading
    );

    this.isLoaded$ = this.store.select(
      GithubUserSearchSelectors.getGithubSearchStateLoaded
    );

    this.query$ = this.store.select(
      GithubUserSearchSelectors.getGithubUserSearchStateQuery
    );

    this.api$ = this.store.select(
      GithubUserSearchSelectors.getGithubUserSearchStateApi
    );

    this.error$ = this.store.select(
      GithubUserSearchSelectors.getGithubUserSearchStateError
    );

    this.routeParam$ = this.store.select(RouteSelector.getSelectedRouteParam);
    
  }

  public setUpUrlLoading() {
    this.routeParam$
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        withLatestFrom(this.query$)
      )
      .subscribe(([queryParam, queryFromState]) => {
        const param = queryParam?.q;
        if (param && param !== queryFromState) {
          this.updateSearch({ query: param});
        }
      });
  }

  public updateSearch(data) {
    this.modifier = data.api
    if ( data.query === undefined  || data.query === null   || data.query.length === 0 || data.query.length < 3) {
      this.store.dispatch(
        GithubUserSearchActions.resetState()
      );
      
    }else {
      this.store.dispatch(
        GithubUserSearchActions.updateSearchForm({
          searchQuery: data.query,
          api: this.modifier
        })
      );
    }
   

  }



}
