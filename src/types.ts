export type PokemonTypeName =
  | 'normal'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'steel'
  | 'fairy'
  | 'dark';

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  total: number;
}

export interface PokemonAbility {
  name: string;
  isHidden: boolean;
  description?: string;
}

export interface PokemonSprites {
  frontDefault: string;
  officialArtwork: string;
  animatedFront?: string;
}

export interface Pokemon {
  id: number;
  name: string;
  formattedName: string;
  types: PokemonTypeName[];
  stats: PokemonStats;
  height: number;
  weight: number;
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
  generation: number;
  flavorText?: string;
}

export interface TypeMatchup {
  weaknesses: PokemonTypeName[];
  resistances: PokemonTypeName[];
  immunities: PokemonTypeName[];
}

export interface PokemonTeamMember {
  pokemonId: number;
  pokemon: Pokemon;
  nickname?: string;
  order: number;
}

export interface PokemonTeam {
  id: string;
  name: string;
  description?: string;
  members: PokemonTeamMember[];
  typeCoverage: PokemonTypeName[];
  teamWeaknesses: Record<PokemonTypeName, number>;
  createdAt: string;
}

export interface BattleTurn {
  turnNumber: number;
  attackerId: number;
  attackerName: string;
  defenderId: number;
  defenderName: string;
  damageDealt: number;
  isCritical: boolean;
  effectiveness: 'super-effective' | 'not-very-effective' | 'normal' | 'immune';
  defenderRemainingHp: number;
  message: string;
}

export interface BattleSimulationResult {
  combatants: {
    fighter1: { id: number; name: string; initialHp: number };
    fighter2: { id: number; name: string; initialHp: number };
  };
  winner: {
    id: number;
    name: string;
    remainingHp: number;
  };
  loser: {
    id: number;
    name: string;
  };
  totalTurns: number;
  turns: BattleTurn[];
  log: string[];
}
