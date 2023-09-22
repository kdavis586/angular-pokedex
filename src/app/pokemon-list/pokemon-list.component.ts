import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon-service/pokemon.service';
import { PokemonBasicInfo } from '../pokemon-basic-info';
import { PokemonDetailedInfo } from '../pokemon-detailed-info';

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
        response.results.forEach((pokemonBasicInfo: PokemonBasicInfo) => {
          const id = this.pokemonService.extractPokemonId(pokemonBasicInfo.url);
          this.pokemonService.getPokemonDetails(id).subscribe((details: (PokemonDetailedInfo | null)) => {
            if (details) {
              this.pokemonList.push(details);
            }
          })
        })

      });
  }

}
