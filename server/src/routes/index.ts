import { Router } from 'express';
import { PokemonService } from '../services/PokemonService';
import { TeamService } from '../services/TeamService';
import { BattleService } from '../services/BattleService';
import { PokemonController } from '../controllers/PokemonController';
import { TeamController } from '../controllers/TeamController';
import { BattleController } from '../controllers/BattleController';
import { createPokemonRouter } from './pokemon.routes';
import { createTeamRouter } from './team.routes';
import { createBattleRouter } from './battle.routes';

export const createApiRouter = (): Router => {
  const router = Router();

  // Dependency Injection / Service composition
  const pokemonService = new PokemonService();
  const teamService = new TeamService(pokemonService);
  const battleService = new BattleService(pokemonService);

  const pokemonController = new PokemonController(pokemonService);
  const teamController = new TeamController(teamService);
  const battleController = new BattleController(battleService);

  // Mount v1 modules
  router.use('/pokemon', createPokemonRouter(pokemonController));
  router.use('/teams', createTeamRouter(teamController));
  router.use('/battle', createBattleRouter(battleController));

  return router;
};
