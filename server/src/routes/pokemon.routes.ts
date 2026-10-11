import { Router } from 'express';
import { PokemonController } from '../controllers/PokemonController';
import { validateRequest } from '../middlewares/validate';
import {
  listPokemonQuerySchema,
  pokemonParamSchema,
  randomPokemonQuerySchema,
} from '../schemas/pokemon.schemas';

export const createPokemonRouter = (controller: PokemonController): Router => {
  const router = Router();

  router.get(
    '/',
    validateRequest({ query: listPokemonQuerySchema }),
    controller.getAll
  );

  router.get('/types', controller.getTypes);

  router.get('/random', validateRequest({ query: randomPokemonQuerySchema }), controller.getRandom);

  router.get(
    '/:identifier',
    validateRequest({ params: pokemonParamSchema }),
    controller.getByIdOrName
  );

  router.get(
    '/:identifier/matchup',
    validateRequest({ params: pokemonParamSchema }),
    controller.getMatchup
  );

  return router;
};
