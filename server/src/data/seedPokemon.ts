import { Pokemon, PokemonTypeName } from '../domain/pokemon.types';

export const POKEMON_SPRITE_BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
export const OFFICIAL_ARTWORK_BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';
export const ANIMATED_SPRITE_BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated';
export const SHINY_SPRITE_BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny';
export const ANIMATED_SHINY_BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny';
export const CRY_BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest';

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
  height: number;
  weight: number;
  abilities: string[];
  flavorText: string;
}

const RAW_SEEDED_POKEMON: RawSeedEntry[] = [
  {
    "id": 1,
    "name": "bulbasaur",
    "types": [
      "grass",
      "poison"
    ],
    "hp": 45,
    "attack": 49,
    "defense": 49,
    "specialAttack": 65,
    "specialDefense": 65,
    "speed": 45,
    "height": 0.7,
    "weight": 6.9,
    "abilities": [
      "overgrow",
      "chlorophyll"
    ],
    "flavorText": "A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON."
  },
  {
    "id": 2,
    "name": "ivysaur",
    "types": [
      "grass",
      "poison"
    ],
    "hp": 60,
    "attack": 62,
    "defense": 63,
    "specialAttack": 80,
    "specialDefense": 80,
    "speed": 60,
    "height": 1,
    "weight": 13,
    "abilities": [
      "overgrow",
      "chlorophyll"
    ],
    "flavorText": "When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs."
  },
  {
    "id": 3,
    "name": "venusaur",
    "types": [
      "grass",
      "poison"
    ],
    "hp": 80,
    "attack": 82,
    "defense": 83,
    "specialAttack": 100,
    "specialDefense": 100,
    "speed": 80,
    "height": 2,
    "weight": 100,
    "abilities": [
      "overgrow",
      "chlorophyll"
    ],
    "flavorText": "The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight."
  },
  {
    "id": 4,
    "name": "charmander",
    "types": [
      "fire"
    ],
    "hp": 39,
    "attack": 52,
    "defense": 43,
    "specialAttack": 60,
    "specialDefense": 50,
    "speed": 65,
    "height": 0.6,
    "weight": 8.5,
    "abilities": [
      "blaze",
      "solar power"
    ],
    "flavorText": "Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail."
  },
  {
    "id": 5,
    "name": "charmeleon",
    "types": [
      "fire"
    ],
    "hp": 58,
    "attack": 64,
    "defense": 58,
    "specialAttack": 80,
    "specialDefense": 65,
    "speed": 80,
    "height": 1.1,
    "weight": 19,
    "abilities": [
      "blaze",
      "solar power"
    ],
    "flavorText": "When it swings its burning tail, it elevates the temperature to unbearably high levels."
  },
  {
    "id": 6,
    "name": "charizard",
    "types": [
      "fire",
      "flying"
    ],
    "hp": 78,
    "attack": 84,
    "defense": 78,
    "specialAttack": 109,
    "specialDefense": 85,
    "speed": 100,
    "height": 1.7,
    "weight": 90.5,
    "abilities": [
      "blaze",
      "solar power"
    ],
    "flavorText": "Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally."
  },
  {
    "id": 7,
    "name": "squirtle",
    "types": [
      "water"
    ],
    "hp": 44,
    "attack": 48,
    "defense": 65,
    "specialAttack": 50,
    "specialDefense": 64,
    "speed": 43,
    "height": 0.5,
    "weight": 9,
    "abilities": [
      "torrent",
      "rain dish"
    ],
    "flavorText": "After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth."
  },
  {
    "id": 8,
    "name": "wartortle",
    "types": [
      "water"
    ],
    "hp": 59,
    "attack": 63,
    "defense": 80,
    "specialAttack": 65,
    "specialDefense": 80,
    "speed": 58,
    "height": 1,
    "weight": 22.5,
    "abilities": [
      "torrent",
      "rain dish"
    ],
    "flavorText": "Often hides in water to stalk unwary prey. For swimming fast, it moves its ears to maintain balance."
  },
  {
    "id": 9,
    "name": "blastoise",
    "types": [
      "water"
    ],
    "hp": 79,
    "attack": 83,
    "defense": 100,
    "specialAttack": 85,
    "specialDefense": 105,
    "speed": 78,
    "height": 1.6,
    "weight": 85.5,
    "abilities": [
      "torrent",
      "rain dish"
    ],
    "flavorText": "A brutal POKéMON with pressurized water jets on its shell. They are used for high speed tackles."
  },
  {
    "id": 10,
    "name": "caterpie",
    "types": [
      "bug"
    ],
    "hp": 45,
    "attack": 30,
    "defense": 35,
    "specialAttack": 20,
    "specialDefense": 20,
    "speed": 45,
    "height": 0.3,
    "weight": 2.9,
    "abilities": [
      "shield dust",
      "run away"
    ],
    "flavorText": "Its short feet are tipped with suction pads that enable it to tirelessly climb slopes and walls."
  },
  {
    "id": 11,
    "name": "metapod",
    "types": [
      "bug"
    ],
    "hp": 50,
    "attack": 20,
    "defense": 55,
    "specialAttack": 25,
    "specialDefense": 25,
    "speed": 30,
    "height": 0.7,
    "weight": 9.9,
    "abilities": [
      "shed skin"
    ],
    "flavorText": "This POKéMON is vulnerable to attack while its shell is soft, exposing its weak and tender body."
  },
  {
    "id": 12,
    "name": "butterfree",
    "types": [
      "bug",
      "flying"
    ],
    "hp": 60,
    "attack": 45,
    "defense": 50,
    "specialAttack": 90,
    "specialDefense": 80,
    "speed": 70,
    "height": 1.1,
    "weight": 32,
    "abilities": [
      "compound eyes",
      "tinted lens"
    ],
    "flavorText": "In battle, it flaps its wings at high speed to release highly toxic dust into the air."
  },
  {
    "id": 13,
    "name": "weedle",
    "types": [
      "bug",
      "poison"
    ],
    "hp": 40,
    "attack": 35,
    "defense": 30,
    "specialAttack": 20,
    "specialDefense": 20,
    "speed": 50,
    "height": 0.3,
    "weight": 3.2,
    "abilities": [
      "shield dust",
      "run away"
    ],
    "flavorText": "Often found in forests, eating leaves. It has a sharp venomous stinger on its head."
  },
  {
    "id": 14,
    "name": "kakuna",
    "types": [
      "bug",
      "poison"
    ],
    "hp": 45,
    "attack": 25,
    "defense": 50,
    "specialAttack": 25,
    "specialDefense": 25,
    "speed": 35,
    "height": 0.6,
    "weight": 10,
    "abilities": [
      "shed skin"
    ],
    "flavorText": "Almost incapable of moving, this POKéMON can only harden its shell to protect itself from predators."
  },
  {
    "id": 15,
    "name": "beedrill",
    "types": [
      "bug",
      "poison"
    ],
    "hp": 65,
    "attack": 90,
    "defense": 40,
    "specialAttack": 45,
    "specialDefense": 80,
    "speed": 75,
    "height": 1,
    "weight": 29.5,
    "abilities": [
      "swarm",
      "sniper"
    ],
    "flavorText": "Flies at high speed and attacks using its large venomous stingers on its forelegs and tail."
  },
  {
    "id": 16,
    "name": "pidgey",
    "types": [
      "normal",
      "flying"
    ],
    "hp": 40,
    "attack": 45,
    "defense": 40,
    "specialAttack": 35,
    "specialDefense": 35,
    "speed": 56,
    "height": 0.3,
    "weight": 1.8,
    "abilities": [
      "keen eye",
      "tangled feet",
      "big pecks"
    ],
    "flavorText": "A common sight in forests and woods. It flaps its wings at ground level to kick up blinding sand."
  },
  {
    "id": 17,
    "name": "pidgeotto",
    "types": [
      "normal",
      "flying"
    ],
    "hp": 63,
    "attack": 60,
    "defense": 55,
    "specialAttack": 50,
    "specialDefense": 50,
    "speed": 71,
    "height": 1.1,
    "weight": 30,
    "abilities": [
      "keen eye",
      "tangled feet",
      "big pecks"
    ],
    "flavorText": "Very protective of its sprawling territorial area, this POKéMON will fiercely peck at any intruder."
  },
  {
    "id": 18,
    "name": "pidgeot",
    "types": [
      "normal",
      "flying"
    ],
    "hp": 83,
    "attack": 80,
    "defense": 75,
    "specialAttack": 70,
    "specialDefense": 70,
    "speed": 101,
    "height": 1.5,
    "weight": 39.5,
    "abilities": [
      "keen eye",
      "tangled feet",
      "big pecks"
    ],
    "flavorText": "When hunting, it skims the surface of water at high speed to pick off unwary prey such as MAGIKARP."
  },
  {
    "id": 19,
    "name": "rattata",
    "types": [
      "normal"
    ],
    "hp": 30,
    "attack": 56,
    "defense": 35,
    "specialAttack": 25,
    "specialDefense": 35,
    "speed": 72,
    "height": 0.3,
    "weight": 3.5,
    "abilities": [
      "run away",
      "guts",
      "hustle"
    ],
    "flavorText": "Bites anything when it attacks. Small and very quick, it is a common sight in many places."
  },
  {
    "id": 20,
    "name": "raticate",
    "types": [
      "normal"
    ],
    "hp": 55,
    "attack": 81,
    "defense": 60,
    "specialAttack": 50,
    "specialDefense": 70,
    "speed": 97,
    "height": 0.7,
    "weight": 18.5,
    "abilities": [
      "run away",
      "guts",
      "hustle"
    ],
    "flavorText": "It uses its whis­ kers to maintain its balance. It apparently slows down if they are cut off."
  },
  {
    "id": 21,
    "name": "spearow",
    "types": [
      "normal",
      "flying"
    ],
    "hp": 40,
    "attack": 60,
    "defense": 30,
    "specialAttack": 31,
    "specialDefense": 31,
    "speed": 70,
    "height": 0.3,
    "weight": 2,
    "abilities": [
      "keen eye",
      "sniper"
    ],
    "flavorText": "Eats bugs in grassy areas. It has to flap its short wings at high speed to stay airborne."
  },
  {
    "id": 22,
    "name": "fearow",
    "types": [
      "normal",
      "flying"
    ],
    "hp": 65,
    "attack": 90,
    "defense": 65,
    "specialAttack": 61,
    "specialDefense": 61,
    "speed": 100,
    "height": 1.2,
    "weight": 38,
    "abilities": [
      "keen eye",
      "sniper"
    ],
    "flavorText": "With its huge and magnificent wings, it can keep aloft without ever having to land for rest."
  },
  {
    "id": 23,
    "name": "ekans",
    "types": [
      "poison"
    ],
    "hp": 35,
    "attack": 60,
    "defense": 44,
    "specialAttack": 40,
    "specialDefense": 54,
    "speed": 55,
    "height": 2,
    "weight": 6.9,
    "abilities": [
      "intimidate",
      "shed skin",
      "unnerve"
    ],
    "flavorText": "Moves silently and stealthily. Eats the eggs of birds, such as PIDGEY and SPEAROW, whole."
  },
  {
    "id": 24,
    "name": "arbok",
    "types": [
      "poison"
    ],
    "hp": 60,
    "attack": 95,
    "defense": 69,
    "specialAttack": 65,
    "specialDefense": 79,
    "speed": 80,
    "height": 3.5,
    "weight": 65,
    "abilities": [
      "intimidate",
      "shed skin",
      "unnerve"
    ],
    "flavorText": "It is rumored that the ferocious warning markings on its belly differ from area to area."
  },
  {
    "id": 25,
    "name": "pikachu",
    "types": [
      "electric"
    ],
    "hp": 35,
    "attack": 55,
    "defense": 40,
    "specialAttack": 50,
    "specialDefense": 50,
    "speed": 90,
    "height": 0.4,
    "weight": 6,
    "abilities": [
      "static",
      "lightning rod"
    ],
    "flavorText": "When several of these POKéMON gather, their electricity could build and cause lightning storms."
  },
  {
    "id": 26,
    "name": "raichu",
    "types": [
      "electric"
    ],
    "hp": 60,
    "attack": 90,
    "defense": 55,
    "specialAttack": 90,
    "specialDefense": 80,
    "speed": 110,
    "height": 0.8,
    "weight": 30,
    "abilities": [
      "static",
      "lightning rod"
    ],
    "flavorText": "Its long tail serves as a ground to protect itself from its own high voltage power."
  },
  {
    "id": 27,
    "name": "sandshrew",
    "types": [
      "ground"
    ],
    "hp": 50,
    "attack": 75,
    "defense": 85,
    "specialAttack": 20,
    "specialDefense": 30,
    "speed": 40,
    "height": 0.6,
    "weight": 12,
    "abilities": [
      "sand veil",
      "sand rush"
    ],
    "flavorText": "Burrows deep underground in arid locations far from water. It only emerges to hunt for food."
  },
  {
    "id": 28,
    "name": "sandslash",
    "types": [
      "ground"
    ],
    "hp": 75,
    "attack": 100,
    "defense": 110,
    "specialAttack": 45,
    "specialDefense": 55,
    "speed": 65,
    "height": 1,
    "weight": 29.5,
    "abilities": [
      "sand veil",
      "sand rush"
    ],
    "flavorText": "Curls up into a spiny ball when threatened. It can roll while curled up to attack or escape."
  },
  {
    "id": 29,
    "name": "nidoran-f",
    "types": [
      "poison"
    ],
    "hp": 55,
    "attack": 47,
    "defense": 52,
    "specialAttack": 40,
    "specialDefense": 40,
    "speed": 41,
    "height": 0.4,
    "weight": 7,
    "abilities": [
      "poison point",
      "rivalry",
      "hustle"
    ],
    "flavorText": "Although small, its venomous barbs render this POKéMON dangerous. The female has smaller horns."
  },
  {
    "id": 30,
    "name": "nidorina",
    "types": [
      "poison"
    ],
    "hp": 70,
    "attack": 62,
    "defense": 67,
    "specialAttack": 55,
    "specialDefense": 55,
    "speed": 56,
    "height": 0.8,
    "weight": 20,
    "abilities": [
      "poison point",
      "rivalry",
      "hustle"
    ],
    "flavorText": "The female's horn develops slowly. Prefers physical attacks such as clawing and biting."
  },
  {
    "id": 31,
    "name": "nidoqueen",
    "types": [
      "poison",
      "ground"
    ],
    "hp": 90,
    "attack": 92,
    "defense": 87,
    "specialAttack": 75,
    "specialDefense": 85,
    "speed": 76,
    "height": 1.3,
    "weight": 60,
    "abilities": [
      "poison point",
      "rivalry",
      "sheer force"
    ],
    "flavorText": "Its hard scales provide strong protection. It uses its hefty bulk to execute powerful moves."
  },
  {
    "id": 32,
    "name": "nidoran-m",
    "types": [
      "poison"
    ],
    "hp": 46,
    "attack": 57,
    "defense": 40,
    "specialAttack": 40,
    "specialDefense": 40,
    "speed": 50,
    "height": 0.5,
    "weight": 9,
    "abilities": [
      "poison point",
      "rivalry",
      "hustle"
    ],
    "flavorText": "Stiffens its ears to sense danger. The larger its horns, the more powerful its secreted venom."
  },
  {
    "id": 33,
    "name": "nidorino",
    "types": [
      "poison"
    ],
    "hp": 61,
    "attack": 72,
    "defense": 57,
    "specialAttack": 55,
    "specialDefense": 55,
    "speed": 65,
    "height": 0.9,
    "weight": 19.5,
    "abilities": [
      "poison point",
      "rivalry",
      "hustle"
    ],
    "flavorText": "An aggressive POKéMON that is quick to attack. The horn on its head secretes a powerful venom."
  },
  {
    "id": 34,
    "name": "nidoking",
    "types": [
      "poison",
      "ground"
    ],
    "hp": 81,
    "attack": 102,
    "defense": 77,
    "specialAttack": 85,
    "specialDefense": 75,
    "speed": 85,
    "height": 1.4,
    "weight": 62,
    "abilities": [
      "poison point",
      "rivalry",
      "sheer force"
    ],
    "flavorText": "It uses its powerful tail in battle to smash, constrict, then break the prey's bones."
  },
  {
    "id": 35,
    "name": "clefairy",
    "types": [
      "fairy"
    ],
    "hp": 70,
    "attack": 45,
    "defense": 48,
    "specialAttack": 60,
    "specialDefense": 65,
    "speed": 35,
    "height": 0.6,
    "weight": 7.5,
    "abilities": [
      "cute charm",
      "magic guard",
      "friend guard"
    ],
    "flavorText": "Its magical and cute appeal has many admirers. It is rare and found only in certain areas."
  },
  {
    "id": 36,
    "name": "clefable",
    "types": [
      "fairy"
    ],
    "hp": 95,
    "attack": 70,
    "defense": 73,
    "specialAttack": 95,
    "specialDefense": 90,
    "speed": 60,
    "height": 1.3,
    "weight": 40,
    "abilities": [
      "cute charm",
      "magic guard",
      "unaware"
    ],
    "flavorText": "A timid fairy POKéMON that is rarely seen. It will run and hide the moment it senses people."
  },
  {
    "id": 37,
    "name": "vulpix",
    "types": [
      "fire"
    ],
    "hp": 38,
    "attack": 41,
    "defense": 40,
    "specialAttack": 50,
    "specialDefense": 65,
    "speed": 65,
    "height": 0.6,
    "weight": 9.9,
    "abilities": [
      "flash fire",
      "drought"
    ],
    "flavorText": "At the time of birth, it has just one tail. The tail splits from its tip as it grows older."
  },
  {
    "id": 38,
    "name": "ninetales",
    "types": [
      "fire"
    ],
    "hp": 73,
    "attack": 76,
    "defense": 75,
    "specialAttack": 81,
    "specialDefense": 100,
    "speed": 100,
    "height": 1.1,
    "weight": 19.9,
    "abilities": [
      "flash fire",
      "drought"
    ],
    "flavorText": "Very smart and very vengeful. Grabbing one of its many tails could result in a 1000-year curse."
  },
  {
    "id": 39,
    "name": "jigglypuff",
    "types": [
      "normal",
      "fairy"
    ],
    "hp": 115,
    "attack": 45,
    "defense": 20,
    "specialAttack": 45,
    "specialDefense": 25,
    "speed": 20,
    "height": 0.5,
    "weight": 5.5,
    "abilities": [
      "cute charm",
      "competitive",
      "friend guard"
    ],
    "flavorText": "When its huge eyes light up, it sings a mysteriously soothing melody that lulls its enemies to sleep."
  },
  {
    "id": 40,
    "name": "wigglytuff",
    "types": [
      "normal",
      "fairy"
    ],
    "hp": 140,
    "attack": 70,
    "defense": 45,
    "specialAttack": 85,
    "specialDefense": 50,
    "speed": 45,
    "height": 1,
    "weight": 12,
    "abilities": [
      "cute charm",
      "competitive",
      "frisk"
    ],
    "flavorText": "The body is soft and rubbery. When angered, it will suck in air and inflate itself to an enormous size."
  },
  {
    "id": 41,
    "name": "zubat",
    "types": [
      "poison",
      "flying"
    ],
    "hp": 40,
    "attack": 45,
    "defense": 35,
    "specialAttack": 30,
    "specialDefense": 40,
    "speed": 55,
    "height": 0.8,
    "weight": 7.5,
    "abilities": [
      "inner focus",
      "infiltrator"
    ],
    "flavorText": "Forms colonies in perpetually dark places. Uses ultrasonic waves to identify and approach targets."
  },
  {
    "id": 42,
    "name": "golbat",
    "types": [
      "poison",
      "flying"
    ],
    "hp": 75,
    "attack": 80,
    "defense": 70,
    "specialAttack": 65,
    "specialDefense": 75,
    "speed": 90,
    "height": 1.6,
    "weight": 55,
    "abilities": [
      "inner focus",
      "infiltrator"
    ],
    "flavorText": "Once it strikes, it will not stop draining energy from the victim even if it gets too heavy to fly."
  },
  {
    "id": 43,
    "name": "oddish",
    "types": [
      "grass",
      "poison"
    ],
    "hp": 45,
    "attack": 50,
    "defense": 55,
    "specialAttack": 75,
    "specialDefense": 65,
    "speed": 30,
    "height": 0.5,
    "weight": 5.4,
    "abilities": [
      "chlorophyll",
      "run away"
    ],
    "flavorText": "During the day, it keeps its face buried in the ground. At night, it wanders around sowing its seeds."
  },
  {
    "id": 44,
    "name": "gloom",
    "types": [
      "grass",
      "poison"
    ],
    "hp": 60,
    "attack": 65,
    "defense": 70,
    "specialAttack": 85,
    "specialDefense": 75,
    "speed": 40,
    "height": 0.8,
    "weight": 8.6,
    "abilities": [
      "chlorophyll",
      "stench"
    ],
    "flavorText": "The fluid that oozes from its mouth isn't drool. It is a nectar that is used to attract prey."
  },
  {
    "id": 45,
    "name": "vileplume",
    "types": [
      "grass",
      "poison"
    ],
    "hp": 75,
    "attack": 80,
    "defense": 85,
    "specialAttack": 110,
    "specialDefense": 90,
    "speed": 50,
    "height": 1.2,
    "weight": 18.6,
    "abilities": [
      "chlorophyll",
      "effect spore"
    ],
    "flavorText": "The larger its petals, the more toxic pollen it contains. Its big head is heavy and hard to hold up."
  },
  {
    "id": 46,
    "name": "paras",
    "types": [
      "bug",
      "grass"
    ],
    "hp": 35,
    "attack": 70,
    "defense": 55,
    "specialAttack": 45,
    "specialDefense": 55,
    "speed": 25,
    "height": 0.3,
    "weight": 5.4,
    "abilities": [
      "effect spore",
      "dry skin",
      "damp"
    ],
    "flavorText": "Burrows to suck tree roots. The mushrooms on its back grow by draw­ ing nutrients from the bug host."
  },
  {
    "id": 47,
    "name": "parasect",
    "types": [
      "bug",
      "grass"
    ],
    "hp": 60,
    "attack": 95,
    "defense": 80,
    "specialAttack": 60,
    "specialDefense": 80,
    "speed": 30,
    "height": 1,
    "weight": 29.5,
    "abilities": [
      "effect spore",
      "dry skin",
      "damp"
    ],
    "flavorText": "A host-parasite pair in which the parasite mushroom has taken over the host bug. Prefers damp places."
  },
  {
    "id": 48,
    "name": "venonat",
    "types": [
      "bug",
      "poison"
    ],
    "hp": 60,
    "attack": 55,
    "defense": 50,
    "specialAttack": 40,
    "specialDefense": 55,
    "speed": 45,
    "height": 1,
    "weight": 30,
    "abilities": [
      "compound eyes",
      "tinted lens",
      "run away"
    ],
    "flavorText": "Lives in the shadows of tall trees where it eats insects. It is attracted by light at night."
  },
  {
    "id": 49,
    "name": "venomoth",
    "types": [
      "bug",
      "poison"
    ],
    "hp": 70,
    "attack": 65,
    "defense": 60,
    "specialAttack": 90,
    "specialDefense": 75,
    "speed": 90,
    "height": 1.5,
    "weight": 12.5,
    "abilities": [
      "shield dust",
      "tinted lens",
      "wonder skin"
    ],
    "flavorText": "The dust-like scales covering its wings are color coded to indicate the kinds of poison it has."
  },
  {
    "id": 50,
    "name": "diglett",
    "types": [
      "ground"
    ],
    "hp": 10,
    "attack": 55,
    "defense": 25,
    "specialAttack": 35,
    "specialDefense": 45,
    "speed": 95,
    "height": 0.2,
    "weight": 0.8,
    "abilities": [
      "sand veil",
      "arena trap",
      "sand force"
    ],
    "flavorText": "Lives about one yard underground where it feeds on plant roots. It sometimes appears above ground."
  },
  {
    "id": 51,
    "name": "dugtrio",
    "types": [
      "ground"
    ],
    "hp": 35,
    "attack": 100,
    "defense": 50,
    "specialAttack": 50,
    "specialDefense": 70,
    "speed": 120,
    "height": 0.7,
    "weight": 33.3,
    "abilities": [
      "sand veil",
      "arena trap",
      "sand force"
    ],
    "flavorText": "A team of DIGLETT triplets. It triggers huge earthquakes by burrowing 60 miles underground."
  },
  {
    "id": 52,
    "name": "meowth",
    "types": [
      "normal"
    ],
    "hp": 40,
    "attack": 45,
    "defense": 35,
    "specialAttack": 40,
    "specialDefense": 40,
    "speed": 90,
    "height": 0.4,
    "weight": 4.2,
    "abilities": [
      "pickup",
      "technician",
      "unnerve"
    ],
    "flavorText": "Adores circular objects. Wanders the streets on a nightly basis to look for dropped loose change."
  },
  {
    "id": 53,
    "name": "persian",
    "types": [
      "normal"
    ],
    "hp": 65,
    "attack": 70,
    "defense": 60,
    "specialAttack": 65,
    "specialDefense": 65,
    "speed": 115,
    "height": 1,
    "weight": 32,
    "abilities": [
      "limber",
      "technician",
      "unnerve"
    ],
    "flavorText": "Although its fur has many admirers, it is tough to raise as a pet because of its fickle meanness."
  },
  {
    "id": 54,
    "name": "psyduck",
    "types": [
      "water"
    ],
    "hp": 50,
    "attack": 52,
    "defense": 48,
    "specialAttack": 65,
    "specialDefense": 50,
    "speed": 55,
    "height": 0.8,
    "weight": 19.6,
    "abilities": [
      "damp",
      "cloud nine",
      "swift swim"
    ],
    "flavorText": "While lulling its enemies with its vacant look, this wily POKéMON will use psychokinetic powers."
  },
  {
    "id": 55,
    "name": "golduck",
    "types": [
      "water"
    ],
    "hp": 80,
    "attack": 82,
    "defense": 78,
    "specialAttack": 95,
    "specialDefense": 80,
    "speed": 85,
    "height": 1.7,
    "weight": 76.6,
    "abilities": [
      "damp",
      "cloud nine",
      "swift swim"
    ],
    "flavorText": "Often seen swim­ ming elegantly by lake shores. It is often mistaken for the Japanese monster, Kappa."
  },
  {
    "id": 56,
    "name": "mankey",
    "types": [
      "fighting"
    ],
    "hp": 40,
    "attack": 80,
    "defense": 35,
    "specialAttack": 35,
    "specialDefense": 45,
    "speed": 70,
    "height": 0.5,
    "weight": 28,
    "abilities": [
      "vital spirit",
      "anger point",
      "defiant"
    ],
    "flavorText": "Extremely quick to anger. It could be docile one moment then thrashing away the next instant."
  },
  {
    "id": 57,
    "name": "primeape",
    "types": [
      "fighting"
    ],
    "hp": 65,
    "attack": 105,
    "defense": 60,
    "specialAttack": 60,
    "specialDefense": 70,
    "speed": 95,
    "height": 1,
    "weight": 32,
    "abilities": [
      "vital spirit",
      "anger point",
      "defiant"
    ],
    "flavorText": "Always furious and tenacious to boot. It will not abandon chasing its quarry until it is caught."
  },
  {
    "id": 58,
    "name": "growlithe",
    "types": [
      "fire"
    ],
    "hp": 55,
    "attack": 70,
    "defense": 45,
    "specialAttack": 70,
    "specialDefense": 50,
    "speed": 60,
    "height": 0.7,
    "weight": 19,
    "abilities": [
      "intimidate",
      "flash fire",
      "justified"
    ],
    "flavorText": "Very protective of its territory. It will bark and bite to repel intruders from its space."
  },
  {
    "id": 59,
    "name": "arcanine",
    "types": [
      "fire"
    ],
    "hp": 90,
    "attack": 110,
    "defense": 80,
    "specialAttack": 100,
    "specialDefense": 80,
    "speed": 95,
    "height": 1.9,
    "weight": 155,
    "abilities": [
      "intimidate",
      "flash fire",
      "justified"
    ],
    "flavorText": "A POKéMON that has been admired since the past for its beauty. It runs agilely as if on wings."
  },
  {
    "id": 60,
    "name": "poliwag",
    "types": [
      "water"
    ],
    "hp": 40,
    "attack": 50,
    "defense": 40,
    "specialAttack": 40,
    "specialDefense": 40,
    "speed": 90,
    "height": 0.6,
    "weight": 12.4,
    "abilities": [
      "water absorb",
      "damp",
      "swift swim"
    ],
    "flavorText": "Its newly grown legs prevent it from running. It appears to prefer swimming than trying to stand."
  },
  {
    "id": 61,
    "name": "poliwhirl",
    "types": [
      "water"
    ],
    "hp": 65,
    "attack": 65,
    "defense": 65,
    "specialAttack": 50,
    "specialDefense": 50,
    "speed": 90,
    "height": 1,
    "weight": 20,
    "abilities": [
      "water absorb",
      "damp",
      "swift swim"
    ],
    "flavorText": "Capable of living in or out of water. When out of water, it sweats to keep its body slimy."
  },
  {
    "id": 62,
    "name": "poliwrath",
    "types": [
      "water",
      "fighting"
    ],
    "hp": 90,
    "attack": 95,
    "defense": 95,
    "specialAttack": 70,
    "specialDefense": 90,
    "speed": 70,
    "height": 1.3,
    "weight": 54,
    "abilities": [
      "water absorb",
      "damp",
      "swift swim"
    ],
    "flavorText": "An adept swimmer at both the front crawl and breast stroke. Easily overtakes the best human swimmers."
  },
  {
    "id": 63,
    "name": "abra",
    "types": [
      "psychic"
    ],
    "hp": 25,
    "attack": 20,
    "defense": 15,
    "specialAttack": 105,
    "specialDefense": 55,
    "speed": 90,
    "height": 0.9,
    "weight": 19.5,
    "abilities": [
      "synchronize",
      "inner focus",
      "magic guard"
    ],
    "flavorText": "Using its ability to read minds, it will identify impending danger and TELEPORT to safety."
  },
  {
    "id": 64,
    "name": "kadabra",
    "types": [
      "psychic"
    ],
    "hp": 40,
    "attack": 35,
    "defense": 30,
    "specialAttack": 120,
    "specialDefense": 70,
    "speed": 105,
    "height": 1.3,
    "weight": 56.5,
    "abilities": [
      "synchronize",
      "inner focus",
      "magic guard"
    ],
    "flavorText": "It emits special alpha waves from its body that induce headaches just by being close by."
  },
  {
    "id": 65,
    "name": "alakazam",
    "types": [
      "psychic"
    ],
    "hp": 55,
    "attack": 50,
    "defense": 45,
    "specialAttack": 135,
    "specialDefense": 95,
    "speed": 120,
    "height": 1.5,
    "weight": 48,
    "abilities": [
      "synchronize",
      "inner focus",
      "magic guard"
    ],
    "flavorText": "Its brain can out­ perform a super­ computer. Its intelligence quotient is said to be 5,000."
  },
  {
    "id": 66,
    "name": "machop",
    "types": [
      "fighting"
    ],
    "hp": 70,
    "attack": 80,
    "defense": 50,
    "specialAttack": 35,
    "specialDefense": 35,
    "speed": 35,
    "height": 0.8,
    "weight": 19.5,
    "abilities": [
      "guts",
      "no guard",
      "steadfast"
    ],
    "flavorText": "Loves to build its muscles. It trains in all styles of martial arts to become even stronger."
  },
  {
    "id": 67,
    "name": "machoke",
    "types": [
      "fighting"
    ],
    "hp": 80,
    "attack": 100,
    "defense": 70,
    "specialAttack": 50,
    "specialDefense": 60,
    "speed": 45,
    "height": 1.5,
    "weight": 70.5,
    "abilities": [
      "guts",
      "no guard",
      "steadfast"
    ],
    "flavorText": "Its muscular body is so powerful, it must wear a power save belt to be able to regulate its motions."
  },
  {
    "id": 68,
    "name": "machamp",
    "types": [
      "fighting"
    ],
    "hp": 90,
    "attack": 130,
    "defense": 80,
    "specialAttack": 65,
    "specialDefense": 85,
    "speed": 55,
    "height": 1.6,
    "weight": 130,
    "abilities": [
      "guts",
      "no guard",
      "steadfast"
    ],
    "flavorText": "Using its heavy muscles, it throws powerful punches that can send the victim clear over the horizon."
  },
  {
    "id": 69,
    "name": "bellsprout",
    "types": [
      "grass",
      "poison"
    ],
    "hp": 50,
    "attack": 75,
    "defense": 35,
    "specialAttack": 70,
    "specialDefense": 30,
    "speed": 40,
    "height": 0.7,
    "weight": 4,
    "abilities": [
      "chlorophyll",
      "gluttony"
    ],
    "flavorText": "A carnivorous POKéMON that traps and eats bugs. It uses its root feet to soak up needed moisture."
  },
  {
    "id": 70,
    "name": "weepinbell",
    "types": [
      "grass",
      "poison"
    ],
    "hp": 65,
    "attack": 90,
    "defense": 50,
    "specialAttack": 85,
    "specialDefense": 45,
    "speed": 55,
    "height": 1,
    "weight": 6.4,
    "abilities": [
      "chlorophyll",
      "gluttony"
    ],
    "flavorText": "It spits out POISONPOWDER to immobilize the enemy and then finishes it with a spray of ACID."
  },
  {
    "id": 71,
    "name": "victreebel",
    "types": [
      "grass",
      "poison"
    ],
    "hp": 80,
    "attack": 105,
    "defense": 65,
    "specialAttack": 100,
    "specialDefense": 70,
    "speed": 70,
    "height": 1.7,
    "weight": 15.5,
    "abilities": [
      "chlorophyll",
      "gluttony"
    ],
    "flavorText": "Said to live in huge colonies deep in jungles, although no one has ever returned from there."
  },
  {
    "id": 72,
    "name": "tentacool",
    "types": [
      "water",
      "poison"
    ],
    "hp": 40,
    "attack": 40,
    "defense": 35,
    "specialAttack": 50,
    "specialDefense": 100,
    "speed": 70,
    "height": 0.9,
    "weight": 45.5,
    "abilities": [
      "clear body",
      "liquid ooze",
      "rain dish"
    ],
    "flavorText": "Drifts in shallow seas. Anglers who hook them by accident are often punished by its stinging acid."
  },
  {
    "id": 73,
    "name": "tentacruel",
    "types": [
      "water",
      "poison"
    ],
    "hp": 80,
    "attack": 70,
    "defense": 65,
    "specialAttack": 80,
    "specialDefense": 120,
    "speed": 100,
    "height": 1.6,
    "weight": 55,
    "abilities": [
      "clear body",
      "liquid ooze",
      "rain dish"
    ],
    "flavorText": "The tentacles are normally kept short. On hunts, they are extended to ensnare and immobilize prey."
  },
  {
    "id": 74,
    "name": "geodude",
    "types": [
      "rock",
      "ground"
    ],
    "hp": 40,
    "attack": 80,
    "defense": 100,
    "specialAttack": 30,
    "specialDefense": 30,
    "speed": 20,
    "height": 0.4,
    "weight": 20,
    "abilities": [
      "rock head",
      "sturdy",
      "sand veil"
    ],
    "flavorText": "Found in fields and mountains. Mistaking them for boulders, people often step or trip on them."
  },
  {
    "id": 75,
    "name": "graveler",
    "types": [
      "rock",
      "ground"
    ],
    "hp": 55,
    "attack": 95,
    "defense": 115,
    "specialAttack": 45,
    "specialDefense": 45,
    "speed": 35,
    "height": 1,
    "weight": 105,
    "abilities": [
      "rock head",
      "sturdy",
      "sand veil"
    ],
    "flavorText": "Rolls down slopes to move. It rolls over any obstacle without slowing or changing its direction."
  },
  {
    "id": 76,
    "name": "golem",
    "types": [
      "rock",
      "ground"
    ],
    "hp": 80,
    "attack": 120,
    "defense": 130,
    "specialAttack": 55,
    "specialDefense": 65,
    "speed": 45,
    "height": 1.4,
    "weight": 300,
    "abilities": [
      "rock head",
      "sturdy",
      "sand veil"
    ],
    "flavorText": "Its boulder-like body is extremely hard. It can easily withstand dynamite blasts without damage."
  },
  {
    "id": 77,
    "name": "ponyta",
    "types": [
      "fire"
    ],
    "hp": 50,
    "attack": 85,
    "defense": 55,
    "specialAttack": 65,
    "specialDefense": 65,
    "speed": 90,
    "height": 1,
    "weight": 30,
    "abilities": [
      "run away",
      "flash fire",
      "flame body"
    ],
    "flavorText": "Its hooves are 10 times harder than diamonds. It can trample anything completely flat in little time."
  },
  {
    "id": 78,
    "name": "rapidash",
    "types": [
      "fire"
    ],
    "hp": 65,
    "attack": 100,
    "defense": 70,
    "specialAttack": 80,
    "specialDefense": 80,
    "speed": 105,
    "height": 1.7,
    "weight": 95,
    "abilities": [
      "run away",
      "flash fire",
      "flame body"
    ],
    "flavorText": "Very competitive, this POKéMON will chase anything that moves fast in the hopes of racing it."
  },
  {
    "id": 79,
    "name": "slowpoke",
    "types": [
      "water",
      "psychic"
    ],
    "hp": 90,
    "attack": 65,
    "defense": 65,
    "specialAttack": 40,
    "specialDefense": 40,
    "speed": 15,
    "height": 1.2,
    "weight": 36,
    "abilities": [
      "oblivious",
      "own tempo",
      "regenerator"
    ],
    "flavorText": "Incredibly slow and dopey. It takes 5 seconds for it to feel pain when under attack."
  },
  {
    "id": 80,
    "name": "slowbro",
    "types": [
      "water",
      "psychic"
    ],
    "hp": 95,
    "attack": 75,
    "defense": 110,
    "specialAttack": 100,
    "specialDefense": 80,
    "speed": 30,
    "height": 1.6,
    "weight": 78.5,
    "abilities": [
      "oblivious",
      "own tempo",
      "regenerator"
    ],
    "flavorText": "The SHELLDER that is latched onto SLOWPOKE's tail is said to feed on the host's left over scraps."
  },
  {
    "id": 81,
    "name": "magnemite",
    "types": [
      "electric",
      "steel"
    ],
    "hp": 25,
    "attack": 35,
    "defense": 70,
    "specialAttack": 95,
    "specialDefense": 55,
    "speed": 45,
    "height": 0.3,
    "weight": 6,
    "abilities": [
      "magnet pull",
      "sturdy",
      "analytic"
    ],
    "flavorText": "Uses anti-gravity to stay suspended. Appears without warning and uses THUNDER WAVE and similar moves."
  },
  {
    "id": 82,
    "name": "magneton",
    "types": [
      "electric",
      "steel"
    ],
    "hp": 50,
    "attack": 60,
    "defense": 95,
    "specialAttack": 120,
    "specialDefense": 70,
    "speed": 70,
    "height": 1,
    "weight": 60,
    "abilities": [
      "magnet pull",
      "sturdy",
      "analytic"
    ],
    "flavorText": "Formed by several MAGNEMITEs linked together. They frequently appear when sunspots flare up."
  },
  {
    "id": 83,
    "name": "farfetchd",
    "types": [
      "normal",
      "flying"
    ],
    "hp": 52,
    "attack": 90,
    "defense": 55,
    "specialAttack": 58,
    "specialDefense": 62,
    "speed": 60,
    "height": 0.8,
    "weight": 15,
    "abilities": [
      "keen eye",
      "inner focus",
      "defiant"
    ],
    "flavorText": "The sprig of green onions it holds is its weapon. It is used much like a metal sword."
  },
  {
    "id": 84,
    "name": "doduo",
    "types": [
      "normal",
      "flying"
    ],
    "hp": 35,
    "attack": 85,
    "defense": 45,
    "specialAttack": 35,
    "specialDefense": 35,
    "speed": 75,
    "height": 1.4,
    "weight": 39.2,
    "abilities": [
      "run away",
      "early bird",
      "tangled feet"
    ],
    "flavorText": "A bird that makes up for its poor flying with its fast foot speed. Leaves giant footprints."
  },
  {
    "id": 85,
    "name": "dodrio",
    "types": [
      "normal",
      "flying"
    ],
    "hp": 60,
    "attack": 110,
    "defense": 70,
    "specialAttack": 60,
    "specialDefense": 60,
    "speed": 110,
    "height": 1.8,
    "weight": 85.2,
    "abilities": [
      "run away",
      "early bird",
      "tangled feet"
    ],
    "flavorText": "Uses its three brains to execute complex plans. While two heads sleep, one head stays awake."
  },
  {
    "id": 86,
    "name": "seel",
    "types": [
      "water"
    ],
    "hp": 65,
    "attack": 45,
    "defense": 55,
    "specialAttack": 45,
    "specialDefense": 70,
    "speed": 45,
    "height": 1.1,
    "weight": 90,
    "abilities": [
      "thick fat",
      "hydration",
      "ice body"
    ],
    "flavorText": "The protruding horn on its head is very hard. It is used for bashing through thick ice."
  },
  {
    "id": 87,
    "name": "dewgong",
    "types": [
      "water",
      "ice"
    ],
    "hp": 90,
    "attack": 70,
    "defense": 80,
    "specialAttack": 70,
    "specialDefense": 95,
    "speed": 70,
    "height": 1.7,
    "weight": 120,
    "abilities": [
      "thick fat",
      "hydration",
      "ice body"
    ],
    "flavorText": "Stores thermal energy in its body. Swims at a steady 8 knots even in intensely cold waters."
  },
  {
    "id": 88,
    "name": "grimer",
    "types": [
      "poison"
    ],
    "hp": 80,
    "attack": 80,
    "defense": 50,
    "specialAttack": 40,
    "specialDefense": 50,
    "speed": 25,
    "height": 0.9,
    "weight": 30,
    "abilities": [
      "stench",
      "sticky hold",
      "poison touch"
    ],
    "flavorText": "Appears in filthy areas. Thrives by sucking up polluted sludge that is pumped out of factories."
  },
  {
    "id": 89,
    "name": "muk",
    "types": [
      "poison"
    ],
    "hp": 105,
    "attack": 105,
    "defense": 75,
    "specialAttack": 65,
    "specialDefense": 100,
    "speed": 50,
    "height": 1.2,
    "weight": 30,
    "abilities": [
      "stench",
      "sticky hold",
      "poison touch"
    ],
    "flavorText": "Thickly covered with a filthy, vile sludge. It is so toxic, even its footprints contain poison."
  },
  {
    "id": 90,
    "name": "shellder",
    "types": [
      "water"
    ],
    "hp": 30,
    "attack": 65,
    "defense": 100,
    "specialAttack": 45,
    "specialDefense": 25,
    "speed": 40,
    "height": 0.3,
    "weight": 4,
    "abilities": [
      "shell armor",
      "skill link",
      "overcoat"
    ],
    "flavorText": "Its hard shell repels any kind of attack. It is vulnerable only when its shell is open."
  },
  {
    "id": 91,
    "name": "cloyster",
    "types": [
      "water",
      "ice"
    ],
    "hp": 50,
    "attack": 95,
    "defense": 180,
    "specialAttack": 85,
    "specialDefense": 45,
    "speed": 70,
    "height": 1.5,
    "weight": 132.5,
    "abilities": [
      "shell armor",
      "skill link",
      "overcoat"
    ],
    "flavorText": "When attacked, it launches its horns in quick volleys. Its innards have never been seen."
  },
  {
    "id": 92,
    "name": "gastly",
    "types": [
      "ghost",
      "poison"
    ],
    "hp": 30,
    "attack": 35,
    "defense": 30,
    "specialAttack": 100,
    "specialDefense": 35,
    "speed": 80,
    "height": 1.3,
    "weight": 0.1,
    "abilities": [
      "levitate"
    ],
    "flavorText": "Almost invisible, this gaseous POKéMON cloaks the target and puts it to sleep without notice."
  },
  {
    "id": 93,
    "name": "haunter",
    "types": [
      "ghost",
      "poison"
    ],
    "hp": 45,
    "attack": 50,
    "defense": 45,
    "specialAttack": 115,
    "specialDefense": 55,
    "speed": 95,
    "height": 1.6,
    "weight": 0.1,
    "abilities": [
      "levitate"
    ],
    "flavorText": "Because of its ability to slip through block walls, it is said to be from an­ other dimension."
  },
  {
    "id": 94,
    "name": "gengar",
    "types": [
      "ghost",
      "poison"
    ],
    "hp": 60,
    "attack": 65,
    "defense": 60,
    "specialAttack": 130,
    "specialDefense": 75,
    "speed": 110,
    "height": 1.5,
    "weight": 40.5,
    "abilities": [
      "cursed body"
    ],
    "flavorText": "Under a full moon, this POKéMON likes to mimic the shadows of people and laugh at their fright."
  },
  {
    "id": 95,
    "name": "onix",
    "types": [
      "rock",
      "ground"
    ],
    "hp": 35,
    "attack": 45,
    "defense": 160,
    "specialAttack": 30,
    "specialDefense": 45,
    "speed": 70,
    "height": 8.8,
    "weight": 210,
    "abilities": [
      "rock head",
      "sturdy",
      "weak armor"
    ],
    "flavorText": "As it grows, the stone portions of its body harden to become similar to a diamond, but colored black."
  },
  {
    "id": 96,
    "name": "drowzee",
    "types": [
      "psychic"
    ],
    "hp": 60,
    "attack": 48,
    "defense": 45,
    "specialAttack": 43,
    "specialDefense": 90,
    "speed": 42,
    "height": 1,
    "weight": 32.4,
    "abilities": [
      "insomnia",
      "forewarn",
      "inner focus"
    ],
    "flavorText": "Puts enemies to sleep then eats their dreams. Occasionally gets sick from eating bad dreams."
  },
  {
    "id": 97,
    "name": "hypno",
    "types": [
      "psychic"
    ],
    "hp": 85,
    "attack": 73,
    "defense": 70,
    "specialAttack": 73,
    "specialDefense": 115,
    "speed": 67,
    "height": 1.6,
    "weight": 75.6,
    "abilities": [
      "insomnia",
      "forewarn",
      "inner focus"
    ],
    "flavorText": "When it locks eyes with an enemy, it will use a mix of PSI moves such as HYPNOSIS and CONFUSION."
  },
  {
    "id": 98,
    "name": "krabby",
    "types": [
      "water"
    ],
    "hp": 30,
    "attack": 105,
    "defense": 90,
    "specialAttack": 25,
    "specialDefense": 25,
    "speed": 50,
    "height": 0.4,
    "weight": 6.5,
    "abilities": [
      "hyper cutter",
      "shell armor",
      "sheer force"
    ],
    "flavorText": "Its pincers are not only powerful weapons, they are used for balance when walking sideways."
  },
  {
    "id": 99,
    "name": "kingler",
    "types": [
      "water"
    ],
    "hp": 55,
    "attack": 130,
    "defense": 115,
    "specialAttack": 50,
    "specialDefense": 50,
    "speed": 75,
    "height": 1.3,
    "weight": 60,
    "abilities": [
      "hyper cutter",
      "shell armor",
      "sheer force"
    ],
    "flavorText": "The large pincer has 10000 hp of crushing power. However, its huge size makes it unwieldy to use."
  },
  {
    "id": 100,
    "name": "voltorb",
    "types": [
      "electric"
    ],
    "hp": 40,
    "attack": 30,
    "defense": 50,
    "specialAttack": 55,
    "specialDefense": 55,
    "speed": 100,
    "height": 0.5,
    "weight": 10.4,
    "abilities": [
      "soundproof",
      "static",
      "aftermath"
    ],
    "flavorText": "Usually found in power plants. Easily mistaken for a POKé BALL, they have zapped many people."
  },
  {
    "id": 101,
    "name": "electrode",
    "types": [
      "electric"
    ],
    "hp": 60,
    "attack": 50,
    "defense": 70,
    "specialAttack": 80,
    "specialDefense": 80,
    "speed": 150,
    "height": 1.2,
    "weight": 66.6,
    "abilities": [
      "soundproof",
      "static",
      "aftermath"
    ],
    "flavorText": "It stores electric energy under very high pressure. It often explodes with little or no provocation."
  },
  {
    "id": 102,
    "name": "exeggcute",
    "types": [
      "grass",
      "psychic"
    ],
    "hp": 60,
    "attack": 40,
    "defense": 80,
    "specialAttack": 60,
    "specialDefense": 45,
    "speed": 40,
    "height": 0.4,
    "weight": 2.5,
    "abilities": [
      "chlorophyll",
      "harvest"
    ],
    "flavorText": "Often mistaken for eggs. When disturbed, they quickly gather and attack in swarms."
  },
  {
    "id": 103,
    "name": "exeggutor",
    "types": [
      "grass",
      "psychic"
    ],
    "hp": 95,
    "attack": 95,
    "defense": 85,
    "specialAttack": 125,
    "specialDefense": 75,
    "speed": 55,
    "height": 2,
    "weight": 120,
    "abilities": [
      "chlorophyll",
      "harvest"
    ],
    "flavorText": "Legend has it that on rare occasions, one of its heads will drop off and continue on as an EXEGGCUTE."
  },
  {
    "id": 104,
    "name": "cubone",
    "types": [
      "ground"
    ],
    "hp": 50,
    "attack": 50,
    "defense": 95,
    "specialAttack": 40,
    "specialDefense": 50,
    "speed": 35,
    "height": 0.4,
    "weight": 6.5,
    "abilities": [
      "rock head",
      "lightning rod",
      "battle armor"
    ],
    "flavorText": "Because it never removes its skull helmet, no one has ever seen this POKéMON's real face."
  },
  {
    "id": 105,
    "name": "marowak",
    "types": [
      "ground"
    ],
    "hp": 60,
    "attack": 80,
    "defense": 110,
    "specialAttack": 50,
    "specialDefense": 80,
    "speed": 45,
    "height": 1,
    "weight": 45,
    "abilities": [
      "rock head",
      "lightning rod",
      "battle armor"
    ],
    "flavorText": "The bone it holds is its key weapon. It throws the bone skillfully like a boomerang to KO targets."
  },
  {
    "id": 106,
    "name": "hitmonlee",
    "types": [
      "fighting"
    ],
    "hp": 50,
    "attack": 120,
    "defense": 53,
    "specialAttack": 35,
    "specialDefense": 110,
    "speed": 87,
    "height": 1.5,
    "weight": 49.8,
    "abilities": [
      "limber",
      "reckless",
      "unburden"
    ],
    "flavorText": "When in a hurry, its legs lengthen progressively. It runs smoothly with extra long, loping strides."
  },
  {
    "id": 107,
    "name": "hitmonchan",
    "types": [
      "fighting"
    ],
    "hp": 50,
    "attack": 105,
    "defense": 79,
    "specialAttack": 35,
    "specialDefense": 110,
    "speed": 76,
    "height": 1.4,
    "weight": 50.2,
    "abilities": [
      "keen eye",
      "iron fist",
      "inner focus"
    ],
    "flavorText": "While apparently doing nothing, it fires punches in lightning fast volleys that are impossible to see."
  },
  {
    "id": 108,
    "name": "lickitung",
    "types": [
      "normal"
    ],
    "hp": 90,
    "attack": 55,
    "defense": 75,
    "specialAttack": 60,
    "specialDefense": 75,
    "speed": 30,
    "height": 1.2,
    "weight": 65.5,
    "abilities": [
      "own tempo",
      "oblivious",
      "cloud nine"
    ],
    "flavorText": "Its tongue can be extended like a chameleon's. It leaves a tingling sensation when it licks enemies."
  },
  {
    "id": 109,
    "name": "koffing",
    "types": [
      "poison"
    ],
    "hp": 40,
    "attack": 65,
    "defense": 95,
    "specialAttack": 60,
    "specialDefense": 45,
    "speed": 35,
    "height": 0.6,
    "weight": 1,
    "abilities": [
      "levitate",
      "neutralizing gas",
      "stench"
    ],
    "flavorText": "Because it stores several kinds of toxic gases in its body, it is prone to exploding without warning."
  },
  {
    "id": 110,
    "name": "weezing",
    "types": [
      "poison"
    ],
    "hp": 65,
    "attack": 90,
    "defense": 120,
    "specialAttack": 85,
    "specialDefense": 70,
    "speed": 60,
    "height": 1.2,
    "weight": 9.5,
    "abilities": [
      "levitate",
      "neutralizing gas",
      "stench"
    ],
    "flavorText": "Where two kinds of poison gases meet, 2 KOFFINGs can fuse into a WEEZING over many years."
  },
  {
    "id": 111,
    "name": "rhyhorn",
    "types": [
      "ground",
      "rock"
    ],
    "hp": 80,
    "attack": 85,
    "defense": 95,
    "specialAttack": 30,
    "specialDefense": 30,
    "speed": 25,
    "height": 1,
    "weight": 115,
    "abilities": [
      "lightning rod",
      "rock head",
      "reckless"
    ],
    "flavorText": "Its massive bones are 1000 times harder than human bones. It can easily knock a trailer flying."
  },
  {
    "id": 112,
    "name": "rhydon",
    "types": [
      "ground",
      "rock"
    ],
    "hp": 105,
    "attack": 130,
    "defense": 120,
    "specialAttack": 45,
    "specialDefense": 45,
    "speed": 40,
    "height": 1.9,
    "weight": 120,
    "abilities": [
      "lightning rod",
      "rock head",
      "reckless"
    ],
    "flavorText": "Protected by an armor-like hide, it is capable of living in molten lava of 3,600 degrees."
  },
  {
    "id": 113,
    "name": "chansey",
    "types": [
      "normal"
    ],
    "hp": 250,
    "attack": 5,
    "defense": 5,
    "specialAttack": 35,
    "specialDefense": 105,
    "speed": 50,
    "height": 1.1,
    "weight": 34.6,
    "abilities": [
      "natural cure",
      "serene grace",
      "healer"
    ],
    "flavorText": "A rare and elusive POKéMON that is said to bring happiness to those who manage to get it."
  },
  {
    "id": 114,
    "name": "tangela",
    "types": [
      "grass"
    ],
    "hp": 65,
    "attack": 55,
    "defense": 115,
    "specialAttack": 100,
    "specialDefense": 40,
    "speed": 60,
    "height": 1,
    "weight": 35,
    "abilities": [
      "chlorophyll",
      "leaf guard",
      "regenerator"
    ],
    "flavorText": "The whole body is swathed with wide vines that are similar to sea­ weed. Its vines shake as it walks."
  },
  {
    "id": 115,
    "name": "kangaskhan",
    "types": [
      "normal"
    ],
    "hp": 105,
    "attack": 95,
    "defense": 80,
    "specialAttack": 40,
    "specialDefense": 80,
    "speed": 90,
    "height": 2.2,
    "weight": 80,
    "abilities": [
      "early bird",
      "scrappy",
      "inner focus"
    ],
    "flavorText": "The infant rarely ventures out of its mother's protective pouch until it is 3 years old."
  },
  {
    "id": 116,
    "name": "horsea",
    "types": [
      "water"
    ],
    "hp": 30,
    "attack": 40,
    "defense": 70,
    "specialAttack": 70,
    "specialDefense": 25,
    "speed": 60,
    "height": 0.4,
    "weight": 8,
    "abilities": [
      "swift swim",
      "sniper",
      "damp"
    ],
    "flavorText": "Known to shoot down flying bugs with precision blasts of ink from the surface of the water."
  },
  {
    "id": 117,
    "name": "seadra",
    "types": [
      "water"
    ],
    "hp": 55,
    "attack": 65,
    "defense": 95,
    "specialAttack": 95,
    "specialDefense": 45,
    "speed": 85,
    "height": 1.2,
    "weight": 25,
    "abilities": [
      "poison point",
      "sniper",
      "damp"
    ],
    "flavorText": "Capable of swim­ ming backwards by rapidly flapping its wing-like pectoral fins and stout tail."
  },
  {
    "id": 118,
    "name": "goldeen",
    "types": [
      "water"
    ],
    "hp": 45,
    "attack": 67,
    "defense": 60,
    "specialAttack": 35,
    "specialDefense": 50,
    "speed": 63,
    "height": 0.6,
    "weight": 15,
    "abilities": [
      "swift swim",
      "water veil",
      "lightning rod"
    ],
    "flavorText": "Its tail fin billows like an elegant ballroom dress, giving it the nickname of the Water Queen."
  },
  {
    "id": 119,
    "name": "seaking",
    "types": [
      "water"
    ],
    "hp": 80,
    "attack": 92,
    "defense": 65,
    "specialAttack": 65,
    "specialDefense": 80,
    "speed": 68,
    "height": 1.3,
    "weight": 39,
    "abilities": [
      "swift swim",
      "water veil",
      "lightning rod"
    ],
    "flavorText": "In the autumn spawning season, they can be seen swimming power­ fully up rivers and creeks."
  },
  {
    "id": 120,
    "name": "staryu",
    "types": [
      "water"
    ],
    "hp": 30,
    "attack": 45,
    "defense": 55,
    "specialAttack": 70,
    "specialDefense": 55,
    "speed": 85,
    "height": 0.8,
    "weight": 34.5,
    "abilities": [
      "illuminate",
      "natural cure",
      "analytic"
    ],
    "flavorText": "An enigmatic POKéMON that can effortlessly regenerate any appendage it loses in battle."
  },
  {
    "id": 121,
    "name": "starmie",
    "types": [
      "water",
      "psychic"
    ],
    "hp": 60,
    "attack": 75,
    "defense": 85,
    "specialAttack": 100,
    "specialDefense": 85,
    "speed": 115,
    "height": 1.1,
    "weight": 80,
    "abilities": [
      "illuminate",
      "natural cure",
      "analytic"
    ],
    "flavorText": "Its central core glows with the seven colors of the rainbow. Some people value the core as a gem."
  },
  {
    "id": 122,
    "name": "mr-mime",
    "types": [
      "psychic",
      "fairy"
    ],
    "hp": 40,
    "attack": 45,
    "defense": 65,
    "specialAttack": 100,
    "specialDefense": 120,
    "speed": 90,
    "height": 1.3,
    "weight": 54.5,
    "abilities": [
      "soundproof",
      "filter",
      "technician"
    ],
    "flavorText": "If interrupted while it is miming, it will slap around the offender with its broad hands."
  },
  {
    "id": 123,
    "name": "scyther",
    "types": [
      "bug",
      "flying"
    ],
    "hp": 70,
    "attack": 110,
    "defense": 80,
    "specialAttack": 55,
    "specialDefense": 80,
    "speed": 105,
    "height": 1.5,
    "weight": 56,
    "abilities": [
      "swarm",
      "technician",
      "steadfast"
    ],
    "flavorText": "With ninja-like agility and speed, it can create the illusion that there is more than one."
  },
  {
    "id": 124,
    "name": "jynx",
    "types": [
      "ice",
      "psychic"
    ],
    "hp": 65,
    "attack": 50,
    "defense": 35,
    "specialAttack": 115,
    "specialDefense": 95,
    "speed": 95,
    "height": 1.4,
    "weight": 40.6,
    "abilities": [
      "oblivious",
      "forewarn",
      "dry skin"
    ],
    "flavorText": "It seductively wiggles its hips as it walks. It can cause people to dance in unison with it."
  },
  {
    "id": 125,
    "name": "electabuzz",
    "types": [
      "electric"
    ],
    "hp": 65,
    "attack": 83,
    "defense": 57,
    "specialAttack": 95,
    "specialDefense": 85,
    "speed": 105,
    "height": 1.1,
    "weight": 30,
    "abilities": [
      "static",
      "vital spirit"
    ],
    "flavorText": "Normally found near power plants, they can wander away and cause major blackouts in cities."
  },
  {
    "id": 126,
    "name": "magmar",
    "types": [
      "fire"
    ],
    "hp": 65,
    "attack": 95,
    "defense": 57,
    "specialAttack": 100,
    "specialDefense": 85,
    "speed": 93,
    "height": 1.3,
    "weight": 44.5,
    "abilities": [
      "flame body",
      "vital spirit"
    ],
    "flavorText": "Its body always burns with an orange glow that enables it to hide perfectly among flames."
  },
  {
    "id": 127,
    "name": "pinsir",
    "types": [
      "bug"
    ],
    "hp": 65,
    "attack": 125,
    "defense": 100,
    "specialAttack": 55,
    "specialDefense": 70,
    "speed": 85,
    "height": 1.5,
    "weight": 55,
    "abilities": [
      "hyper cutter",
      "mold breaker",
      "moxie"
    ],
    "flavorText": "If it fails to crush the victim in its pincers, it will swing it around and toss it hard."
  },
  {
    "id": 128,
    "name": "tauros",
    "types": [
      "normal"
    ],
    "hp": 75,
    "attack": 100,
    "defense": 95,
    "specialAttack": 40,
    "specialDefense": 70,
    "speed": 110,
    "height": 1.4,
    "weight": 88.4,
    "abilities": [
      "intimidate",
      "anger point",
      "sheer force"
    ],
    "flavorText": "When it targets an enemy, it charges furiously while whipping its body with its long tails."
  },
  {
    "id": 129,
    "name": "magikarp",
    "types": [
      "water"
    ],
    "hp": 20,
    "attack": 10,
    "defense": 55,
    "specialAttack": 15,
    "specialDefense": 20,
    "speed": 80,
    "height": 0.9,
    "weight": 10,
    "abilities": [
      "swift swim",
      "rattled"
    ],
    "flavorText": "In the distant past, it was somewhat stronger than the horribly weak descendants that exist today."
  },
  {
    "id": 130,
    "name": "gyarados",
    "types": [
      "water",
      "flying"
    ],
    "hp": 95,
    "attack": 125,
    "defense": 79,
    "specialAttack": 60,
    "specialDefense": 100,
    "speed": 81,
    "height": 6.5,
    "weight": 235,
    "abilities": [
      "intimidate",
      "moxie"
    ],
    "flavorText": "Rarely seen in the wild. Huge and vicious, it is capable of destroying entire cities in a rage."
  },
  {
    "id": 131,
    "name": "lapras",
    "types": [
      "water",
      "ice"
    ],
    "hp": 130,
    "attack": 85,
    "defense": 80,
    "specialAttack": 85,
    "specialDefense": 95,
    "speed": 60,
    "height": 2.5,
    "weight": 220,
    "abilities": [
      "water absorb",
      "shell armor",
      "hydration"
    ],
    "flavorText": "A POKéMON that has been over­ hunted almost to extinction. It can ferry people across the water."
  },
  {
    "id": 132,
    "name": "ditto",
    "types": [
      "normal"
    ],
    "hp": 48,
    "attack": 48,
    "defense": 48,
    "specialAttack": 48,
    "specialDefense": 48,
    "speed": 48,
    "height": 0.3,
    "weight": 4,
    "abilities": [
      "limber",
      "imposter"
    ],
    "flavorText": "Capable of copying an enemy's genetic code to instantly transform itself into a duplicate of the enemy."
  },
  {
    "id": 133,
    "name": "eevee",
    "types": [
      "normal"
    ],
    "hp": 55,
    "attack": 55,
    "defense": 50,
    "specialAttack": 45,
    "specialDefense": 65,
    "speed": 55,
    "height": 0.3,
    "weight": 6.5,
    "abilities": [
      "run away",
      "adaptability",
      "anticipation"
    ],
    "flavorText": "Its genetic code is irregular. It may mutate if it is exposed to radiation from element STONEs."
  },
  {
    "id": 134,
    "name": "vaporeon",
    "types": [
      "water"
    ],
    "hp": 130,
    "attack": 65,
    "defense": 60,
    "specialAttack": 110,
    "specialDefense": 95,
    "speed": 65,
    "height": 1,
    "weight": 29,
    "abilities": [
      "water absorb",
      "hydration"
    ],
    "flavorText": "Lives close to water. Its long tail is ridged with a fin which is often mistaken for a mermaid's."
  },
  {
    "id": 135,
    "name": "jolteon",
    "types": [
      "electric"
    ],
    "hp": 65,
    "attack": 65,
    "defense": 60,
    "specialAttack": 110,
    "specialDefense": 95,
    "speed": 130,
    "height": 0.8,
    "weight": 24.5,
    "abilities": [
      "volt absorb",
      "quick feet"
    ],
    "flavorText": "It accumulates negative ions in the atmosphere to blast out 10000- volt lightning bolts."
  },
  {
    "id": 136,
    "name": "flareon",
    "types": [
      "fire"
    ],
    "hp": 65,
    "attack": 130,
    "defense": 60,
    "specialAttack": 95,
    "specialDefense": 110,
    "speed": 65,
    "height": 0.9,
    "weight": 25,
    "abilities": [
      "flash fire",
      "guts"
    ],
    "flavorText": "When storing thermal energy in its body, its temperature could soar to over 1600 degrees."
  },
  {
    "id": 137,
    "name": "porygon",
    "types": [
      "normal"
    ],
    "hp": 65,
    "attack": 60,
    "defense": 70,
    "specialAttack": 85,
    "specialDefense": 75,
    "speed": 40,
    "height": 0.8,
    "weight": 36.5,
    "abilities": [
      "trace",
      "download",
      "analytic"
    ],
    "flavorText": "A POKéMON that consists entirely of programming code. Capable of moving freely in cyberspace."
  },
  {
    "id": 138,
    "name": "omanyte",
    "types": [
      "rock",
      "water"
    ],
    "hp": 35,
    "attack": 40,
    "defense": 100,
    "specialAttack": 90,
    "specialDefense": 55,
    "speed": 35,
    "height": 0.4,
    "weight": 7.5,
    "abilities": [
      "swift swim",
      "shell armor",
      "weak armor"
    ],
    "flavorText": "Although long extinct, in rare cases, it can be genetically resurrected from fossils."
  },
  {
    "id": 139,
    "name": "omastar",
    "types": [
      "rock",
      "water"
    ],
    "hp": 70,
    "attack": 60,
    "defense": 125,
    "specialAttack": 115,
    "specialDefense": 70,
    "speed": 55,
    "height": 1,
    "weight": 35,
    "abilities": [
      "swift swim",
      "shell armor",
      "weak armor"
    ],
    "flavorText": "A prehistoric POKéMON that died out when its heavy shell made it impossible to catch prey."
  },
  {
    "id": 140,
    "name": "kabuto",
    "types": [
      "rock",
      "water"
    ],
    "hp": 30,
    "attack": 80,
    "defense": 90,
    "specialAttack": 55,
    "specialDefense": 45,
    "speed": 55,
    "height": 0.5,
    "weight": 11.5,
    "abilities": [
      "swift swim",
      "battle armor",
      "weak armor"
    ],
    "flavorText": "A POKéMON that was resurrected from a fossil found in what was once the ocean floor eons ago."
  },
  {
    "id": 141,
    "name": "kabutops",
    "types": [
      "rock",
      "water"
    ],
    "hp": 60,
    "attack": 115,
    "defense": 105,
    "specialAttack": 65,
    "specialDefense": 70,
    "speed": 80,
    "height": 1.3,
    "weight": 40.5,
    "abilities": [
      "swift swim",
      "battle armor",
      "weak armor"
    ],
    "flavorText": "Its sleek shape is perfect for swim­ ming. It slashes prey with its claws and drains the body fluids."
  },
  {
    "id": 142,
    "name": "aerodactyl",
    "types": [
      "rock",
      "flying"
    ],
    "hp": 80,
    "attack": 105,
    "defense": 65,
    "specialAttack": 60,
    "specialDefense": 75,
    "speed": 130,
    "height": 1.8,
    "weight": 59,
    "abilities": [
      "rock head",
      "pressure",
      "unnerve"
    ],
    "flavorText": "A ferocious, pre­ historic POKéMON that goes for the enemy's throat with its serrated saw-like fangs."
  },
  {
    "id": 143,
    "name": "snorlax",
    "types": [
      "normal"
    ],
    "hp": 160,
    "attack": 110,
    "defense": 65,
    "specialAttack": 65,
    "specialDefense": 110,
    "speed": 30,
    "height": 2.1,
    "weight": 460,
    "abilities": [
      "immunity",
      "thick fat",
      "gluttony"
    ],
    "flavorText": "Very lazy. Just eats and sleeps. As its rotund bulk builds, it becomes steadily more slothful."
  },
  {
    "id": 144,
    "name": "articuno",
    "types": [
      "ice",
      "flying"
    ],
    "hp": 90,
    "attack": 85,
    "defense": 100,
    "specialAttack": 95,
    "specialDefense": 125,
    "speed": 85,
    "height": 1.7,
    "weight": 55.4,
    "abilities": [
      "pressure",
      "snow cloak"
    ],
    "flavorText": "A legendary bird POKéMON that is said to appear to doomed people who are lost in icy mountains."
  },
  {
    "id": 145,
    "name": "zapdos",
    "types": [
      "electric",
      "flying"
    ],
    "hp": 90,
    "attack": 90,
    "defense": 85,
    "specialAttack": 125,
    "specialDefense": 90,
    "speed": 100,
    "height": 1.6,
    "weight": 52.6,
    "abilities": [
      "pressure",
      "static"
    ],
    "flavorText": "A legendary bird POKéMON that is said to appear from clouds while dropping enormous lightning bolts."
  },
  {
    "id": 146,
    "name": "moltres",
    "types": [
      "fire",
      "flying"
    ],
    "hp": 90,
    "attack": 100,
    "defense": 90,
    "specialAttack": 125,
    "specialDefense": 85,
    "speed": 90,
    "height": 2,
    "weight": 60,
    "abilities": [
      "pressure",
      "flame body"
    ],
    "flavorText": "Known as the legendary bird of fire. Every flap of its wings creates a dazzling flash of flames."
  },
  {
    "id": 147,
    "name": "dratini",
    "types": [
      "dragon"
    ],
    "hp": 41,
    "attack": 64,
    "defense": 45,
    "specialAttack": 50,
    "specialDefense": 50,
    "speed": 50,
    "height": 1.8,
    "weight": 3.3,
    "abilities": [
      "shed skin",
      "marvel scale"
    ],
    "flavorText": "Long considered a mythical POKéMON until recently when a small colony was found living underwater."
  },
  {
    "id": 148,
    "name": "dragonair",
    "types": [
      "dragon"
    ],
    "hp": 61,
    "attack": 84,
    "defense": 65,
    "specialAttack": 70,
    "specialDefense": 70,
    "speed": 70,
    "height": 4,
    "weight": 16.5,
    "abilities": [
      "shed skin",
      "marvel scale"
    ],
    "flavorText": "A mystical POKéMON that exudes a gentle aura. Has the ability to change climate conditions."
  },
  {
    "id": 149,
    "name": "dragonite",
    "types": [
      "dragon",
      "flying"
    ],
    "hp": 91,
    "attack": 134,
    "defense": 95,
    "specialAttack": 100,
    "specialDefense": 100,
    "speed": 80,
    "height": 2.2,
    "weight": 210,
    "abilities": [
      "inner focus",
      "multiscale"
    ],
    "flavorText": "An extremely rarely seen marine POKéMON. Its intelligence is said to match that of humans."
  },
  {
    "id": 150,
    "name": "mewtwo",
    "types": [
      "psychic"
    ],
    "hp": 106,
    "attack": 110,
    "defense": 90,
    "specialAttack": 154,
    "specialDefense": 90,
    "speed": 130,
    "height": 2,
    "weight": 122,
    "abilities": [
      "pressure",
      "unnerve"
    ],
    "flavorText": "It was created by a scientist after years of horrific gene splicing and DNA engineering experiments."
  },
  {
    "id": 151,
    "name": "mew",
    "types": [
      "psychic"
    ],
    "hp": 100,
    "attack": 100,
    "defense": 100,
    "specialAttack": 100,
    "specialDefense": 100,
    "speed": 100,
    "height": 0.4,
    "weight": 4,
    "abilities": [
      "synchronize"
    ],
    "flavorText": "So rare that it is still said to be a mirage by many experts. Only a few people have seen it worldwide."
  }
];

