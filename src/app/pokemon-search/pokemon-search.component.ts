import { Component, OnInit } from '@angular/core';
import { PokemonDetailedInfo } from '../pokemon-detailed-info';
import { PokemonService } from '../services/pokemon-service/pokemon.service';
import { PokemonBasicInfo } from '../pokemon-basic-info';
import { of, Subject, Observable, forkJoin } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
} from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.css'],
})
export class PokemonSearchComponent implements OnInit {
  searchResults: PokemonDetailedInfo[] = [];
  private limit: number = 151;
  private queryTerms = new Subject<string>();

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.queryTerms
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query: string) => {
        if (query.trim() === '') {
          return of([]);
        }
        return this.getPokemonSearch(query, this.limit)
      })
    ).subscribe((results: PokemonDetailedInfo[]) => {
      this.searchResults = results;
    }) 
  }

  onSearch(query: string) {
    this.queryTerms.next(query);
  }

  private getPokemonSearch(
    query: string,
    limit: number
  ): Observable<PokemonDetailedInfo[]> {
    return this.pokemonService.getPokemonList(limit).pipe(
      switchMap((response: { results: PokemonBasicInfo[] }) => {
        const matchingPokemon: PokemonBasicInfo[] = response.results.filter(
          (pokeBasicInfo: PokemonBasicInfo) =>
            pokeBasicInfo.name.includes(query)
        );

        const requests: Observable<PokemonDetailedInfo | null>[] =
          matchingPokemon.map((pokeBasicInfo: PokemonBasicInfo) => {
            const id: string = this.pokemonService.extractPokemonId(
              pokeBasicInfo.url
            );
            return this.pokemonService.getPokemonDetails(id);
          });

        return forkJoin(requests).pipe(
          // Filter out null values in case some requests failed
          map((details: (PokemonDetailedInfo | null)[]) =>
            details.filter((detail) => detail !== null) as PokemonDetailedInfo[]
          )
        );
      })
    );
  }
}
