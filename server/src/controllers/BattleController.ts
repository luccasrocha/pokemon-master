import { Request, Response, NextFunction } from 'express';
import { BattleService } from '../services/BattleService';

export class BattleController {
  constructor(private battleService: BattleService) {}

  public simulate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.battleService.simulateBattle(req.body);
      res.json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

  public simulateTeam = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.battleService.simulateTeamBattle(req.body);
      res.json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
}
