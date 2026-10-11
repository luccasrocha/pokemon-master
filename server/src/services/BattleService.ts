import { PokemonService } from './PokemonService';
import {
  BattleSimulationResult,
  BattleTurn,
  Pokemon,
  PokemonTypeName,
  TeamBattleRound,
  TeamBattleSimulationResult,
} from '../domain/pokemon.types';
import { calculateDefenseMultiplier } from '../utils/typeChart';
import {
  BattleSimulationInput,
  TeamBattleSimulationInput,
} from '../schemas/pokemon.schemas';

interface BattleMove {
  name: string;
  type: PokemonTypeName;
  power: number;
}

const TYPE_MOVES: Record<PokemonTypeName, Array<{ name: string; power: number }>> = {
  normal: [
    { name: 'Hyper Beam', power: 150 },
    { name: 'Body Slam', power: 85 },
    { name: 'Quick Attack', power: 45 },
  ],
  fire: [
    { name: 'Flamethrower', power: 90 },
    { name: 'Fire Blast', power: 110 },
    { name: 'Flame Wheel', power: 60 },
  ],
  water: [
    { name: 'Hydro Pump', power: 110 },
    { name: 'Surf', power: 90 },
    { name: 'Water Pulse', power: 60 },
  ],
  grass: [
    { name: 'Solar Beam', power: 120 },
    { name: 'Energy Ball', power: 90 },
    { name: 'Vine Whip', power: 50 },
  ],
  electric: [
    { name: 'Thunderbolt', power: 90 },
    { name: 'Thunder', power: 110 },
    { name: 'Spark', power: 65 },
  ],
  ice: [
    { name: 'Ice Beam', power: 90 },
    { name: 'Blizzard', power: 110 },
  ],
  fighting: [
    { name: 'Close Combat', power: 120 },
    { name: 'Cross Chop', power: 100 },
    { name: 'Brick Break', power: 75 },
  ],
  poison: [
    { name: 'Sludge Bomb', power: 90 },
    { name: 'Poison Jab', power: 80 },
  ],
  ground: [
    { name: 'Earthquake', power: 100 },
    { name: 'Earth Power', power: 90 },
  ],
  flying: [
    { name: 'Brave Bird', power: 120 },
    { name: 'Air Slash', power: 75 },
    { name: 'Wing Attack', power: 60 },
  ],
  psychic: [
    { name: 'Psychic', power: 90 },
    { name: 'Psystrike', power: 100 },
  ],
  bug: [
    { name: 'Bug Buzz', power: 90 },
    { name: 'X-Scissor', power: 80 },
  ],
  rock: [
    { name: 'Stone Edge', power: 100 },
    { name: 'Rock Slide', power: 75 },
  ],
  ghost: [
    { name: 'Shadow Ball', power: 80 },
    { name: 'Shadow Claw', power: 70 },
  ],
  dragon: [
    { name: 'Outrage', power: 120 },
    { name: 'Dragon Pulse', power: 85 },
  ],
  steel: [
    { name: 'Flash Cannon', power: 80 },
    { name: 'Iron Head', power: 80 },
  ],
  fairy: [
    { name: 'Moonblast', power: 95 },
    { name: 'Dazzling Gleam', power: 80 },
  ],
  dark: [
    { name: 'Dark Pulse', power: 80 },
    { name: 'Crunch', power: 80 },
  ],
};

export class BattleService {
  constructor(private pokemonService: PokemonService) {}

  public async simulateBattle(input: BattleSimulationInput): Promise<BattleSimulationResult> {
    const fighter1 = await this.pokemonService.getPokemonByIdOrName(input.pokemon1Id);
    const fighter2 = await this.pokemonService.getPokemonByIdOrName(input.pokemon2Id);

    return this.runSimulation(fighter1, fighter2);
  }

