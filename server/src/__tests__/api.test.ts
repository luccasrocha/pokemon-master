import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { Application } from 'express';
import { createApp } from '../app';

describe('Pokémon Master REST API Suite', () => {
  let app: Application;

  beforeAll(() => {
    process.env.NODE_ENV = 'test';
    app = createApp();
  });

  describe('System Endpoints', () => {
    it('GET /health should return 200 with UP status', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('UP');
      expect(res.body.service).toBe('pokemon-api');
    });

    it('GET / non-existent route should return 404 standardized error', async () => {
      const res = await request(app).get('/api/v1/unknown-route');
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBeDefined();
    });
  });

  describe('Pokémon Endpoints', () => {
    it('GET /api/v1/pokemon should return paginated list', async () => {
      const res = await request(app).get('/api/v1/pokemon?limit=10&page=1');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeLessThanOrEqual(10);
      expect(res.body.pagination).toBeDefined();
      expect(res.body.pagination.totalCount).toBeGreaterThan(0);
    });

    it('GET /api/v1/pokemon?search=pikachu should find Pikachu', async () => {
      const res = await request(app).get('/api/v1/pokemon?search=pikachu');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThanOrEqual(1);
      expect(res.body.data[0].name.toLowerCase()).toBe('pikachu');
    });

    it('GET /api/v1/pokemon?type=fire should only return Fire Pokémon', async () => {
      const res = await request(app).get('/api/v1/pokemon?type=fire');
      expect(res.status).toBe(200);
      res.body.data.forEach((p: any) => {
        expect(p.types).toContain('fire');
      });
    });

    it('GET /api/v1/pokemon/25 should return Pikachu details with stats and sprites', async () => {
      const res = await request(app).get('/api/v1/pokemon/25');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe(25);
      expect(res.body.data.name).toBe('pikachu');
      expect(res.body.data.stats.speed).toBeGreaterThan(0);
      expect(res.body.data.sprites.frontDefault).toBeDefined();
    });

    it('GET /api/v1/pokemon/25/matchup should return weaknesses and resistances', async () => {
      const res = await request(app).get('/api/v1/pokemon/25/matchup');
      expect(res.status).toBe(200);
      expect(res.body.data.matchup).toBeDefined();
      // Electric is weak to Ground
      expect(res.body.data.matchup.weaknesses).toContain('ground');
    });

    it('GET /api/v1/pokemon/types should return list of 18 types', async () => {
      const res = await request(app).get('/api/v1/pokemon/types');
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(18);
    });
  });

  describe('Teams Endpoints', () => {
    it('GET /api/v1/teams should return seeded initial team', async () => {
      const res = await request(app).get('/api/v1/teams');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    });

    it('POST /api/v1/teams should create a valid team with up to 6 members', async () => {
      const payload = {
        name: 'Fire Masters',
        description: 'Blazing speed',
        members: [
          { pokemonId: 4, nickname: 'Charmy' },
          { pokemonId: 6, nickname: 'Mega Zard' },
        ],
      };

      const res = await request(app).post('/api/v1/teams').send(payload);
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Fire Masters');
      expect(res.body.data.members).toHaveLength(2);
      expect(res.body.data.typeCoverage).toContain('fire');
    });

    it('POST /api/v1/teams with more than 6 members should fail validation (400)', async () => {
      const payload = {
        name: 'Illegal Team',
        members: [
          { pokemonId: 1 },
          { pokemonId: 2 },
          { pokemonId: 3 },
          { pokemonId: 4 },
          { pokemonId: 5 },
          { pokemonId: 6 },
          { pokemonId: 7 }, // 7th member is illegal!
        ],
      };

      const res = await request(app).post('/api/v1/teams').send(payload);
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('Battle Simulator Endpoints', () => {
    it('POST /api/v1/battle/simulate should execute simulated battle between two Pokémon', async () => {
      const payload = {
        pokemon1Id: 6, // Charizard (Fire/Flying)
        pokemon2Id: 9, // Blastoise (Water)
      };

      const res = await request(app).post('/api/v1/battle/simulate').send(payload);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.winner).toBeDefined();
      expect(res.body.data.loser).toBeDefined();
      expect(res.body.data.turns.length).toBeGreaterThan(0);
      expect(res.body.data.log.length).toBeGreaterThan(0);
    });

    it('POST /api/v1/battle/simulate-team should execute multi-round battle between two teams', async () => {
      const payload = {
        team1: {
          name: 'Ash Team',
          pokemonIds: [25, 6],
        },
        team2: {
          name: 'Gary Team',
          pokemonIds: [9, 3],
        },
      };

      const res = await request(app).post('/api/v1/battle/simulate-team').send(payload);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.winningTeam).toBeDefined();
      expect(res.body.data.rounds.length).toBeGreaterThan(0);
      expect(res.body.data.log.length).toBeGreaterThan(0);
    });

    it('GET /api/v1/pokemon/random should return random Pokemon', async () => {
      const res = await request(app).get('/api/v1/pokemon/random?count=3');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveLength(3);
    });
  });
});
