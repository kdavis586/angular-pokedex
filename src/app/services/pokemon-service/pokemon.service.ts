import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, tap, of, catchError } from 'rxjs';
import { PokemonBasicInfo } from 'src/app/pokemon-basic-info';
import { PokemonDetailedInfo } from 'src/app/pokemon-detailed-info';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Gets a list of pokemon from the pokemon api based on id. 
   * @param limit The maximum amount of results to return. Default is 151 to represent the original gen 1 pokemon.
   * @returns An Observable with a results attribute.  
   */
  getPokemonList(limit: number): Observable<{ results: PokemonBasicInfo[] }>  {
    const url = `${this.baseUrl}/pokemon?limit=${limit})`;
    
    return this.http.get<{ results: PokemonBasicInfo[] }>(url)
      .pipe(
        tap(_ => console.log(`fetched pokemon list`)),
        catchError(this.handleError<{ results: PokemonBasicInfo[] }>('getPokemonList', { results: [] }))
      );
  }

  /**
   * 
   */
  getPokemonDetails(id: string): Observable<PokemonDetailedInfo | null> {
    const url = `${this.baseUrl}/pokemon/${id}`;

    return this.http.get<PokemonDetailedInfo | null>(url)
      .pipe(
        tap(_ => console.log(`fetched details for pokemon id: ${id}`)),
        catchError(() => {
          console.error(`An error occured while fetching details for pokemon with id ${id}`);
          return of(null);
        })
      )
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
