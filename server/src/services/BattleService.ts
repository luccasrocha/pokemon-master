import { PokemonService } from './PokemonService';
import {
  BattleSimulationResult,
  BattleTurn,
  Pokemon,
  PokemonTypeName,
} from '../domain/pokemon.types';
import { calculateDefenseMultiplier } from '../utils/typeChart';
import { BattleSimulationInput } from '../schemas/pokemon.schemas';

export class BattleService {
  constructor(private pokemonService: PokemonService) {}

  public async simulateBattle(input: BattleSimulationInput): Promise<BattleSimulationResult> {
    const fighter1 = await this.pokemonService.getPokemonByIdOrName(input.pokemon1Id);
    const fighter2 = await this.pokemonService.getPokemonByIdOrName(input.pokemon2Id);

    return this.runSimulation(fighter1, fighter2);
  }

  private runSimulation(p1: Pokemon, p2: Pokemon): BattleSimulationResult {
    let hp1 = p1.stats.hp * 3; // Scaled battle HP for multi-turn excitement
    let hp2 = p2.stats.hp * 3;
    const initialHp1 = hp1;
    const initialHp2 = hp2;

    const turns: BattleTurn[] = [];
    const log: string[] = [];

    log.push(`⚔️ A battle begins between ${p1.formattedName} (HP: ${hp1}) and ${p2.formattedName} (HP: ${hp2})!`);

    let turnNumber = 1;
    const MAX_TURNS = 40;

    // Faster pokemon attacks first, with random coin flip on tie
    const p1GoesFirst =
      p1.stats.speed > p2.stats.speed ||
      (p1.stats.speed === p2.stats.speed && Math.random() > 0.5);

    let activeAttacker = p1GoesFirst ? p1 : p2;
    let activeDefender = p1GoesFirst ? p2 : p1;

    while (hp1 > 0 && hp2 > 0 && turnNumber <= MAX_TURNS) {
      const isAttackerP1 = activeAttacker.id === p1.id;
      const defenderCurrentHp = isAttackerP1 ? hp2 : hp1;

      // Choose dominant attacking move type
      const moveType: PokemonTypeName =
        activeAttacker.types[Math.floor(Math.random() * activeAttacker.types.length)];

      // Type effectiveness multiplier
      const effectivenessMultiplier = calculateDefenseMultiplier(moveType, activeDefender.types);

      let effectiveness: 'super-effective' | 'not-very-effective' | 'normal' | 'immune' =
        'normal';
      if (effectivenessMultiplier >= 2) {
        effectiveness = 'super-effective';
      } else if (effectivenessMultiplier === 0) {
        effectiveness = 'immune';
      } else if (effectivenessMultiplier < 1) {
        effectiveness = 'not-very-effective';
      }

      // Critical hit: 10% chance
      const isCritical = Math.random() < 0.1;
      const critMultiplier = isCritical ? 1.5 : 1.0;

      // Damage formula
      const offensivePower = Math.max(activeAttacker.stats.attack, activeAttacker.stats.specialAttack);
      const defensivePower = Math.max(activeDefender.stats.defense, activeDefender.stats.specialDefense);

      const baseDamage = ((2 * 50 / 5 + 2) * 60 * (offensivePower / defensivePower) / 50 + 2);
      const randomFactor = 0.85 + Math.random() * 0.15; // 0.85 - 1.00

      let finalDamage = Math.floor(
        baseDamage * effectivenessMultiplier * critMultiplier * randomFactor
      );

      if (effectivenessMultiplier === 0) {
        finalDamage = 0;
      } else {
        finalDamage = Math.max(1, finalDamage);
      }

      const newDefenderHp = Math.max(0, defenderCurrentHp - finalDamage);

      if (isAttackerP1) {
        hp2 = newDefenderHp;
      } else {
        hp1 = newDefenderHp;
      }

      let turnMessage = `${activeAttacker.formattedName} used a [${moveType.toUpperCase()}] attack on ${activeDefender.formattedName} dealing ${finalDamage} damage!`;
      if (isCritical) turnMessage += ' A critical hit!';
      if (effectiveness === 'super-effective') turnMessage += " It's super effective!";
      if (effectiveness === 'not-very-effective') turnMessage += " It's not very effective...";
      if (effectiveness === 'immune') turnMessage += " It had no effect!";

      turns.push({
        turnNumber,
        attackerId: activeAttacker.id,
        attackerName: activeAttacker.formattedName,
        defenderId: activeDefender.id,
        defenderName: activeDefender.formattedName,
        damageDealt: finalDamage,
        isCritical,
        effectiveness,
        defenderRemainingHp: newDefenderHp,
        message: turnMessage,
      });

      log.push(`Turn ${turnNumber}: ${turnMessage} (${activeDefender.formattedName} has ${newDefenderHp} HP remaining)`);

      if (newDefenderHp <= 0) {
        log.push(`💥 ${activeDefender.formattedName} fainted!`);
        break;
      }

      // Swap roles
      const temp = activeAttacker;
      activeAttacker = activeDefender;
      activeDefender = temp;
      turnNumber++;
    }

    const winner = hp1 > 0 ? p1 : p2;
    const loser = hp1 > 0 ? p2 : p1;
    const winnerRemainingHp = hp1 > 0 ? hp1 : hp2;

    log.push(`🏆 ${winner.formattedName} won the battle with ${winnerRemainingHp} HP remaining!`);

    return {
      combatants: {
        fighter1: { id: p1.id, name: p1.formattedName, initialHp: initialHp1 },
        fighter2: { id: p2.id, name: p2.formattedName, initialHp: initialHp2 },
      },
      winner: {
        id: winner.id,
        name: winner.formattedName,
        remainingHp: winnerRemainingHp,
      },
      loser: {
        id: loser.id,
        name: loser.formattedName,
      },
      totalTurns: turns.length,
      turns,
      log,
    };
  }
}
