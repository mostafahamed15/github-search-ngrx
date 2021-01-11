import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { initialRepoState, State, featureAdapter } from './state';

const featureReducer = createReducer(
    initialRepoState,
    on(featureActions.updateSearchForm, (state, { searchQuery, api }) => ({
        ...state,
        query: searchQuery,
        api: api
    })),
    on(featureActions.resetState, () => ({
        ...initialRepoState
    })),
    on(featureActions.loadReposRequest, (state, { api }) => {
    
    return ({
        ...state,
        loading: true,
        error: null,
        api: api
    })}),
    on(featureActions.loadReposSuccess, (state, { results }) => 
        featureAdapter.addMany(results.items, {
            ...state,
            loaded: true,
            loading: false,
            error: null,
            incomplete_results: results.incomplete_results,
            total_count: results.total_count
        })
    ),
    on(featureActions.loadReposFailure, (state, { error }) => ({
        ...state,
        loading: false,
        loaded: false,
        error
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return featureReducer(state, action);
}