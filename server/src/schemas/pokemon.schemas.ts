import { z } from 'zod';
import { ALL_POKEMON_TYPES } from '../utils/typeChart';

const typeEnum = z.enum(ALL_POKEMON_TYPES as [string, ...string[]]);

export const listPokemonQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(250).default(20),
  search: z.string().trim().optional(),
  ids: z.string().regex(/^\d+(,\d+)*$/, 'IDs must be comma-separated positive integers').optional(),
  type: typeEnum.optional(),
  sortBy: z.enum(['id', 'name', 'hp', 'attack', 'defense', 'speed', 'total']).default('id'),
  order: z.enum(['asc', 'desc']).default('asc'),
});

export const pokemonParamSchema = z.object({
  identifier: z.string().trim().min(1, 'Pokemon ID or name is required'),
});

export const randomPokemonQuerySchema = z.object({
  count: z.coerce.number().int().min(1).max(20).default(1),
});

export const createTeamSchema = z.object({
  name: z.string().trim().min(2, 'Team name must have at least 2 characters').max(50),
  description: z.string().trim().max(200).optional(),
  members: z
    .array(
      z.object({
        pokemonId: z.number().int().positive('Pokemon ID must be positive'),
        nickname: z.string().trim().max(30).optional(),
      })
    )
    .min(1, 'Team must have at least 1 Pokémon')
    .max(6, 'A Pokémon team can have at most 6 Pokémon'),
});

export const updateTeamSchema = createTeamSchema.partial();

export const battleSimulationSchema = z.object({
  pokemon1Id: z.coerce.number().int().positive('Fighter 1 ID must be a positive integer'),
  pokemon2Id: z.coerce.number().int().positive('Fighter 2 ID must be a positive integer'),
});

export const teamBattleSimulationSchema = z.object({
  team1: z.object({
    name: z.string().trim().default('Red Team'),
    pokemonIds: z.array(z.coerce.number().int().positive()).min(1).max(6),
  }),
  team2: z.object({
    name: z.string().trim().default('Blue Team'),
    pokemonIds: z.array(z.coerce.number().int().positive()).min(1).max(6),
  }),
});

export type ListPokemonQuery = z.infer<typeof listPokemonQuerySchema>;
export type CreateTeamInput = z.infer<typeof createTeamSchema>;
export type UpdateTeamInput = z.infer<typeof updateTeamSchema>;
export type BattleSimulationInput = z.infer<typeof battleSimulationSchema>;
export type TeamBattleSimulationInput = z.infer<typeof teamBattleSimulationSchema>;
