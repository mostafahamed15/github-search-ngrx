import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GithubRepoSearchStateEffects } from './effects';
import { reducer } from './reducers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('githubRepoSearch', reducer),
    EffectsModule.forFeature([GithubRepoSearchStateEffects])
  ]
})
export class GithubSearchRepoModule { }
