export interface AbilityCasts {
  c_cast: number;
  q_cast: number;
  e_cast: number;
  x_cast: number;
}

export interface Agent {
  small: string;
  full: string;
  bust: string;
  killfeed: string;
}

export interface AllPlayers {
  all_players: Player[];
  red: Player[];
  blue: Player[];
}

export interface Assets {
  card: Card;
  agent: Agent;
}

export interface Behaviour {
  afk_rounds: number;
  friendly_fire: FriendlyFire;
  rounds_in_spawn: number;
}

export interface Card {
  small: string;
  large: string;
  wide: string;
}

export interface DamageEvent {
  receiver_puuid: string;
  receiver_display_name: string;
  receiver_team: string;
  bodyshots: number;
  damage: number;
  headshots: number;
  legshots: number;
}

export interface FriendlyFire {
  incoming: number;
  outgoing: number;
}

export interface Inputs {
  player_name: string;
  player_tag: string;
}

export interface KillEvent {
  kill_time_in_round: number;
  kill_time_in_match: number;
  killer_puuid: string;
  kill_display_name: string;
  killer_team: string;
  victim_puuid: string;
  victim_display_name: string;
  victim_team: string;
  victim_death_location: Location;
  damage_weapon_id: string;
  damage_weapon_name: string;
  damage_weapon_assets: { display_icon: string; killfeed_icon: string };
  secondary_fire_mode: boolean;
  player_locations_on_kill: {
    player_puuid: string;
    player_display_name: string;
    player_team: string;
    location: Location;
    view_radians: number;
  }[];
  assistants: {
    assistant_puuid: string;
    assistant_display_name: string;
    assistant_team: string;
  }[];
}

export interface Location {
  x: string;
  y: string;
}

export interface Match {
  metadata: MatchMetadata;
  players: { all_players: Player[]; red: Player[]; blue: Player[] };
  rounds: Round[];
}

export interface MatchMetadata {
  map: string;
  game_version: string;
  game_length: number;
  game_start: number;
  game_start_patched: string;
  rounds_played: number;
  mode: string;
  queue: string;
  season_id: string;
  platform: string;
  matchid: string;
  region: string;
  cluster: string;
}

export interface SpikeEvent {
  plant_location: Location;
  planted_by: { puuid: string; display_name: string; team: string };
  plant_site: string;
  plant_time_in_round: number;
  player_locations_on_plant: {
    player_puuid: string;
    player_display_name: string;
    player_team: string;
    location: Location;
    view_radians: number;
  };
}

export interface Player {
  puuid: string;
  name: string;
  tag: string;
  team: string;
  level: number;
  character: string;
  currenttier: number;
  currenttier_patched: string;
  player_card: string;
  player_title: string;
  party_id: string;
  session_playtime: SessionPlaytime;
  assets: Assets;
  behaviour: Behaviour;
  ability_casts: AbilityCasts;
  stats: Stats;
  damage_made: number;
  damage_received: number;
}

export interface PlayerStats {
  ability_casts: AbilityCasts;
  player_puuid: string;
  player_display_name: string;
  player_team: string;
  damage_events: DamageEvent[];
  damage: number;
  bodyshots: number;
  headshots: number;
  legshots: number;
  kill_events: KillEvent[];
  kills: number;
  score: number;
}

export interface Round {
  winning_team: string;
  end_type: string;
  bomb_planted: boolean;
  bomb_defused: boolean;
}

export interface SessionPlaytime {
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export interface Stats {
  score: number;
  kills: number;
  deaths: number;
  assists: number;
  bodyshots: number;
  headshots: number;
  legshots: number;
}
