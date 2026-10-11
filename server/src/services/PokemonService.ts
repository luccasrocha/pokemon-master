import NodeCache from 'node-cache';
import {
  Pokemon,
  PokemonTypeName,
  TypeMatchup,
} from '../domain/pokemon.types';
import {
  SEEDED_POKEMON,
  POKEMON_SPRITE_BASE_URL,
  OFFICIAL_ARTWORK_BASE_URL,
  ANIMATED_SPRITE_BASE_URL,
  SHINY_SPRITE_BASE_URL,
  ANIMATED_SHINY_BASE_URL,
  CRY_BASE_URL,
} from '../data/seedPokemon';
import { calculateTypeMatchup } from '../utils/typeChart';
import { NotFoundError } from '../utils/errors';
import { ListPokemonQuery } from '../schemas/pokemon.schemas';

export class PokemonService {
  private cache: NodeCache;
  private localDb: Map<number, Pokemon> = new Map();
  private nameIndex: Map<string, number> = new Map();

  constructor() {
    // 1-hour cache TTL
    this.cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });
    this.initializeDatabase();
  }

  private initializeDatabase(): void {
    for (const p of SEEDED_POKEMON) {
      this.localDb.set(p.id, p);
      this.nameIndex.set(p.name.toLowerCase(), p.id);
    }
  }

  public async getPokemonList(query: ListPokemonQuery) {
    const { page, limit, search, type, sortBy, order, ids } = query;

    // Start with all seeded Pokémon
    let items = Array.from(this.localDb.values());

    // Filter by search string
    if (search) {
      const term = search.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.id.toString() === term ||
          p.formattedName.toLowerCase().includes(term)
      );
    }

    // Filter by type
    if (type) {
      items = items.filter((p) => p.types.includes(type as PokemonTypeName));
    }

    if (ids) {
      const requestedIds = new Set(ids.split(',').map(Number));
      items = items.filter((p) => requestedIds.has(p.id));
    }

    // Sorting
    items.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'hp':
          comparison = a.stats.hp - b.stats.hp;
          break;
        case 'attack':
          comparison = a.stats.attack - b.stats.attack;
          break;
        case 'defense':
          comparison = a.stats.defense - b.stats.defense;
          break;
        case 'speed':
          comparison = a.stats.speed - b.stats.speed;
          break;
        case 'total':
          comparison = a.stats.total - b.stats.total;
          break;
        case 'id':
        default:
          comparison = a.id - b.id;
          break;
      }
      return order === 'desc' ? -comparison : comparison;
    });

    const totalCount = items.length;
    const totalPages = Math.ceil(totalCount / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginatedItems = items.slice(startIndex, startIndex + limit);

    return {
      results: paginatedItems,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  public async getPokemonByIdOrName(identifier: string | number): Promise<Pokemon> {
    const key = String(identifier).trim().toLowerCase();
    const cacheKey = `pokemon:${key}`;

    const cached = this.cache.get<Pokemon>(cacheKey);
    if (cached) return cached;

    // Check local DB by numeric ID
    const numId = Number(key);
    if (!isNaN(numId) && this.localDb.has(numId)) {
      const p = this.localDb.get(numId)!;
      this.cache.set(cacheKey, p);
      return p;
    }

    // Check local DB by name
    if (this.nameIndex.has(key)) {
      const id = this.nameIndex.get(key)!;
      const p = this.localDb.get(id)!;
      this.cache.set(cacheKey, p);
      return p;
    }

    // Attempt to fetch dynamically from PokeAPI if not found locally
    try {
      const fetched = await this.fetchFromExternalPokeApi(key);
      if (fetched) {
        this.localDb.set(fetched.id, fetched);
        this.nameIndex.set(fetched.name.toLowerCase(), fetched.id);
        this.cache.set(cacheKey, fetched);
        return fetched;
      }
    } catch {
      // Fallback to not found error
    }

    throw new NotFoundError(`Pokémon with identifier "${identifier}" not found`);
  }

  private async fetchFromExternalPokeApi(idOrName: string): Promise<Pokemon | null> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`, {
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!res.ok) return null;

      const data: any = await res.json();

      const hp = data.stats.find((s: any) => s.stat.name === 'hp')?.base_stat || 50;
      const attack = data.stats.find((s: any) => s.stat.name === 'attack')?.base_stat || 50;
      const defense = data.stats.find((s: any) => s.stat.name === 'defense')?.base_stat || 50;
      const specialAttack =
        data.stats.find((s: any) => s.stat.name === 'special-attack')?.base_stat || 50;
      const specialDefense =
        data.stats.find((s: any) => s.stat.name === 'special-defense')?.base_stat || 50;
      const speed = data.stats.find((s: any) => s.stat.name === 'speed')?.base_stat || 50;
      const total = hp + attack + defense + specialAttack + specialDefense + speed;

      const types = data.types.map((t: any) => t.type.name as PokemonTypeName);

      const abilities = data.abilities.map((a: any) => ({
        name: a.ability.name.replace('-', ' '),
        isHidden: a.is_hidden,
      }));

      const pokemon: Pokemon = {
        id: data.id,
        name: data.name,
        formattedName: data.name.charAt(0).toUpperCase() + data.name.slice(1),
        types,
        stats: {
          hp,
          attack,
          defense,
          specialAttack,
          specialDefense,
          speed,
          total,
        },
        height: data.height / 10,
        weight: data.weight / 10,
        abilities,
        sprites: {
          frontDefault:
            data.sprites?.front_default || `${POKEMON_SPRITE_BASE_URL}/${data.id}.png`,
          officialArtwork:
            data.sprites?.other?.['official-artwork']?.front_default ||
            `${OFFICIAL_ARTWORK_BASE_URL}/${data.id}.png`,
          animatedFront: `${ANIMATED_SPRITE_BASE_URL}/${data.id}.gif`,
          frontShiny:
            data.sprites?.front_shiny || `${SHINY_SPRITE_BASE_URL}/${data.id}.png`,
          animatedShiny: `${ANIMATED_SHINY_BASE_URL}/${data.id}.gif`,
        },
        generation: Math.min(Math.ceil(data.id / 151), 9),
        cryUrl: `${CRY_BASE_URL}/${data.id}.ogg`,
      };

      return pokemon;
    } catch {
      clearTimeout(timeout);
      return null;
    }
  }

  public async getPokemonMatchup(identifier: string | number): Promise<{
    pokemon: Pokemon;
    matchup: TypeMatchup;
  }> {
    const pokemon = await this.getPokemonByIdOrName(identifier);
    const matchup = calculateTypeMatchup(pokemon.types);
    return { pokemon, matchup };
  }

  public getRandomPokemon(count = 1): Pokemon[] {
    const shuffled = Array.from(this.localDb.values());
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }
}
