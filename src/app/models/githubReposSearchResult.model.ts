import { GithubRepo } from "./githubRepository.model";

export class RepoResults {
    total_count: number;
    incomplete_results: boolean;
    items: Array<GithubRepo>;
}