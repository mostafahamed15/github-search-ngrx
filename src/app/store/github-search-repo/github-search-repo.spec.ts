import * as fromReducers from './reducers';
import * as fromActions from './actions';
import * as fromState from './state';
import * as fromSelectors from './selectors';
import { GithubRepo } from '../../models/githubRepository.model';
import { RepoResults } from '../../models/githubReposSearchResult.model';
import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { RootState } from '../state';

describe('Reducers and States', () => {
  it('should return the default State from a undefined Reducer', () => {
    const { initialState } = fromState;
    const action = {} as any;
    const state = fromReducers.reducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should call [Reset State] and change State', () => {
    const { initialState } = fromState;
    const action = fromActions.resetState();
    const state = fromReducers.reducer(initialState, action);

    expect(state.query).toBe(null);
    expect(state.loaded).toBe(false);
    expect(state.loading).toBe(false);
  });

  it('should call [Update Search Query] and change State.query', () => {
    const { initialState } = fromState;
    const action = fromActions.updateSearchForm({ searchQuery: 'Teste' });
    const state = fromReducers.reducer(initialState, action);

    expect(state.query).toBe('Teste');
  });

  it('should call [Load Jokes] and change State.loading', () => {
    const { initialState } = fromState;
    const action = fromActions.loadReposRequest();
    const state = fromReducers.reducer(initialState, action);
    expect(state.loading).toBeTruthy();
  });

  it('should call [Load Jokes Success]', () => {
    const repos: RepoResults = {
      incomplete_results: false,
      total_count: 1,
      items: [
        {
            id: 124,
            node_id: "ddas",
            name: 'dos',
            full_name: 'xsaxx',
        } as GithubRepo
      ]
    };
    const { initialState } = fromState;
    const action = fromActions.loadReposSuccess({ results: repos });
    const state = fromReducers.reducer(initialState, action);
    expect(state.entities).toBeDefined();
    expect(state.ids).toEqual([repos.items[0].id]);
  });

  it('should call [Load Jokes Failure] and change State.error', () => {
    const { initialState } = fromState;
    const action = fromActions.loadReposFailure({ error: '404 not found' });
    const state = fromReducers.reducer(initialState, action);
    expect(state.error).toBe('404 not found');
  });
});

describe('Selectors', () => {
  let store: Store<RootState>;
  const repos: RepoResults = {
    incomplete_results: false,
    total_count: 1,
    items: [
      {
        id: 124,
        node_id: "ddas",
        name: 'dos',
        full_name: 'xsaxx',
      } as GithubRepo
    ]
  };
  const entities = { 12346: repos.items[0] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('githubRepoSearch', fromReducers.reducer)
      ]
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should return the results from a Selector [getGithubRepoSearchStateSuccess]', () => {
    let result: any;

    store
      .select(fromSelectors.getGithubRepoSearchStateSuccess)
      .subscribe((value) => {
        result = value;
      });
    expect(result).toEqual([]);
    store.dispatch(fromActions.loadReposSuccess({ results: repos }));
    expect(result[0]).toEqual(entities['12346']);
  });

  it('should return the results from a Selector [getGithubRepoSearchStateQuery]', () => {
    let result: any;

    store
      .select(fromSelectors.getGithubRepoSearchStateQuery)
      .subscribe((value) => {
        result = value;
      });
    expect(result).toEqual(null);
    store.dispatch(fromActions.updateSearchForm({ searchQuery: 'hello' }));
    expect(result).toEqual('hello');
  });

  it('should return the results from a Selector [getGithubRepoSearchStateError]', () => {
    let result: any;

    store
      .select(fromSelectors.getGithubRepoSearchStateError)
      .subscribe((value) => {
        result = value;
      });
    expect(result).toEqual(null);
    store.dispatch(fromActions.loadReposFailure({ error: '404' }));
    expect(result).toEqual('404');
  });

  it('should return the results from a Selector [getGithubRepoSearchStateLoading]', () => {
    let result: any;

    store
      .select(fromSelectors.getGithubrepoSearchStateLoading)
      .subscribe((value) => {
        result = value;
      });
    expect(result).toEqual(false);
    store.dispatch(fromActions.loadReposRequest());
    expect(result).toEqual(true);
  });

  it('should return the results from a Selector [getGithubRepoSearchStateLoaded]', () => {
    let result: any;

    store
      .select(fromSelectors.getGithubSearchStateLoaded)
      .subscribe((value) => {
        result = value;
      });
    expect(result).toEqual(false);
    store.dispatch(fromActions.loadReposSuccess({ results: repos }));
    expect(result).toEqual(true);
  });
});
