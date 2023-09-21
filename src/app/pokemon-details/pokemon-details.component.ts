import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetailedInfo } from '../pokemon-detailed-info';
import { PokemonService } from '../services/pokemon-service/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailsComponent implements OnInit {
  pokemonDetails?: PokemonDetailedInfo;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.getPokemonDetails();
  }

  private getPokemonDetails(): void {
    let urlId = this.route.snapshot.paramMap.get('id'); 
    if (!urlId) return;
    this.pokemonService.getPokemonDetails(urlId).subscribe(details =>  {
      if (details) {
        this.pokemonDetails = details
      }
    });
  }
}
