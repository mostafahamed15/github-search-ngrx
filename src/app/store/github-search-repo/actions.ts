import { createAction, props } from '@ngrx/store';
import { RepoResults } from 'src/app/models/githubReposSearchResult.model';

// Search form

const SEARCH_FORM = '[Search Form] Update Search Query';
const RESET_STATE = '[Search Form] Reset State';
export const updateSearchForm = createAction(
    SEARCH_FORM,
    props<{ searchQuery: string, api: string }>()
);
export const resetState = createAction(RESET_STATE);

// Load repos

const LOAD_REPOS = '[Repos] Load Repos';
const LOAD_REPOS_FAIL = '[Repos] Load Repos Fail';
const LOAD__REPOS_SUCCESS = '[Repos] Load Repos Success';
export const loadReposRequest = createAction(
    LOAD_REPOS,
    props<{ api: string }>()
    );
export const loadReposFailure = createAction(
    LOAD_REPOS_FAIL,
    props<{ error: string}>()
);
export const loadReposSuccess = createAction(
    LOAD__REPOS_SUCCESS,
    props<{ results: RepoResults }>()
)