const EVOLUTION_CHAINS: Record<number, Array<{ id: number; name: string }>> = {
  "1": [
    {
      "id": 1,
      "name": "bulbasaur"
    },
    {
      "id": 2,
      "name": "ivysaur"
    },
    {
      "id": 3,
      "name": "venusaur"
    }
  ],
  "2": [
    {
      "id": 1,
      "name": "bulbasaur"
    },
    {
      "id": 2,
      "name": "ivysaur"
    },
    {
      "id": 3,
      "name": "venusaur"
    }
  ],
  "3": [
    {
      "id": 1,
      "name": "bulbasaur"
    },
    {
      "id": 2,
      "name": "ivysaur"
    },
    {
      "id": 3,
      "name": "venusaur"
    }
  ],
  "4": [
    {
      "id": 4,
      "name": "charmander"
    },
    {
      "id": 5,
      "name": "charmeleon"
    },
    {
      "id": 6,
      "name": "charizard"
    }
  ],
  "5": [
    {
      "id": 4,
      "name": "charmander"
    },
    {
      "id": 5,
      "name": "charmeleon"
    },
    {
      "id": 6,
      "name": "charizard"
    }
  ],
  "6": [
    {
      "id": 4,
      "name": "charmander"
    },
    {
      "id": 5,
      "name": "charmeleon"
    },
    {
      "id": 6,
      "name": "charizard"
    }
  ],
  "7": [
    {
      "id": 7,
      "name": "squirtle"
    },
    {
      "id": 8,
      "name": "wartortle"
    },
    {
      "id": 9,
      "name": "blastoise"
    }
  ],
  "8": [
    {
      "id": 7,
      "name": "squirtle"
    },
    {
      "id": 8,
      "name": "wartortle"
    },
    {
      "id": 9,
      "name": "blastoise"
    }
  ],
  "9": [
    {
      "id": 7,
      "name": "squirtle"
    },
    {
      "id": 8,
      "name": "wartortle"
    },
    {
      "id": 9,
      "name": "blastoise"
    }
  ],
  "10": [
    {
      "id": 10,
      "name": "caterpie"
    },
    {
      "id": 11,
      "name": "metapod"
    },
    {
      "id": 12,
      "name": "butterfree"
    }
  ],
  "11": [
    {
      "id": 10,
      "name": "caterpie"
    },
    {
      "id": 11,
      "name": "metapod"
    },
    {
      "id": 12,
      "name": "butterfree"
    }
  ],
  "12": [
    {
      "id": 10,
      "name": "caterpie"
    },
    {
      "id": 11,
      "name": "metapod"
    },
    {
      "id": 12,
      "name": "butterfree"
    }
  ],
  "13": [
    {
      "id": 13,
      "name": "weedle"
    },
    {
      "id": 14,
      "name": "kakuna"
    },
    {
      "id": 15,
      "name": "beedrill"
    }
  ],
  "14": [
    {
      "id": 13,
      "name": "weedle"
    },
    {
      "id": 14,
      "name": "kakuna"
    },
    {
      "id": 15,
      "name": "beedrill"
    }
  ],
  "15": [
    {
      "id": 13,
      "name": "weedle"
    },
    {
      "id": 14,
      "name": "kakuna"
    },
    {
      "id": 15,
      "name": "beedrill"
    }
  ],
  "16": [
    {
      "id": 16,
      "name": "pidgey"
    },
    {
      "id": 17,
      "name": "pidgeotto"
    },
    {
      "id": 18,
      "name": "pidgeot"
    }
  ],
  "17": [
    {
      "id": 16,
      "name": "pidgey"
    },
    {
      "id": 17,
      "name": "pidgeotto"
    },
    {
      "id": 18,
      "name": "pidgeot"
    }
  ],
  "18": [
    {
      "id": 16,
      "name": "pidgey"
    },
    {
      "id": 17,
      "name": "pidgeotto"
    },
    {
      "id": 18,
      "name": "pidgeot"
    }
  ],
  "19": [
    {
      "id": 19,
      "name": "rattata"
    },
    {
      "id": 20,
      "name": "raticate"
    }
  ],
  "20": [
    {
      "id": 19,
      "name": "rattata"
    },
    {
      "id": 20,
      "name": "raticate"
    }
  ],
  "21": [
    {
      "id": 21,
      "name": "spearow"
    },
    {
      "id": 22,
      "name": "fearow"
    }
  ],
  "22": [
    {
      "id": 21,
      "name": "spearow"
    },
    {
      "id": 22,
      "name": "fearow"
    }
  ],
  "23": [
    {
      "id": 23,
      "name": "ekans"
    },
    {
      "id": 24,
      "name": "arbok"
    }
  ],
  "24": [
    {
      "id": 23,
      "name": "ekans"
    },
    {
      "id": 24,
      "name": "arbok"
    }
  ],
  "25": [
    {
      "id": 25,
      "name": "pikachu"
    },
    {
      "id": 26,
      "name": "raichu"
    }
  ],
  "26": [
    {
      "id": 25,
      "name": "pikachu"
    },
    {
      "id": 26,
      "name": "raichu"
    }
  ],
  "27": [
    {
      "id": 27,
      "name": "sandshrew"
    },
    {
      "id": 28,
      "name": "sandslash"
    }
  ],
  "28": [
    {
      "id": 27,
      "name": "sandshrew"
    },
    {
      "id": 28,
      "name": "sandslash"
    }
  ],
  "29": [
    {
      "id": 29,
      "name": "nidoran-f"
    },
    {
      "id": 30,
      "name": "nidorina"
    },
    {
      "id": 31,
      "name": "nidoqueen"
    }
  ],
  "30": [
    {
      "id": 29,
      "name": "nidoran-f"
    },
    {
      "id": 30,
      "name": "nidorina"
    },
    {
      "id": 31,
      "name": "nidoqueen"
    }
  ],
  "31": [
    {
      "id": 29,
      "name": "nidoran-f"
    },
    {
      "id": 30,
      "name": "nidorina"
    },
    {
      "id": 31,
      "name": "nidoqueen"
    }
  ],
  "32": [
    {
      "id": 32,
      "name": "nidoran-m"
    },
    {
      "id": 33,
      "name": "nidorino"
    },
    {
      "id": 34,
      "name": "nidoking"
    }
  ],
  "33": [
    {
      "id": 32,
      "name": "nidoran-m"
    },
    {
      "id": 33,
      "name": "nidorino"
    },
    {
      "id": 34,
      "name": "nidoking"
    }
  ],
  "34": [
    {
      "id": 32,
      "name": "nidoran-m"
    },
    {
      "id": 33,
      "name": "nidorino"
    },
    {
      "id": 34,
      "name": "nidoking"
    }
  ],
  "35": [
    {
      "id": 35,
      "name": "clefairy"
    },
    {
      "id": 36,
      "name": "clefable"
    }
  ],
  "36": [
    {
      "id": 35,
      "name": "clefairy"
    },
    {
      "id": 36,
      "name": "clefable"
    }
  ],
  "37": [
    {
      "id": 37,
      "name": "vulpix"
    },
    {
      "id": 38,
      "name": "ninetales"
    }
  ],
  "38": [
    {
      "id": 37,
      "name": "vulpix"
    },
    {
      "id": 38,
      "name": "ninetales"
    }
  ],
  "39": [
    {
      "id": 39,
      "name": "jigglypuff"
    },
    {
      "id": 40,
      "name": "wigglytuff"
    }
  ],
  "40": [
    {
      "id": 39,
      "name": "jigglypuff"
    },
    {
      "id": 40,
      "name": "wigglytuff"
    }
  ],
  "41": [
    {
      "id": 41,
      "name": "zubat"
    },
    {
      "id": 42,
      "name": "golbat"
    }
  ],
  "42": [
    {
      "id": 41,
      "name": "zubat"
    },
    {
      "id": 42,
      "name": "golbat"
    }
  ],
  "43": [
    {
      "id": 43,
      "name": "oddish"
    },
    {
      "id": 44,
      "name": "gloom"
    },
    {
      "id": 45,
      "name": "vileplume"
    }
  ],
  "44": [
    {
      "id": 43,
      "name": "oddish"
    },
    {
      "id": 44,
      "name": "gloom"
    },
    {
      "id": 45,
      "name": "vileplume"
    }
  ],
  "45": [
    {
      "id": 43,
      "name": "oddish"
    },
    {
      "id": 44,
      "name": "gloom"
    },
    {
      "id": 45,
      "name": "vileplume"
    }
  ],
  "46": [
    {
      "id": 46,
      "name": "paras"
    },
    {
      "id": 47,
      "name": "parasect"
    }
  ],
  "47": [
    {
      "id": 46,
      "name": "paras"
    },
    {
      "id": 47,
      "name": "parasect"
    }
  ],
  "48": [
    {
      "id": 48,
      "name": "venonat"
    },
    {
      "id": 49,
      "name": "venomoth"
    }
  ],
  "49": [
    {
      "id": 48,
      "name": "venonat"
    },
    {
      "id": 49,
      "name": "venomoth"
    }
  ],
  "50": [
    {
      "id": 50,
      "name": "diglett"
    },
    {
      "id": 51,
      "name": "dugtrio"
    }
  ],
  "51": [
    {
      "id": 50,
      "name": "diglett"
    },
    {
      "id": 51,
      "name": "dugtrio"
    }
  ],
  "52": [
    {
      "id": 52,
      "name": "meowth"
    },
    {
      "id": 53,
      "name": "persian"
    }
  ],
  "53": [
    {
      "id": 52,
      "name": "meowth"
    },
    {
      "id": 53,
      "name": "persian"
    }
  ],
  "54": [
    {
      "id": 54,
      "name": "psyduck"
    },
    {
      "id": 55,
      "name": "golduck"
    }
  ],
  "55": [
    {
      "id": 54,
      "name": "psyduck"
    },
    {
      "id": 55,
      "name": "golduck"
    }
  ],
  "56": [
    {
      "id": 56,
      "name": "mankey"
    },
    {
      "id": 57,
      "name": "primeape"
    }
  ],
  "57": [
    {
      "id": 56,
      "name": "mankey"
    },
    {
      "id": 57,
      "name": "primeape"
    }
  ],
  "58": [
    {
      "id": 58,
      "name": "growlithe"
    },
    {
      "id": 59,
      "name": "arcanine"
    }
  ],
  "59": [
    {
      "id": 58,
      "name": "growlithe"
    },
    {
      "id": 59,
      "name": "arcanine"
    }
  ],
  "60": [
    {
      "id": 60,
      "name": "poliwag"
    },
    {
      "id": 61,
      "name": "poliwhirl"
    },
    {
      "id": 62,
      "name": "poliwrath"
    }
  ],
  "61": [
    {
      "id": 60,
      "name": "poliwag"
    },
    {
      "id": 61,
      "name": "poliwhirl"
    },
    {
      "id": 62,
      "name": "poliwrath"
    }
  ],
  "62": [
    {
      "id": 60,
      "name": "poliwag"
    },
    {
      "id": 61,
      "name": "poliwhirl"
    },
    {
      "id": 62,
      "name": "poliwrath"
    }
  ],
  "63": [
    {
      "id": 63,
      "name": "abra"
    },
    {
      "id": 64,
      "name": "kadabra"
    },
    {
      "id": 65,
      "name": "alakazam"
    }
  ],
  "64": [
    {
      "id": 63,
      "name": "abra"
    },
    {
      "id": 64,
      "name": "kadabra"
    },
    {
      "id": 65,
      "name": "alakazam"
    }
  ],
  "65": [
    {
      "id": 63,
      "name": "abra"
    },
    {
      "id": 64,
      "name": "kadabra"
    },
    {
      "id": 65,
      "name": "alakazam"
    }
  ],
  "66": [
    {
      "id": 66,
      "name": "machop"
    },
    {
      "id": 67,
      "name": "machoke"
    },
    {
      "id": 68,
      "name": "machamp"
    }
  ],
  "67": [
    {
      "id": 66,
      "name": "machop"
    },
    {
      "id": 67,
      "name": "machoke"
    },
    {
      "id": 68,
      "name": "machamp"
    }
  ],
  "68": [
    {
      "id": 66,
      "name": "machop"
    },
    {
      "id": 67,
      "name": "machoke"
    },
    {
      "id": 68,
      "name": "machamp"
    }
  ],
  "69": [
    {
      "id": 69,
      "name": "bellsprout"
    },
    {
      "id": 70,
      "name": "weepinbell"
    },
    {
      "id": 71,
      "name": "victreebel"
    }
  ],
  "70": [
    {
      "id": 69,
      "name": "bellsprout"
    },
    {
      "id": 70,
      "name": "weepinbell"
    },
    {
      "id": 71,
      "name": "victreebel"
    }
  ],
  "71": [
    {
      "id": 69,
      "name": "bellsprout"
    },
    {
      "id": 70,
      "name": "weepinbell"
    },
    {
      "id": 71,
      "name": "victreebel"
    }
  ],
  "72": [
    {
      "id": 72,
      "name": "tentacool"
    },
    {
      "id": 73,
      "name": "tentacruel"
    }
  ],
  "73": [
    {
      "id": 72,
      "name": "tentacool"
    },
    {
      "id": 73,
      "name": "tentacruel"
    }
  ],
  "74": [
    {
      "id": 74,
      "name": "geodude"
    },
    {
      "id": 75,
      "name": "graveler"
    },
    {
      "id": 76,
      "name": "golem"
    }
  ],
  "75": [
    {
      "id": 74,
      "name": "geodude"
    },
    {
      "id": 75,
      "name": "graveler"
    },
    {
      "id": 76,
      "name": "golem"
    }
  ],
  "76": [
    {
      "id": 74,
      "name": "geodude"
    },
    {
      "id": 75,
      "name": "graveler"
    },
    {
      "id": 76,
      "name": "golem"
    }
  ],
  "77": [
    {
      "id": 77,
      "name": "ponyta"
    },
    {
      "id": 78,
      "name": "rapidash"
    }
  ],
  "78": [
    {
      "id": 77,
      "name": "ponyta"
    },
    {
      "id": 78,
      "name": "rapidash"
    }
  ],
  "79": [
    {
      "id": 79,
      "name": "slowpoke"
    },
    {
      "id": 80,
      "name": "slowbro"
    }
  ],
  "80": [
    {
      "id": 79,
      "name": "slowpoke"
    },
    {
      "id": 80,
      "name": "slowbro"
    }
  ],
  "81": [
    {
      "id": 81,
      "name": "magnemite"
    },
    {
      "id": 82,
      "name": "magneton"
    }
  ],
  "82": [
    {
      "id": 81,
      "name": "magnemite"
    },
    {
      "id": 82,
      "name": "magneton"
    }
  ],
  "83": [
    {
      "id": 83,
      "name": "farfetchd"
    }
  ],
  "84": [
    {
      "id": 84,
      "name": "doduo"
    },
    {
      "id": 85,
      "name": "dodrio"
    }
  ],
  "85": [
    {
      "id": 84,
      "name": "doduo"
    },
    {
      "id": 85,
      "name": "dodrio"
    }
  ],
  "86": [
    {
      "id": 86,
      "name": "seel"
    },
    {
      "id": 87,
      "name": "dewgong"
    }
  ],
  "87": [
    {
      "id": 86,
      "name": "seel"
    },
    {
      "id": 87,
      "name": "dewgong"
    }
  ],
  "88": [
    {
      "id": 88,
      "name": "grimer"
    },
    {
      "id": 89,
      "name": "muk"
    }
  ],
  "89": [
    {
      "id": 88,
      "name": "grimer"
    },
    {
      "id": 89,
      "name": "muk"
    }
  ],
  "90": [
    {
      "id": 90,
      "name": "shellder"
    },
    {
      "id": 91,
      "name": "cloyster"
    }
  ],
  "91": [
    {
      "id": 90,
      "name": "shellder"
    },
    {
      "id": 91,
      "name": "cloyster"
    }
  ],
  "92": [
    {
      "id": 92,
      "name": "gastly"
    },
    {
      "id": 93,
      "name": "haunter"
    },
    {
      "id": 94,
      "name": "gengar"
    }
  ],
  "93": [
    {
      "id": 92,
      "name": "gastly"
    },
    {
      "id": 93,
      "name": "haunter"
    },
    {
      "id": 94,
      "name": "gengar"
    }
  ],
  "94": [
    {
      "id": 92,
      "name": "gastly"
    },
    {
      "id": 93,
      "name": "haunter"
    },
    {
      "id": 94,
      "name": "gengar"
    }
  ],
  "95": [
    {
      "id": 95,
      "name": "onix"
    }
  ],
  "96": [
    {
      "id": 96,
      "name": "drowzee"
    },
    {
      "id": 97,
      "name": "hypno"
    }
  ],
  "97": [
    {
      "id": 96,
      "name": "drowzee"
    },
    {
      "id": 97,
      "name": "hypno"
    }
  ],
  "98": [
    {
      "id": 98,
      "name": "krabby"
    },
    {
      "id": 99,
      "name": "kingler"
    }
  ],
  "99": [
    {
      "id": 98,
      "name": "krabby"
    },
    {
      "id": 99,
      "name": "kingler"
    }
  ],
  "100": [
    {
      "id": 100,
      "name": "voltorb"
    },
    {
      "id": 101,
      "name": "electrode"
    }
  ],
  "101": [
    {
      "id": 100,
      "name": "voltorb"
    },
    {
      "id": 101,
      "name": "electrode"
    }
  ],
  "102": [
    {
      "id": 102,
      "name": "exeggcute"
    },
    {
      "id": 103,
      "name": "exeggutor"
    }
  ],
  "103": [
    {
      "id": 102,
      "name": "exeggcute"
    },
    {
      "id": 103,
      "name": "exeggutor"
    }
  ],
  "104": [
    {
      "id": 104,
      "name": "cubone"
    },
    {
      "id": 105,
      "name": "marowak"
    }
  ],
  "105": [
    {
      "id": 104,
      "name": "cubone"
    },
    {
      "id": 105,
      "name": "marowak"
    }
  ],
  "106": [
    {
      "id": 106,
      "name": "hitmonlee"
    },
    {
      "id": 107,
      "name": "hitmonchan"
    }
  ],
  "107": [
    {
      "id": 106,
      "name": "hitmonlee"
    },
    {
      "id": 107,
      "name": "hitmonchan"
    }
  ],
  "108": [
    {
      "id": 108,
      "name": "lickitung"
    }
  ],
  "109": [
    {
      "id": 109,
      "name": "koffing"
    },
    {
      "id": 110,
      "name": "weezing"
    }
  ],
  "110": [
    {
      "id": 109,
      "name": "koffing"
    },
    {
      "id": 110,
      "name": "weezing"
    }
  ],
  "111": [
    {
      "id": 111,
      "name": "rhyhorn"
    },
    {
      "id": 112,
      "name": "rhydon"
    }
  ],
  "112": [
    {
      "id": 111,
      "name": "rhyhorn"
    },
    {
      "id": 112,
      "name": "rhydon"
    }
  ],
  "113": [
    {
      "id": 113,
      "name": "chansey"
    }
  ],
  "114": [
    {
      "id": 114,
      "name": "tangela"
    }
  ],
  "115": [
    {
      "id": 115,
      "name": "kangaskhan"
    }
  ],
  "116": [
    {
      "id": 116,
      "name": "horsea"
    },
    {
      "id": 117,
      "name": "seadra"
    }
  ],
  "117": [
    {
      "id": 116,
      "name": "horsea"
    },
    {
      "id": 117,
      "name": "seadra"
    }
  ],
  "118": [
    {
      "id": 118,
      "name": "goldeen"
    },
    {
      "id": 119,
      "name": "seaking"
    }
  ],
  "119": [
    {
      "id": 118,
      "name": "goldeen"
    },
    {
      "id": 119,
      "name": "seaking"
    }
  ],
  "120": [
    {
      "id": 120,
      "name": "staryu"
    },
    {
      "id": 121,
      "name": "starmie"
    }
  ],
  "121": [
    {
      "id": 120,
      "name": "staryu"
    },
    {
      "id": 121,
      "name": "starmie"
    }
  ],
  "122": [
    {
      "id": 122,
      "name": "mr-mime"
    }
  ],
  "123": [
    {
      "id": 123,
      "name": "scyther"
    }
  ],
  "124": [
    {
      "id": 124,
      "name": "jynx"
    }
  ],
  "125": [
    {
      "id": 125,
      "name": "electabuzz"
    }
  ],
  "126": [
    {
      "id": 126,
      "name": "magmar"
    }
  ],
  "127": [
    {
      "id": 127,
      "name": "pinsir"
    }
  ],
  "128": [
    {
      "id": 128,
      "name": "tauros"
    }
  ],
  "129": [
    {
      "id": 129,
      "name": "magikarp"
    },
    {
      "id": 130,
      "name": "gyarados"
    }
  ],
  "130": [
    {
      "id": 129,
      "name": "magikarp"
    },
    {
      "id": 130,
      "name": "gyarados"
    }
  ],
  "131": [
    {
      "id": 131,
      "name": "lapras"
    }
  ],
  "132": [
    {
      "id": 132,
      "name": "ditto"
    }
  ],
  "133": [
    {
      "id": 133,
      "name": "eevee"
    },
    {
      "id": 134,
      "name": "vaporeon"
    },
    {
      "id": 135,
      "name": "jolteon"
    },
    {
      "id": 136,
      "name": "flareon"
    }
  ],
  "134": [
    {
      "id": 133,
      "name": "eevee"
    },
    {
      "id": 134,
      "name": "vaporeon"
    },
    {
      "id": 135,
      "name": "jolteon"
    },
    {
      "id": 136,
      "name": "flareon"
    }
  ],
  "135": [
    {
      "id": 133,
      "name": "eevee"
    },
    {
      "id": 134,
      "name": "vaporeon"
    },
    {
      "id": 135,
      "name": "jolteon"
    },
    {
      "id": 136,
      "name": "flareon"
    }
  ],
  "136": [
    {
      "id": 133,
      "name": "eevee"
    },
    {
      "id": 134,
      "name": "vaporeon"
    },
    {
      "id": 135,
      "name": "jolteon"
    },
    {
      "id": 136,
      "name": "flareon"
    }
  ],
  "137": [
    {
      "id": 137,
      "name": "porygon"
    }
  ],
  "138": [
    {
      "id": 138,
      "name": "omanyte"
    },
    {
      "id": 139,
      "name": "omastar"
    }
  ],
  "139": [
    {
      "id": 138,
      "name": "omanyte"
    },
    {
      "id": 139,
      "name": "omastar"
    }
  ],
  "140": [
    {
      "id": 140,
      "name": "kabuto"
    },
    {
      "id": 141,
      "name": "kabutops"
    }
  ],
  "141": [
    {
      "id": 140,
      "name": "kabuto"
    },
    {
      "id": 141,
      "name": "kabutops"
    }
  ],
  "142": [
    {
      "id": 142,
      "name": "aerodactyl"
    }
  ],
  "143": [
    {
      "id": 143,
      "name": "snorlax"
    }
  ],
  "144": [
    {
      "id": 144,
      "name": "articuno"
    }
  ],
  "145": [
    {
      "id": 145,
      "name": "zapdos"
    }
  ],
  "146": [
    {
      "id": 146,
      "name": "moltres"
    }
  ],
  "147": [
    {
      "id": 147,
      "name": "dratini"
    },
    {
      "id": 148,
      "name": "dragonair"
    },
    {
      "id": 149,
      "name": "dragonite"
    }
  ],
  "148": [
    {
      "id": 147,
      "name": "dratini"
    },
    {
      "id": 148,
      "name": "dragonair"
    },
    {
      "id": 149,
      "name": "dragonite"
    }
  ],
  "149": [
    {
      "id": 147,
      "name": "dratini"
    },
    {
      "id": 148,
      "name": "dragonair"
    },
    {
      "id": 149,
      "name": "dragonite"
    }
  ],
  "150": [
    {
      "id": 150,
      "name": "mewtwo"
    }
  ],
  "151": [
    {
      "id": 151,
      "name": "mew"
    }
  ]
};

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
      frontShiny: `${SHINY_SPRITE_BASE_URL}/${raw.id}.png`,
      animatedShiny: `${ANIMATED_SHINY_BASE_URL}/${raw.id}.gif`,
    },
    generation: 1,
    flavorText: raw.flavorText,
    cryUrl: `${CRY_BASE_URL}/${raw.id}.ogg`,
    evolutionChain: EVOLUTION_CHAINS[raw.id] || [{ id: raw.id, name: raw.name }],
  };
}

export const SEEDED_POKEMON: Pokemon[] = RAW_SEEDED_POKEMON.map(mapRawToPokemon);