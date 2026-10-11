import { Request, Response, NextFunction } from 'express';
import { PokemonService } from '../services/PokemonService';
import { ALL_POKEMON_TYPES } from '../utils/typeChart';

export class PokemonController {
  constructor(private pokemonService: PokemonService) {}

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.pokemonService.getPokemonList(req.query as any);
      res.json({
        success: true,
        data: data.results,
        pagination: data.pagination,
      });
    } catch (err) {
      next(err);
    }
  };

  public getByIdOrName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { identifier } = req.params;
      const pokemon = await this.pokemonService.getPokemonByIdOrName(identifier);
      res.json({
        success: true,
        data: pokemon,
      });
    } catch (err) {
      next(err);
    }
  };

  public getMatchup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { identifier } = req.params;
      const matchupData = await this.pokemonService.getPokemonMatchup(identifier);
      res.json({
        success: true,
        data: matchupData,
      });
    } catch (err) {
      next(err);
    }
  };

  public getTypes = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.json({
        success: true,
        data: ALL_POKEMON_TYPES,
        total: ALL_POKEMON_TYPES.length,
      });
    } catch (err) {
      next(err);
    }
  };

  public getRandom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const count = Number(req.query.count) || 1;
      const randomPokemons = this.pokemonService.getRandomPokemon(count);
      res.json({
        success: true,
        data: randomPokemons,
      });
    } catch (err) {
      next(err);
    }
  };
}
