import { randomUUID } from 'crypto';
import { PokemonService } from './PokemonService';
import { PokemonTeam, PokemonTypeName } from '../domain/pokemon.types';
import { ALL_POKEMON_TYPES, calculateDefenseMultiplier } from '../utils/typeChart';
import { CreateTeamInput, UpdateTeamInput } from '../schemas/pokemon.schemas';
import { NotFoundError, BadRequestError } from '../utils/errors';

export class TeamService {
  private teams: Map<string, PokemonTeam> = new Map();

  constructor(private pokemonService: PokemonService) {
    this.seedDefaultTeam();
  }

  private async seedDefaultTeam(): Promise<void> {
    try {
      const p1 = await this.pokemonService.getPokemonByIdOrName(25); // Pikachu
      const p2 = await this.pokemonService.getPokemonByIdOrName(6); // Charizard
      const p3 = await this.pokemonService.getPokemonByIdOrName(9); // Blastoise
      const p4 = await this.pokemonService.getPokemonByIdOrName(3); // Venusaur
      const p5 = await this.pokemonService.getPokemonByIdOrName(94); // Gengar
      const p6 = await this.pokemonService.getPokemonByIdOrName(149); // Dragonite

      const team = this.buildTeamObject(
        'team-kanto-champions',
        'Kanto Champions',
        'Balanced team with diverse elemental coverage and iconic starters.',
        [
          { pokemonId: p1.id, pokemon: p1, order: 1, nickname: 'Sparky' },
          { pokemonId: p2.id, pokemon: p2, order: 2, nickname: 'Blaze' },
          { pokemonId: p3.id, pokemon: p3, order: 3, nickname: 'Shellshocker' },
          { pokemonId: p4.id, pokemon: p4, order: 4, nickname: 'Flora' },
          { pokemonId: p5.id, pokemon: p5, order: 5, nickname: 'Shadow' },
          { pokemonId: p6.id, pokemon: p6, order: 6, nickname: 'Draco' },
        ]
      );
      this.teams.set(team.id, team);
    } catch {
      // Ignore if seeding fails
    }
  }

  private buildTeamObject(
    id: string,
    name: string,
    description: string | undefined,
    members: Array<{ pokemonId: number; pokemon: any; order: number; nickname?: string }>
  ): PokemonTeam {
    // Unique type coverage (all types present in team)
    const typeSet = new Set<PokemonTypeName>();
    members.forEach((m) => m.pokemon.types.forEach((t: PokemonTypeName) => typeSet.add(t)));
    const typeCoverage = Array.from(typeSet);

    // Calculate vulnerability frequency: how many team members are weak to each attack type
    const teamWeaknesses: Record<PokemonTypeName, number> = {} as any;
    for (const attackType of ALL_POKEMON_TYPES) {
      let weakCount = 0;
      for (const member of members) {
        const mult = calculateDefenseMultiplier(attackType, member.pokemon.types);
        if (mult > 1) {
          weakCount++;
        }
      }
      teamWeaknesses[attackType] = weakCount;
    }

    const now = new Date().toISOString();
    return {
      id,
      name,
      description,
      members,
      typeCoverage,
      teamWeaknesses,
      createdAt: now,
      updatedAt: now,
    };
  }

  public async getAllTeams(): Promise<PokemonTeam[]> {
    return Array.from(this.teams.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public async getTeamById(id: string): Promise<PokemonTeam> {
    const team = this.teams.get(id);
    if (!team) {
      throw new NotFoundError(`Team with id "${id}" not found`);
    }
    return team;
  }

  public async createTeam(input: CreateTeamInput): Promise<PokemonTeam> {
    if (input.members.length > 6) {
      throw new BadRequestError('A Pokémon team cannot exceed 6 members');
    }

    const loadedMembers = await Promise.all(
      input.members.map(async (m, index) => {
        const pokemon = await this.pokemonService.getPokemonByIdOrName(m.pokemonId);
        return {
          pokemonId: pokemon.id,
          pokemon,
          nickname: m.nickname,
          order: index + 1,
        };
      })
    );

    const id = `team-${randomUUID().slice(0, 8)}`;
    const team = this.buildTeamObject(id, input.name, input.description, loadedMembers);
    this.teams.set(id, team);
    return team;
  }

  public async updateTeam(id: string, input: UpdateTeamInput): Promise<PokemonTeam> {
    const existing = await this.getTeamById(id);

    let members = existing.members;
    if (input.members) {
      if (input.members.length > 6) {
        throw new BadRequestError('A Pokémon team cannot exceed 6 members');
      }

      members = await Promise.all(
        input.members.map(async (m, index) => {
          const pokemon = await this.pokemonService.getPokemonByIdOrName(m.pokemonId);
          return {
            pokemonId: pokemon.id,
            pokemon,
            nickname: m.nickname,
            order: index + 1,
          };
        })
      );
    }

    const updated = this.buildTeamObject(
      id,
      input.name || existing.name,
      input.description !== undefined ? input.description : existing.description,
      members
    );
    updated.createdAt = existing.createdAt;
    this.teams.set(id, updated);
    return updated;
  }

  public async deleteTeam(id: string): Promise<void> {
    const exists = this.teams.has(id);
    if (!exists) {
      throw new NotFoundError(`Team with id "${id}" not found`);
    }
    this.teams.delete(id);
  }
}
