export interface PokemonTypeSlot {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbilitySlot {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokeApiPokemonResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
  };
  types: PokemonTypeSlot[];
  abilities: PokemonAbilitySlot[];
}

export interface PokemonDetails {
  id: number;
  name: string;
  types: string[];
  sprite: string | null;
  abilities: string[];
}
