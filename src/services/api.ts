import {
  Pokemon,
  PokemonTeam,
  PokemonTypeName,
  TypeMatchup,
  BattleSimulationResult,
  TeamBattleSimulationResult,
} from '../types';

const API_BASE = '/api/v1';

export async function fetchHealth(): Promise<{ status: string; uptime: number; service: string }> {
  const res = await fetch('/health');
  if (!res.ok) throw new Error('Health check failed');
  return res.json();
}

export async function fetchPokemonList(params: {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  ids?: string;
  sortBy?: string;
  order?: string;
}): Promise<{
  data: Pokemon[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
}> {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set('page', String(params.page));
  if (params.limit) searchParams.set('limit', String(params.limit));
  if (params.search) searchParams.set('search', params.search);
  if (params.type) searchParams.set('type', params.type);
  if (params.ids) searchParams.set('ids', params.ids);
  if (params.sortBy) searchParams.set('sortBy', params.sortBy);
  if (params.order) searchParams.set('order', params.order);

  const res = await fetch(`${API_BASE}/pokemon?${searchParams.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch Pokémon list');
  const json = await res.json();
  return { data: json.data, pagination: json.pagination };
}

export async function fetchPokemonDetail(identifier: string | number): Promise<Pokemon> {
  const res = await fetch(`${API_BASE}/pokemon/${identifier}`);
  if (!res.ok) throw new Error('Failed to fetch Pokémon details');
  const json = await res.json();
  return json.data;
}

export async function fetchPokemonMatchup(
  identifier: string | number
): Promise<{ pokemon: Pokemon; matchup: TypeMatchup }> {
  const res = await fetch(`${API_BASE}/pokemon/${identifier}/matchup`);
  if (!res.ok) throw new Error('Failed to fetch Pokémon matchup');
  const json = await res.json();
  return json.data;
}

export async function fetchTypes(): Promise<PokemonTypeName[]> {
  const res = await fetch(`${API_BASE}/pokemon/types`);
  if (!res.ok) throw new Error('Failed to fetch types');
  const json = await res.json();
  return json.data;
}

export async function fetchRandomPokemon(count = 1): Promise<Pokemon[]> {
  const res = await fetch(`${API_BASE}/pokemon/random?count=${count}`);
  if (!res.ok) throw new Error('Failed to fetch random Pokémon');
  const json = await res.json();
  return json.data;
}

export async function fetchTeams(): Promise<PokemonTeam[]> {
  const res = await fetch(`${API_BASE}/teams`);
  if (!res.ok) throw new Error('Failed to fetch teams');
  const json = await res.json();
  return json.data;
}

export async function createTeam(payload: {
  name: string;
  description?: string;
  members: Array<{ pokemonId: number; nickname?: string }>;
}): Promise<PokemonTeam> {
  const res = await fetch(`${API_BASE}/teams`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error?.message || 'Failed to create team');
  }
  const json = await res.json();
  return json.data;
}

export async function updateTeam(
  id: string,
  payload: {
    name?: string;
    description?: string;
    members?: Array<{ pokemonId: number; nickname?: string }>;
  }
): Promise<PokemonTeam> {
  const res = await fetch(`${API_BASE}/teams/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error?.message || 'Failed to update team');
  }
  const json = await res.json();
  return json.data;
}

export async function deleteTeam(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/teams/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete team');
}

export async function simulateBattle(payload: {
  pokemon1Id: number;
  pokemon2Id: number;
}): Promise<BattleSimulationResult> {
  const res = await fetch(`${API_BASE}/battle/simulate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error?.message || 'Battle simulation failed');
  }
  const json = await res.json();
  return json.data;
}

export async function simulateTeamBattle(payload: {
  team1: { name: string; pokemonIds: number[] };
  team2: { name: string; pokemonIds: number[] };
}): Promise<TeamBattleSimulationResult> {
  const res = await fetch(`${API_BASE}/battle/simulate-team`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error?.message || 'Team battle simulation failed');
  }
  const json = await res.json();
  return json.data;
}
