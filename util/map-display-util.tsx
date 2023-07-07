import { SECONDS_IN_MINUTES } from '../constants';
import { Assets, KillEvent, Player, PlayerStats } from '../typings';

export function formatSeconds(seconds: number): string {
  const minutes = Math.floor(seconds / SECONDS_IN_MINUTES);
  const remainingSeconds = seconds % SECONDS_IN_MINUTES;
  const minutesString = minutes.toString().padStart(2, '0');
  const secondsString = remainingSeconds.toString().padStart(2, '0');
  return `${minutesString}:${secondsString}`;
}

export function getKillEvents(
  playerStats: PlayerStats[] | undefined,
  playerAssets: Map<string, Assets> | undefined
): KillEvent[] {
  let killEvents: KillEvent[] = [];

  playerStats?.forEach((playerStat) => {
    killEvents = killEvents.concat(playerStat.kill_events);
  });

  killEvents.sort((killOne, killTwo) =>
    killOne.kill_time_in_round < killTwo.kill_time_in_round ? -1 : 1
  );
  killEvents.forEach((killEvent) => {
    killEvent.killer_assets = playerAssets?.get(
      killEvent.killer_display_name
    ) as Assets;
    killEvent.victim_assets = playerAssets?.get(
      killEvent.victim_display_name
    ) as Assets;
  });

  return killEvents;
}

export function getPlayerAssets(players: Player[]): Map<string, Assets> {
  const playerAssets = new Map<string, Assets>();
  players.forEach((player) => {
    const playerDisplayName = player.name + '#' + player.tag;
    if (!playerAssets.has(playerDisplayName)) {
      playerAssets.set(player.name + '#' + player.tag, player.assets);
    }
  });
  return playerAssets;
}
