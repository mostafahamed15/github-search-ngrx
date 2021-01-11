import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, featureAdapter } from './state';
import { GithubRepo } from '../../models/githubRepository.model';


export const getGithubRepoSearchState = createFeatureSelector<State>(
    'githubRepoSearch'
);

export const selectAllGithubRepoSearchItems: (
    state: object
) => GithubRepo[] = featureAdapter.getSelectors(getGithubRepoSearchState)
.selectAll;

export const getGithubRepoSearchStateSuccess = createSelector(
    getGithubRepoSearchState,
    selectAllGithubRepoSearchItems,
    (_, items: any): GithubRepo[] => items
);

export const getGithubRepoSearchStateQuery = createSelector(
    getGithubRepoSearchState,
    (state: State): any => {state.query; state.api}
);

export const getGithubRepoSearchStateApi = createSelector(
    getGithubRepoSearchState,
    (state: State): string => state.api
);

export const getGithubRepoSearchStateError = createSelector(
    getGithubRepoSearchState,
    (state: State): any => state.error
);

export const getGithubrepoSearchStateLoading = createSelector(
    getGithubRepoSearchState,
    (state: State): boolean => state.loading 
);

export const getGithubSearchStateLoaded = createSelector(
    getGithubRepoSearchState,
    (state: State): boolean => state.loaded
);