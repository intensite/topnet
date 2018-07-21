import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Player } from '../models/player.model';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playerUrl = environment.hostIp+'player';  // URL to web api

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<any[]> {
    return this.http.get<any[]>(this.playerUrl)
      .pipe(
        tap(players => this.log(`fetched players`)),
        catchError(this.handleError('getPlayers', []))
      );
  }

  /** GET player by id. Will 404 if id not found */
  getPlayerByID(id: number): Observable<any> {
    // debugger;
    const url = `${this.playerUrl}/${id}`;
    return this.http.get<any>(url);
  }


  /** POST: add a new player to the server */
  addPlayer(player: Player): Observable<Player> {

    return this.http.post<Player>(this.playerUrl, player).pipe(
      tap((player: Player) => this.log(`added player w/ id=${player.id}`)),
      catchError(this.handleError<Player>('addPlayer'))
    );
  }

  /** PUT: update the player on the server */
  // updatePlayer(player: Player): Observable<any> {
  updatePlayer(player): Observable<any> {
    const url = `${this.playerUrl}/${player.id}`;
    console.log('Inside serservicever updatePlayer');
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put(url, player, httpOptions).pipe(
      tap(_ => this.log(`updated player id=${player.id}`)),
      catchError(this.handleError<any>('updatePlayer'))
    );
  }

  // return this.http.post('/api/products', product)
  //                 .toPromise()
  //                 .then((response) => response);



  /** Log a PlayerService message with the MessageService */
  private log(message: string) {
    // this.messageService.add('PlayerService: ' + message);
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
