import { Pokemon, PokemonTypeName } from '../domain/pokemon.types';

export const POKEMON_SPRITE_BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
export const OFFICIAL_ARTWORK_BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';
export const ANIMATED_SPRITE_BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated';

interface RawSeedEntry {
  id: number;
  name: string;
  types: PokemonTypeName[];
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  height: number; // meters
  weight: number; // kg
  abilities: string[];
  flavorText: string;
}

const RAW_SEEDED_POKEMON: RawSeedEntry[] = [
  {
    id: 1,
    name: 'bulbasaur',
    types: ['grass', 'poison'],
    hp: 45,
    attack: 49,
    defense: 49,
    specialAttack: 65,
    specialDefense: 65,
    speed: 45,
    height: 0.7,
    weight: 6.9,
    abilities: ['Overgrow', 'Chlorophyll'],
    flavorText: 'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.'
  },
  {
    id: 2,
    name: 'ivysaur',
    types: ['grass', 'poison'],
    hp: 60,
    attack: 62,
    defense: 63,
    specialAttack: 80,
    specialDefense: 80,
    speed: 60,
    height: 1.0,
    weight: 13.0,
    abilities: ['Overgrow', 'Chlorophyll'],
    flavorText: 'When the bud on its back starts swelling, a sweet aroma wafts to indicate the flowers coming bloom.'
  },
  {
    id: 3,
    name: 'venusaur',
    types: ['grass', 'poison'],
    hp: 80,
    attack: 82,
    defense: 83,
    specialAttack: 100,
    specialDefense: 100,
    speed: 80,
    height: 2.0,
    weight: 100.0,
    abilities: ['Overgrow', 'Chlorophyll'],
    flavorText: 'The flower on its back catches the rays of the sun. The sunlight is absorbed and turned for energy.'
  },
  {
    id: 4,
    name: 'charmander',
    types: ['fire'],
    hp: 39,
    attack: 52,
    defense: 43,
    specialAttack: 60,
    specialDefense: 50,
    speed: 65,
    height: 0.6,
    weight: 8.5,
    abilities: ['Blaze', 'Solar Power'],
    flavorText: 'From the time it is born, a flame burns at the tip of its tail. Its life would end if the flame went out.'
  },
  {
    id: 5,
    name: 'charmeleon',
    types: ['fire'],
    hp: 58,
    attack: 64,
    defense: 58,
    specialAttack: 80,
    specialDefense: 65,
    speed: 80,
    height: 1.1,
    weight: 19.0,
    abilities: ['Blaze', 'Solar Power'],
    flavorText: 'It has a barbaric nature. In battle, it whips its fiery tail around and slashes away with sharp claws.'
  },
  {
    id: 6,
    name: 'charizard',
    types: ['fire', 'flying'],
    hp: 78,
    attack: 84,
    defense: 78,
    specialAttack: 109,
    specialDefense: 85,
    speed: 100,
    height: 1.7,
    weight: 90.5,
    abilities: ['Blaze', 'Solar Power'],
    flavorText: 'It spits fire that is hot enough to melt boulders. It may cause forest fires by blowing flames.'
  },
  {
    id: 7,
    name: 'squirtle',
    types: ['water'],
    hp: 44,
    attack: 48,
    defense: 65,
    specialAttack: 50,
    specialDefense: 64,
    speed: 43,
    height: 0.5,
    weight: 9.0,
    abilities: ['Torrent', 'Rain Dish'],
    flavorText: 'After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.'
  },
  {
    id: 8,
    name: 'wartortle',
    types: ['water'],
    hp: 59,
    attack: 63,
    defense: 80,
    specialAttack: 65,
    specialDefense: 80,
    speed: 58,
    height: 1.0,
    weight: 22.5,
    abilities: ['Torrent', 'Rain Dish'],
    flavorText: 'It is recognized as a symbol of longevity. If its shell has algae on it, that Wartortle is very old.'
  },
  {
    id: 9,
    name: 'blastoise',
    types: ['water'],
    hp: 79,
    attack: 83,
    defense: 100,
    specialAttack: 85,
    specialDefense: 105,
    speed: 78,
    height: 1.6,
    weight: 85.5,
    abilities: ['Torrent', 'Rain Dish'],
    flavorText: 'A brutal Pokémon with pressurized water jets on its shell. They are used for high-speed tackles.'
  },
  {
    id: 25,
    name: 'pikachu',
    types: ['electric'],
    hp: 35,
    attack: 55,
    defense: 40,
    specialAttack: 50,
    specialDefense: 50,
    speed: 90,
    height: 0.4,
    weight: 6.0,
    abilities: ['Static', 'Lightning Rod'],
    flavorText: 'When several of these Pokémon gather, their electricity could build and cause lightning storms.'
  },
  {
    id: 26,
    name: 'raichu',
    types: ['electric'],
    hp: 60,
    attack: 90,
    defense: 55,
    specialAttack: 90,
    specialDefense: 80,
    speed: 110,
    height: 0.8,
    weight: 30.0,
    abilities: ['Static', 'Lightning Rod'],
    flavorText: 'Its long tail serves as a ground to protect itself from its own high-voltage electrical power.'
  },
  {
    id: 39,
    name: 'jigglypuff',
    types: ['normal', 'fairy'],
    hp: 115,
    attack: 45,
    defense: 20,
    specialAttack: 45,
    specialDefense: 25,
    speed: 20,
    height: 0.5,
    weight: 5.5,
    abilities: ['Cute Charm', 'Competitive', 'Friend Guard'],
    flavorText: 'When its huge eyes light up, it sings a mysteriously soothing melody that lulls enemies to sleep.'
  },
  {
    id: 52,
    name: 'meowth',
    types: ['normal'],
    hp: 40,
    attack: 45,
    defense: 35,
    specialAttack: 40,
    specialDefense: 40,
    speed: 90,
    height: 0.4,
    weight: 4.2,
    abilities: ['Pickup', 'Technician', 'Unnerve'],
    flavorText: 'Adores round objects. It wanders the streets on a nightly basis to look for dropped loose change.'
  },
  {
    id: 54,
    name: 'psyduck',
    types: ['water'],
    hp: 50,
    attack: 52,
    defense: 48,
    specialAttack: 65,
    specialDefense: 50,
    speed: 55,
    height: 0.8,
    weight: 19.6,
    abilities: ['Damp', 'Cloud Nine', 'Swift Swim'],
    flavorText: 'While lulling its enemies with its vacant look, this wily Pokémon will use psychokinetic powers.'
  },
  {
    id: 65,
    name: 'alakazam',
    types: ['psychic'],
    hp: 55,
    attack: 50,
    defense: 45,
    specialAttack: 135,
    specialDefense: 95,
    speed: 120,
    height: 1.5,
    weight: 48.0,
    abilities: ['Synchronize', 'Inner Focus', 'Magic Guard'],
    flavorText: 'Its brain can outperform a supercomputer. Its intelligence quotient is said to be 5,000.'
  },
  {
    id: 68,
    name: 'machamp',
    types: ['fighting'],
    hp: 90,
    attack: 130,
    defense: 80,
    specialAttack: 65,
    specialDefense: 85,
    speed: 55,
    height: 1.6,
    weight: 130.0,
    abilities: ['Guts', 'No Guard', 'Steadfast'],
    flavorText: 'Using its heavy muscles, it throws powerful punches that can send the victim clear over the horizon.'
  },
  {
    id: 94,
    name: 'gengar',
    types: ['ghost', 'poison'],
    hp: 60,
    attack: 65,
    defense: 60,
    specialAttack: 130,
    specialDefense: 75,
    speed: 110,
    height: 1.5,
    weight: 40.5,
    abilities: ['Cursed Body'],
    flavorText: 'Under a full moon, this Pokémon likes to mimic the shadows of people and laugh at their fright.'
  },
  {
    id: 130,
    name: 'gyarados',
    types: ['water', 'flying'],
    hp: 95,
    attack: 125,
    defense: 79,
    specialAttack: 60,
    specialDefense: 100,
    speed: 81,
    height: 6.5,
    weight: 235.0,
    abilities: ['Intimidate', 'Moxie'],
    flavorText: 'Rarely seen in the wild. Huge and vicious, it is capable of destroying entire cities in a rage.'
  },
  {
    id: 131,
    name: 'lapras',
    types: ['water', 'ice'],
    hp: 130,
    attack: 85,
    defense: 80,
    specialAttack: 85,
    specialDefense: 95,
    speed: 60,
    height: 2.5,
    weight: 220.0,
    abilities: ['Water Absorb', 'Shell Armor', 'Hydration'],
    flavorText: 'A Pokémon that has been overhunted almost to extinction. It can ferry people across the water.'
  },
  {
    id: 133,
    name: 'eevee',
    types: ['normal'],
    hp: 55,
    attack: 55,
    defense: 50,
    specialAttack: 45,
    specialDefense: 65,
    speed: 55,
    height: 0.3,
    weight: 6.5,
    abilities: ['Run Away', 'Adaptability', 'Anticipation'],
    flavorText: 'Its genetic code is irregular. It may mutate if it is exposed to radiation from element stones.'
  },
  {
    id: 134,
    name: 'vaporeon',
    types: ['water'],
    hp: 130,
    attack: 65,
    defense: 60,
    specialAttack: 110,
    specialDefense: 95,
    speed: 65,
    height: 1.0,
    weight: 29.0,
    abilities: ['Water Absorb', 'Hydration'],
    flavorText: 'Lives close to water. Its long tail is ridged with a fin which is often mistaken for a mermaid tail.'
  },
  {
    id: 135,
    name: 'jolteon',
    types: ['electric'],
    hp: 65,
    attack: 65,
    defense: 60,
    specialAttack: 110,
    specialDefense: 95,
    speed: 130,
    height: 0.8,
    weight: 24.5,
    abilities: ['Volt Absorb', 'Quick Feet'],
    flavorText: 'It accumulates negative ions in the atmosphere to blast out 10,000-volt lightning bolts.'
  },
  {
    id: 136,
    name: 'flareon',
    types: ['fire'],
    hp: 65,
    attack: 130,
    defense: 60,
    specialAttack: 95,
    specialDefense: 110,
    speed: 65,
    height: 0.9,
    weight: 25.0,
    abilities: ['Flash Fire', 'Guts'],
    flavorText: 'When storing thermal energy in its body, its temperature could climb to over 1,600 degrees.'
  },
  {
    id: 143,
    name: 'snorlax',
    types: ['normal'],
    hp: 160,
    attack: 110,
    defense: 65,
    specialAttack: 65,
    specialDefense: 110,
    speed: 30,
    height: 2.1,
    weight: 460.0,
    abilities: ['Immunity', 'Thick Fat', 'Gluttony'],
    flavorText: 'Very lazy. Just eats and sleeps. As its enormous bulk builds, it becomes steadily more sluggardly.'
  },
  {
    id: 149,
    name: 'dragonite',
    types: ['dragon', 'flying'],
    hp: 91,
    attack: 134,
    defense: 95,
    specialAttack: 100,
    specialDefense: 100,
    speed: 80,
    height: 2.2,
    weight: 210.0,
    abilities: ['Inner Focus', 'Multiscale'],
    flavorText: 'An extremely rarely seen marine Pokémon. Its intelligence is said to match that of humans.'
  },
  {
    id: 150,
    name: 'mewtwo',
    types: ['psychic'],
    hp: 106,
    attack: 110,
    defense: 90,
    specialAttack: 154,
    specialDefense: 90,
    speed: 130,
    height: 2.0,
    weight: 122.0,
    abilities: ['Pressure', 'Unnerve'],
    flavorText: 'It was created by a scientist after years of horrific gene splicing and DNA engineering experiments.'
  },
  {
    id: 151,
    name: 'mew',
    types: ['psychic'],
    hp: 100,
    attack: 100,
    defense: 100,
    specialAttack: 100,
    specialDefense: 100,
    speed: 100,
    height: 0.4,
    weight: 4.0,
    abilities: ['Synchronize'],
    flavorText: 'So rare that it is still said to be a mirage by many experts. Only a few people have seen it.'
  }
];

