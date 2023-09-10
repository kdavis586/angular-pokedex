import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon-service/pokemon.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  
  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemonList();
  }

  /**
   * Uses the PokemonService to populate pokemonList with information. 
   */
  private getPokemonList() {
    this.pokemonService.getPokemonList(1, 151)
      .subscribe(response => {
        this.pokemonList = response.results;
      });
  }

  /**
   * Takes the endpoint for a specific pokemon and returns the id portion of the string.
   *  
   * @param url The pokemon url to extract the id from
   * @returns The pokemon id
   */
  extractPokemonId(url:string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }
}
