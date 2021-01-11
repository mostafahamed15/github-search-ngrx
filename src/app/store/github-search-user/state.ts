import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { GithubUser } from 'src/app/models/githubUser.model';

export const featureAdapter = createEntityAdapter<GithubUser>({
    selectId: model => model.id
});

export interface State extends EntityState<GithubUser> {
    results: any[];
    error: string;
    query: string| null;
    loaded: boolean;
    loading: boolean;
    api: string| null
}

export const initialState: State = featureAdapter.getInitialState({
    results: [],
    query: null,
    error: null,
    loaded: false,
    loading: false,
    api: null
})