import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import { News } from '../news';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  private itemsUrl = 'https://hacker-news.firebaseio.com/v0/item/';
  public allData: any[];
  constructor(private httpClient: HttpClient) { }

  getNewStories(newsUrl: string): Observable<any> {
    return this.httpClient.get<any>(newsUrl)
      .pipe(map(res => res),
        catchError((err) => {
        console.log('error caught in getNewStories', err);
        return throwError(err);    // Rethrow it back to component
      }));
  }


  getNewsItems(storyId: number): Observable<News> {
    return this.httpClient.get<News>(this.itemsUrl + storyId + '.json?print=pretty')
      .pipe(map(res => res),
        catchError((err) => {
          console.log('error caught in getNewsItems', err);
          return throwError(err);    // Rethrow it back to component
        }));
  }

}
