import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RepoResults } from '../models/githubReposSearchResult.model';




@Injectable({
  providedIn: 'root'
})
export class GithubRepoService {
  api: any;
  private userListUrl = 'https://api.github.com/search/repositories';
  constructor(private http: HttpClient) { 
  };
  getRepoList(query: string): Observable<RepoResults> {
    const params = new HttpParams().set('q', query);
     
      return this.http.get<RepoResults>(this.userListUrl, { params });
    
  }
}
