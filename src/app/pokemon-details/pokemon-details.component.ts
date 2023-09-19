import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetails } from '../pokemon-details';
import { PokemonService } from '../services/pokemon-service/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailsComponent implements OnInit {
  pokemonDetails?: PokemonDetails;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.getPokemonDetails();
  }

  private getPokemonDetails(): void {
    let urlId = Number(this.route.snapshot.paramMap.get('id')); 
    this.pokemonService.getPokemonDetails(urlId).subscribe(details => this.pokemonDetails = details);
  }
}
