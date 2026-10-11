import { Router } from 'express';
import { BattleController } from '../controllers/BattleController';
import { validateRequest } from '../middlewares/validate';
import { battleSimulationSchema } from '../schemas/pokemon.schemas';

export const createBattleRouter = (controller: BattleController): Router => {
  const router = Router();

  router.post(
    '/simulate',
    validateRequest({ body: battleSimulationSchema }),
    controller.simulate
  );

  return router;
};
