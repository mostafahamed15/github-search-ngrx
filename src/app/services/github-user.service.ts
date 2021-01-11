import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResults } from '../models/githubUsersSearchResult.model';
@Injectable({
  providedIn: 'root'
})
export class GithubUserService {
  private userListUrl = 'https://api.github.com/search/users';
  constructor(private http: HttpClient) { };
  getUserList(query: string): Observable<UserResults> {
    const params = new HttpParams().set('q', query);
    return this.http.get<UserResults>(this.userListUrl, { params });
  }
}
