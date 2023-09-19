import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, tap, of, catchError } from 'rxjs';
import { PokemonListItem } from 'src/app/pokemon-list-item';
import { DefaultPokemonDetails, PokemonDetails } from 'src/app/pokemon-details';

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
   * @param startId The id of the first pokemon in the list (inclusive).
   * @param endId The id of the last pokemon in the list (inclusive).
   * @returns An Observable with a results attribute.  
   */
  getPokemonList(startId: number, endId: number): Observable<{ results: PokemonListItem[] }>  {
    let offset = startId - 1;
    let limit = endId - offset;
    let url =  `${this.baseUrl}/pokemon?offset=${offset}&limit=${limit})`;
    
    return this.http.get<{ results: PokemonListItem[] }>(url)
      .pipe(
        tap(_ => console.log(`fetched pokemon list`)),
        catchError(this.handleError<{ results: PokemonListItem[] }>('getPokemonList', { results: [] }))
      );
  }

  /**
   * 
   */
  getPokemonDetails(id:number): Observable<PokemonDetails> {
    let url = `${this.baseUrl}/pokemon/${id}`;

    return this.http.get<PokemonDetails>(url)
      .pipe(
        tap(_ => console.log(`fetched details for pokemon id: ${id}`)),
        catchError(this.handleError<PokemonDetails>('getPokemonDetails', DefaultPokemonDetails))
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
