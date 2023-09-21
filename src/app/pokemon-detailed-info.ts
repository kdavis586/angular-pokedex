export interface PokemonDetailedInfo {
  name: string;
  id: number;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  sprites: {
    other: {
      'official-artwork': { front_default: string };
    };
  };
}

