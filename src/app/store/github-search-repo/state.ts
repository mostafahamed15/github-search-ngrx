import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { GithubRepo } from 'src/app/models/githubRepository.model';

export const featureAdapter = createEntityAdapter<GithubRepo>({
    selectId: model => model.id
});

export interface State extends EntityState<GithubRepo> {
    results: any[];
    error: string;
    query: string| null;
    loaded: boolean;
    loading: boolean;
    api: string| null;
}

export const initialRepoState: State = featureAdapter.getInitialState({
    results: [],
    query: null,
    error: null,
    loaded: false,
    loading: false,
    api: null
})