export function mapRawToPokemon(raw: RawSeedEntry): Pokemon {
  const total =
    raw.hp +
    raw.attack +
    raw.defense +
    raw.specialAttack +
    raw.specialDefense +
    raw.speed;

  return {
    id: raw.id,
    name: raw.name,
    formattedName: raw.name.charAt(0).toUpperCase() + raw.name.slice(1),
    types: raw.types,
    stats: {
      hp: raw.hp,
      attack: raw.attack,
      defense: raw.defense,
      specialAttack: raw.specialAttack,
      specialDefense: raw.specialDefense,
      speed: raw.speed,
      total,
    },
    height: raw.height,
    weight: raw.weight,
    abilities: raw.abilities.map((name, idx) => ({
      name,
      isHidden: idx === raw.abilities.length - 1 && raw.abilities.length > 1,
    })),
    sprites: {
      frontDefault: `${POKEMON_SPRITE_BASE_URL}/${raw.id}.png`,
      officialArtwork: `${OFFICIAL_ARTWORK_BASE_URL}/${raw.id}.png`,
      animatedFront: `${ANIMATED_SPRITE_BASE_URL}/${raw.id}.gif`,
    },
    generation: 1,
    flavorText: raw.flavorText,
  };
}

export const SEEDED_POKEMON: Pokemon[] = RAW_SEEDED_POKEMON.map(mapRawToPokemon);
