import React, { useEffect, useState } from 'react';
import { KillEvent, Map, Round } from '../typings';
import MapDisplay from './MapDisplay';

interface Props {
  activeRound: Round;
  map: Map | null | undefined;
  playerId: string | undefined;
}

export default function RoundReplay({ activeRound, map, playerId }: Props) {
  const [killEvents, setKillEvents] = useState<KillEvent[]>([]);

  const getKillEvents = () => {
    if (activeRound) {
      const events: KillEvent[] = [];

      activeRound.player_stats.map((playerStats) => {
        if (playerStats.kill_events) {
          playerStats.kill_events.map((killEvent) => {
            events.push(killEvent);
          });
        }
      });

      setKillEvents(events);
    }
  };

  useEffect(() => {
    getKillEvents();
  }, [activeRound]);

  return (
    <div className='mt-5 flex flex-col justify-between lg:flex-row-reverse xl:mt-0'>
      <div className='w-1/2'></div>
      <MapDisplay killEvents={killEvents} map={map} />
    </div>
  );
}
