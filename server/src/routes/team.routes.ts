import { Router } from 'express';
import { TeamController } from '../controllers/TeamController';
import { validateRequest } from '../middlewares/validate';
import {
  createTeamSchema,
  updateTeamSchema,
} from '../schemas/pokemon.schemas';

export const createTeamRouter = (controller: TeamController): Router => {
  const router = Router();

  router.get('/', controller.getAll);
  router.get('/:id', controller.getById);

  router.post(
    '/',
    validateRequest({ body: createTeamSchema }),
    controller.create
  );

  router.put(
    '/:id',
    validateRequest({ body: updateTeamSchema }),
    controller.update
  );

  router.delete('/:id', controller.delete);

  return router;
};
