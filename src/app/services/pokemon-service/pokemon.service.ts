import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, tap, of, catchError } from 'rxjs';
import { Pokemon } from 'src/app/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(
    private http: HttpClient
  ) {}

  // TODO: any type return
  getPokemonList(startId: number, endId: number): Observable<{ results: Pokemon[] }>  {
    let offset = startId - 1;
    let limit = endId - offset;
    let url =  `${this.baseUrl}/pokemon?offset=${offset}&limit=${limit})`;
    
    // TODO fix the typing on this
    return this.http.get<{ results: Pokemon[] }>(url)
      .pipe(
        tap(_ => console.log(`fetched pokemon list`)),
        catchError(this.handleError<{ results: Pokemon[] }>('getPokemonList', { results: [] }))
      );
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  *
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