  public async simulateTeamBattle(
    input: TeamBattleSimulationInput
  ): Promise<TeamBattleSimulationResult> {
    const team1Members = await Promise.all(
      input.team1.pokemonIds.map((id) => this.pokemonService.getPokemonByIdOrName(id))
    );
    const team2Members = await Promise.all(
      input.team2.pokemonIds.map((id) => this.pokemonService.getPokemonByIdOrName(id))
    );

    let idx1 = 0;
    let idx2 = 0;
    let hp1 = team1Members[0].stats.hp * 3;
    let hp2 = team2Members[0].stats.hp * 3;

    const rounds: TeamBattleRound[] = [];
    const log: string[] = [];
    let roundNumber = 1;

    log.push(
      `🚩 TEAM BATTLE: "${input.team1.name}" (${team1Members.length} Pokémon) VS "${input.team2.name}" (${team2Members.length} Pokémon)!`
    );

    while (idx1 < team1Members.length && idx2 < team2Members.length) {
      const p1 = team1Members[idx1];
      const p2 = team2Members[idx2];

      log.push(`\n🥊 ROUND ${roundNumber}: ${p1.formattedName} takes the arena against ${p2.formattedName}!`);

      const roundResult = this.runSimulation(p1, p2, hp1, hp2);

      const isP1Winner = roundResult.winner.id === p1.id;
      const winnerName = isP1Winner ? p1.formattedName : p2.formattedName;
      const loserName = isP1Winner ? p2.formattedName : p1.formattedName;
      const winnerId = isP1Winner ? p1.id : p2.id;
      const loserId = isP1Winner ? p2.id : p1.id;

      rounds.push({
        roundNumber,
        fighter1: { id: p1.id, name: p1.formattedName, remainingHp: isP1Winner ? roundResult.winner.remainingHp : 0 },
        fighter2: { id: p2.id, name: p2.formattedName, remainingHp: !isP1Winner ? roundResult.winner.remainingHp : 0 },
        winnerId,
        winnerName,
        loserId,
        loserName,
        turns: roundResult.turns,
        log: roundResult.log,
      });

      if (isP1Winner) {
        hp1 = roundResult.winner.remainingHp;
        idx2++;
        if (idx2 < team2Members.length) {
          hp2 = team2Members[idx2].stats.hp * 3;
          log.push(`🔄 ${input.team2.name} sends out ${team2Members[idx2].formattedName}!`);
        }
      } else {
        hp2 = roundResult.winner.remainingHp;
        idx1++;
        if (idx1 < team1Members.length) {
          hp1 = team1Members[idx1].stats.hp * 3;
          log.push(`🔄 ${input.team1.name} sends out ${team1Members[idx1].formattedName}!`);
        }
      }

      roundNumber++;
    }

    const team1Won = idx1 < team1Members.length;
    const winningTeam = team1Won ? 'team1' : 'team2';
    const winningTeamName = team1Won ? input.team1.name : input.team2.name;

    log.push(`\n🏆 VICTORY: ${winningTeamName} has triumphed in the Team Battle!`);

    const surviving = team1Won
      ? team1Members.slice(idx1).map((p, i) => ({
          id: p.id,
          name: p.formattedName,
          remainingHp: i === 0 ? hp1 : p.stats.hp * 3,
        }))
      : team2Members.slice(idx2).map((p, i) => ({
          id: p.id,
          name: p.formattedName,
          remainingHp: i === 0 ? hp2 : p.stats.hp * 3,
        }));

    return {
      team1: {
        name: input.team1.name,
        members: team1Members.map((p) => ({ id: p.id, name: p.formattedName })),
      },
      team2: {
        name: input.team2.name,
        members: team2Members.map((p) => ({ id: p.id, name: p.formattedName })),
      },
      winningTeam,
      winningTeamName,
      survivingFighters: surviving,
      rounds,
      totalRounds: rounds.length,
      log,
    };
  }

  private getAvailableMoves(pokemon: Pokemon): BattleMove[] {
    const moves: BattleMove[] = [];
    for (const type of pokemon.types) {
      const typeMovesList = TYPE_MOVES[type] || [];
      typeMovesList.forEach((m) => moves.push({ name: m.name, type, power: m.power }));
    }
    // Always grant at least one normal move for diversity
    const normalMoves = TYPE_MOVES.normal;
    const randomNormal = normalMoves[Math.floor(Math.random() * normalMoves.length)];
    moves.push({ name: randomNormal.name, type: 'normal', power: randomNormal.power });
    return moves;
  }

