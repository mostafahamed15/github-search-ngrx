import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType} from '@ngrx/effects';

import { map, withLatestFrom, concatMap, catchError } from 'rxjs/operators';
import { RootState } from '../state';
import * as featureActions from './actions';
import * as routerActions from '../routing-store/actions';
import { GithubRepoService } from '../../services/github-repo.service';
import { GithubRepoSearchSelectors } from '.';
import { of } from 'rxjs';

@Injectable()
export class GithubRepoSearchStateEffects {
    constructor(
        private githubService: GithubRepoService,
        private store: Store<RootState>,
        private actions$: Actions
    ) {}

    updateSearchFormEffect$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.updateSearchForm),
        map(({api}) => featureActions.loadReposRequest({api}))
    )
    );

    resetSearchFormEffect$ = createEffect(() => 
    this.actions$.pipe(
        ofType(featureActions.resetState),
        map(() =>
        routerActions.GO({
            path: ['/']
        })
        )
    )
    )

    searchFormSuccessEffect$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadReposRequest),
        withLatestFrom(
            this.store.select(
                GithubRepoSearchSelectors.getGithubRepoSearchStateQuery,
                GithubRepoSearchSelectors.getGithubRepoSearchStateApi

            )
        ),
        concatMap(([_, query]) =>{
           
        return this.githubService.getRepoList(query).pipe(
            map((results) =>
            featureActions.loadReposSuccess({
                results
            })
            ),
            catchError((error) => 
            of(
                featureActions.loadReposFailure({
                    error: error.message
                })
            ))
        )})
    ))

}