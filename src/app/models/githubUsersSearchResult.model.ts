import { GithubUser } from "./githubUser.model";

export class UserResults {
    total_count: number;
    incomplete_results: boolean;
    items: Array<GithubUser>;
}