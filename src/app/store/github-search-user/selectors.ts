import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, featureAdapter } from './state';
import { GithubUser } from '../../models/githubUser.model';


export const getGithubUserSearchState = createFeatureSelector<State>(
    'githubUserSearch'
);

export const selectAllGithubUserSearchItems: (
    state: object
) => GithubUser[] = featureAdapter.getSelectors(getGithubUserSearchState)
.selectAll;

export const getGithubUserSearchStateSuccess = createSelector(
    getGithubUserSearchState,
    selectAllGithubUserSearchItems,
    (_, items: any): GithubUser[] => items
);

export const getGithubUserSearchStateQuery = createSelector(
    getGithubUserSearchState,
    (state: State) : any => state.query
);

export const getGithubUserSearchStateApi = createSelector(
    getGithubUserSearchState,
    (state: State) : string => state.api
);

export const getGithubUserSearchStateError = createSelector(
    getGithubUserSearchState,
    (state: State): any => state.error
);

export const getGithubUserSearchStateLoading = createSelector(
    getGithubUserSearchState,
    (state: State): boolean => state.loading 
);

export const getGithubSearchStateLoaded = createSelector(
    getGithubUserSearchState,
    (state: State): boolean => state.loaded
);