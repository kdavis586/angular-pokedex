export interface PokemonDetails {
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

export const DefaultPokemonDetails: PokemonDetails = {
  name: '',
  id: -1,
  height: -1,
  weight: -1,
  types: [],
  sprites: { other: { 'official-artwork': { front_default: '' } } },
};
