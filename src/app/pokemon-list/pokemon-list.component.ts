import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon-service/pokemon.service';
import { PokemonBasicInfo } from '../pokemon-basic-info';
import { PokemonDetailedInfo } from '../pokemon-detailed-info';
import { forkJoin, Observable } from 'rxjs'

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemonList: PokemonDetailedInfo[] = [];
  
  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemonList();
  }

  /**
   * Uses the PokemonService to populate pokemonList with information. 
   */
  private getPokemonList(): void {
    let limit: number = 151;
    this.pokemonService.getPokemonList(limit)
      .subscribe(response => {
        const pokeObservables: Observable<PokemonDetailedInfo | null>[] = [];

        response.results.forEach((pokemonBasicInfo: PokemonBasicInfo) => {
          const id = this.pokemonService.extractPokemonId(pokemonBasicInfo.url);
          pokeObservables.push(this.pokemonService.getPokemonDetails(id));
        });

        forkJoin(pokeObservables)
          .subscribe((details: (PokemonDetailedInfo | null)[]) => {
            const validDetails = details.filter(detail => detail !== null) as PokemonDetailedInfo[];
            validDetails.sort((a, b) => a.id - b.id);
            this.pokemonList = validDetails;
          });
      });
  }
}
