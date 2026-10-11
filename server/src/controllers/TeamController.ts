import { Request, Response, NextFunction } from 'express';
import { TeamService } from '../services/TeamService';

export class TeamController {
  constructor(private teamService: TeamService) {}

  public getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const teams = await this.teamService.getAllTeams();
      res.json({
        success: true,
        data: teams,
        total: teams.length,
      });
    } catch (err) {
      next(err);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const team = await this.teamService.getTeamById(id);
      res.json({
        success: true,
        data: team,
      });
    } catch (err) {
      next(err);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const team = await this.teamService.createTeam(req.body);
      res.status(201).json({
        success: true,
        message: 'Team created successfully',
        data: team,
      });
    } catch (err) {
      next(err);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const updated = await this.teamService.updateTeam(id, req.body);
      res.json({
        success: true,
        message: 'Team updated successfully',
        data: updated,
      });
    } catch (err) {
      next(err);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      await this.teamService.deleteTeam(id);
      res.json({
        success: true,
        message: `Team "${id}" deleted successfully`,
      });
    } catch (err) {
      next(err);
    }
  };
}