  public runSimulation(
    p1: Pokemon,
    p2: Pokemon,
    startHp1?: number,
    startHp2?: number
  ): BattleSimulationResult {
    let hp1 = startHp1 !== undefined ? startHp1 : p1.stats.hp * 3;
    let hp2 = startHp2 !== undefined ? startHp2 : p2.stats.hp * 3;
    const initialHp1 = hp1;
    const initialHp2 = hp2;

    const turns: BattleTurn[] = [];
    const log: string[] = [];

    log.push(
      `⚔️ A battle begins between ${p1.formattedName} (HP: ${hp1}) and ${p2.formattedName} (HP: ${hp2})!`
    );

    let turnNumber = 1;
    const MAX_TURNS = 45;

    const p1GoesFirst =
      p1.stats.speed > p2.stats.speed ||
      (p1.stats.speed === p2.stats.speed && Math.random() > 0.5);

    let activeAttacker = p1GoesFirst ? p1 : p2;
    let activeDefender = p1GoesFirst ? p2 : p1;

    const p1Moves = this.getAvailableMoves(p1);
    const p2Moves = this.getAvailableMoves(p2);

    while (hp1 > 0 && hp2 > 0 && turnNumber <= MAX_TURNS) {
      // Compare object identity rather than Pokédex ID: team battles may include
      // duplicate species on both sides, and IDs alone cannot distinguish them.
      const isAttackerP1 = activeAttacker === p1;
      const defenderCurrentHp = isAttackerP1 ? hp2 : hp1;

      // Select move
      const availableMoves = isAttackerP1 ? p1Moves : p2Moves;
      const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];

      const effectivenessMultiplier = calculateDefenseMultiplier(
        move.type,
        activeDefender.types
      );

      let effectiveness: 'super-effective' | 'not-very-effective' | 'normal' | 'immune' =
        'normal';
      if (effectivenessMultiplier >= 2) {
        effectiveness = 'super-effective';
      } else if (effectivenessMultiplier === 0) {
        effectiveness = 'immune';
      } else if (effectivenessMultiplier < 1) {
        effectiveness = 'not-very-effective';
      }

      const isCritical = Math.random() < 0.12;
      const critMultiplier = isCritical ? 1.5 : 1.0;

      const offensivePower = Math.max(
        activeAttacker.stats.attack,
        activeAttacker.stats.specialAttack
      );
      const defensivePower = Math.max(
        activeDefender.stats.defense,
        activeDefender.stats.specialDefense
      );

      const baseDamage =
        (((2 * 50) / 5 + 2) * move.power * (offensivePower / defensivePower)) / 50 + 2;
      const randomFactor = 0.85 + Math.random() * 0.15;

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

      let turnMessage = `${activeAttacker.formattedName} used ${move.name} [${move.type.toUpperCase()}] on ${activeDefender.formattedName} dealing ${finalDamage} damage!`;
      if (isCritical) turnMessage += ' A critical hit!';
      if (effectiveness === 'super-effective') turnMessage += " It's super effective!";
      if (effectiveness === 'not-very-effective') turnMessage += " It's not very effective...";
      if (effectiveness === 'immune') turnMessage += ' It had no effect!';

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
        moveName: move.name,
        moveType: move.type,
      });

      log.push(
        `Turn ${turnNumber}: ${turnMessage} (${activeDefender.formattedName} has ${newDefenderHp} HP remaining)`
      );

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

    // If the safety limit is reached, award the result to the fighter with the
    // most HP left instead of always favoring fighter 1.
    const fighter1Won = hp2 <= 0 || (hp1 > 0 && hp1 >= hp2);
    const winner = fighter1Won ? p1 : p2;
    const loser = fighter1Won ? p2 : p1;
    const winnerRemainingHp = fighter1Won ? hp1 : hp2;

    if (hp1 > 0 && hp2 > 0) {
      log.push('⏱️ The turn limit was reached; the fighter with more HP remaining wins.');
    }

    log.push(
      `🏆 ${winner.formattedName} won the battle with ${winnerRemainingHp} HP remaining!`
    );

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
