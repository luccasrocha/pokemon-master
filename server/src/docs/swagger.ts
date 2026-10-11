import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pokémon Master REST API',
      version: '1.0.0',
      description:
        'Production-ready Pokémon REST API built with Node.js, Express, TypeScript, Zod, and Clean Architecture.',
      contact: {
        name: 'Luccas Rocha',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001/api/v1',
        description: 'Local Development Server',
      },
    ],
    components: {
      schemas: {
        Pokemon: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 25 },
            name: { type: 'string', example: 'pikachu' },
            formattedName: { type: 'string', example: 'Pikachu' },
            types: {
              type: 'array',
              items: { type: 'string', example: 'electric' },
            },
            stats: {
              type: 'object',
              properties: {
                hp: { type: 'integer', example: 35 },
                attack: { type: 'integer', example: 55 },
                defense: { type: 'integer', example: 40 },
                specialAttack: { type: 'integer', example: 50 },
                specialDefense: { type: 'integer', example: 50 },
                speed: { type: 'integer', example: 90 },
                total: { type: 'integer', example: 320 },
              },
            },
            height: { type: 'number', example: 0.4 },
            weight: { type: 'number', example: 6.0 },
            abilities: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'Static' },
                  isHidden: { type: 'boolean', example: false },
                },
              },
            },
            sprites: {
              type: 'object',
              properties: {
                frontDefault: { type: 'string' },
                officialArtwork: { type: 'string' },
                animatedFront: { type: 'string' },
              },
            },
            flavorText: { type: 'string' },
          },
        },
        PokemonTeam: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'team-kanto-champions' },
            name: { type: 'string', example: 'Kanto Champions' },
            description: { type: 'string' },
            members: { type: 'array' },
            typeCoverage: { type: 'array', items: { type: 'string' } },
            teamWeaknesses: { type: 'object' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: {
              type: 'object',
              properties: {
                message: { type: 'string', example: 'Validation failed' },
                statusCode: { type: 'integer', example: 400 },
                details: { type: 'object' },
              },
            },
          },
        },
      },
    },
    paths: {
      '/pokemon': {
        get: {
          summary: 'List Pokémon with filtering, search and pagination',
          tags: ['Pokémon'],
          parameters: [
            { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
            { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } },
            { name: 'search', in: 'query', schema: { type: 'string' } },
            { name: 'type', in: 'query', schema: { type: 'string' } },
            {
              name: 'sortBy',
              in: 'query',
              schema: {
                type: 'string',
                enum: ['id', 'name', 'hp', 'attack', 'defense', 'speed', 'total'],
                default: 'id',
              },
            },
            {
              name: 'order',
              in: 'query',
              schema: { type: 'string', enum: ['asc', 'desc'], default: 'asc' },
            },
          ],
          responses: {
            200: { description: 'Paginated list of Pokémon' },
          },
        },
      },
      '/pokemon/{identifier}': {
        get: {
          summary: 'Get Pokémon details by ID or Name',
          tags: ['Pokémon'],
          parameters: [
            {
              name: 'identifier',
              in: 'path',
              required: true,
              schema: { type: 'string' },
              description: 'Pokémon numeric ID (e.g. 25) or name (e.g. pikachu)',
            },
          ],
          responses: {
            200: { description: 'Pokémon details found' },
            404: { description: 'Pokémon not found' },
          },
        },
      },
      '/pokemon/{identifier}/matchup': {
        get: {
          summary: 'Get defensive type effectiveness (weaknesses & resistances)',
          tags: ['Pokémon'],
          parameters: [
            { name: 'identifier', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'Matchup calculation result' },
          },
        },
      },
      '/pokemon/types': {
        get: {
          summary: 'List all valid Pokémon types',
          tags: ['Pokémon'],
          responses: {
            200: { description: 'List of all 18 Pokémon types' },
          },
        },
      },
      '/pokemon/random': {
        get: {
          summary: 'Get random Pokémon',
          tags: ['Pokémon'],
          parameters: [
            { name: 'count', in: 'query', schema: { type: 'integer', default: 1 } },
          ],
          responses: {
            200: { description: 'List of random Pokémon' },
          },
        },
      },
      '/teams': {
        get: {
          summary: 'Get all created Pokémon teams',
          tags: ['Teams'],
          responses: {
            200: { description: 'List of teams' },
          },
        },
        post: {
          summary: 'Create a new team (up to 6 Pokémon)',
          tags: ['Teams'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'members'],
                  properties: {
                    name: { type: 'string', example: 'Thunder Team' },
                    description: { type: 'string', example: 'Electric speed focus' },
                    members: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          pokemonId: { type: 'integer', example: 25 },
                          nickname: { type: 'string', example: 'Sparky' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'Team created successfully' },
            400: { description: 'Validation error' },
          },
        },
      },
      '/teams/{id}': {
        get: {
          summary: 'Get team by ID',
          tags: ['Teams'],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Team details' },
            404: { description: 'Team not found' },
          },
        },
        delete: {
          summary: 'Delete team by ID',
          tags: ['Teams'],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Team deleted' },
          },
        },
      },
      '/battle/simulate': {
        post: {
          summary: 'Simulate a battle between two Pokémon',
          tags: ['Battle'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['pokemon1Id', 'pokemon2Id'],
                  properties: {
                    pokemon1Id: { type: 'integer', example: 6 },
                    pokemon2Id: { type: 'integer', example: 9 },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Battle simulation result with turns and winner' },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
