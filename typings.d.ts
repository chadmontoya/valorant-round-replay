import { Modes, Regions } from 'unofficial-valorant-api';

export interface AbilityCasts {
  c_cast: number;
  e_cast: number;
  q_cast: number;
  x_cast: number;
}

export interface Agent {
  bust: string;
  full: string;
  killfeed: string;
  small: string;
}

export interface AllPlayers {
  all_players: Player[];
  red: Player[];
  blue: Player[];
}

export interface Assets {
  agent: Agent;
  card: Card;
}

export interface Behavior {
  afk_rounds: number;
  friendly_fire: FriendlyFire;
  rounds_in_spawn: number;
}

export interface Card {
  large: string;
  small: string;
  wide: string;
}

export interface DamageEvent {
  bodyshots: number;
  damage: number;
  headshots: number;
  legshots: number;
  receiver_display_name: string;
  receiver_puuid: string;
  receiver_team: string;
}

export interface DefuseEvent {
  defuse_location: Location;
  defuse_time_in_round: number;
  defused_by: PlayerPreview;
  player_locations_on_defuse: PlayerLocation[];
  end_type: string;
  plant_events;
}

export interface FriendlyFire {
  incoming: number;
  outgoing: number;
}

export interface Inputs {
  player_name: string;
  player_tag: string;
  region: Regions;
  game_mode: Modes;
}

export interface KillEvent {
  assistants: PlayerPreview[];
  damage_weapon_assets: { display_icon: string; killfeed_icon: string };
  damage_weapon_id: string;
  damage_weapon_name: string;
  kill_time_in_match: number;
  kill_time_in_round: number;
  killer_puuid: string;
  kill_display_name: string;
  killer_team: string;
  player_locations_on_kill: PlayerLocation[];
  secondary_fire_mode: boolean;
  victim_death_location: Location;
  victim_display_name: string;
  victim_puuid: string;
  victim_team: string;
}

export interface Location {
  x: string;
  y: string;
}

export interface Match {
  metadata: MatchMetadata;
  players: { all_players: Player[]; red: Player[]; blue: Player[] };
  rounds: Round[];
  teams: Teams;
}

export interface MatchMetadata {
  cluster: string;
  game_length: number;
  game_start: number;
  game_start_patched: string;
  game_version: string;
  map: string;
  matchid: string;
  mode: string;
  platform: string;
  queue: string;
  region: string;
  rounds_played: number;
  season_id: string;
}

export interface PlantEvent {
  plant_location: string;
  plant_site: string;
  plant_time_in_round: number;
  planted_by: PlayerPreview;
  player_locations_on_plant: PlayerLocation[];
}

export interface Player {
  ability_casts: AbilityCasts;
  assets: Assets;
  behavior: Behavior;
  currenttier: number;
  currenttier_patched: string;
  character: string;
  damage_made: number;
  damage_received: number;
  level: number;
  name: string;
  party_id: string;
  player_card: string;
  player_title: string;
  puuid: string;
  tag: string;
  team: string;
  session_playtime: SessionPlaytime;
  stats: Stats;
}

export interface PlayerLocation {
  location: Location;
  player_display_name: string;
  player_puuid: string;
  player_team: string;
  view_radians: number;
}

export interface PlayerPreview {
  display_name: string;
  puuid: string;
  team: string;
}

export interface PlayerStats {
  ability_casts: AbilityCasts;
  bodyshots: number;
  damage: number;
  damage_events: DamageEvent[];
  headshots: number;
  kill_events: KillEvent[];
  kills: number;
  legshots: number;
  player_display_name: string;
  player_puuid: string;
  player_team: string;
  score: number;
  stayed_in_spawn: boolean;
  was_afk: false;
  was_penalized: false;
}

export interface Round {
  bomb_defused: boolean;
  bomb_planted: boolean;
  defuse_events: DefuseEvent;
  end_type: string;
  plant_events: PlantEvent;
  player_stats: PlayerStats[];
  winning_team: string;
}

export interface SessionPlaytime {
  milliseconds: number;
  minutes: number;
  seconds: number;
}

export interface Stats {
  assists: number;
  bodyshots: number;
  deaths: number;
  headshots: number;
  kills: number;
  legshots: number;
  score: number;
}

export interface Team {
  has_won: boolean;
  rounds_lost: number;
  rounds_won: number;
}

export interface Teams {
  red: Team;
  blue: Team;
}
