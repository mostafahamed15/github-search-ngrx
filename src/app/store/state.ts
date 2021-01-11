import { GithubUserSearchState } from "./github-search-user";
import { GithubRepoSearchState} from "./github-search-repo";
import { RouterStateUrl } from "../models/router-state-url";
import { RouterReducerState } from "@ngrx/router-store";

export interface RootState {
  githubUserSearch: GithubUserSearchState.State;
  githubRepoSearch: GithubRepoSearchState.State;
  router: RouterReducerState<RouterStateUrl>;
}
