import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playerUrl = 'http://localhost:3000/api/player/';  // URL to web api

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<any[]> {
    return this.http.get<any[]>(this.playerUrl)
      .pipe(
        tap(players => this.log(`fetched players`)),
        catchError(this.handleError('getPlayers', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getPlayerByID(id: number): Observable<any> {
    // debugger;
    const url = `${this.playerUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(_ => this.log(`fetched player id=${id}`)),
      catchError(this.handleError(`getHero id=${id}`))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add('HeroService: ' + message);
    console.log(message);
  }

  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
