import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  Assets,
  KillEvent,
  Location,
  MapData,
  Player,
  Round,
} from '../typings';
import MediaButton from './MediaButton';
import { SECONDS_IN_MINUTES } from '../constants';

import deathMarker from '../public/death-marker.svg';

interface Props {
  activeRound: Round | null;
  addKillEvent: (newKillEvent: KillEvent) => void;
  clearKillEvents: () => void;
  mapData: MapData | null;
  players: Player[];
}

export default function MapDisplay({
  activeRound,
  addKillEvent,
  clearKillEvents,
  mapData,
  players,
}: Props) {
  const [killEvents, setKillEvents] = useState<KillEvent[]>([]);
  const [killTimerId, setKillTimerId] = useState<NodeJS.Timeout | null>(null);
  const [mapSize, setMapSize] = useState<number>(0);
  const [playerAssets, setPlayerAssets] = useState<Map<string, Assets>>();
  const [playerLocations, setPlayerLocations] = useState<Location[]>([]);
  const [playing, setPlaying] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [timerId, setTimerId] = useState<number>(0);

  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (imageRef.current) {
        setMapSize(imageRef.current.width);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [imageRef]);

  useEffect(() => {
    let killEvents: KillEvent[] = [];

    activeRound?.player_stats.forEach((playerStat) => {
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

    if (killTimerId) {
      clearTimeout(killTimerId);
    }

    const context = canvasRef.current?.getContext('2d');
    context?.clearRect(0, 0, mapSize, mapSize);

    window.clearInterval(timerId);
    setKillEvents(killEvents);
    setKillTimerId(null);
    setPlaying(false);
    setPlayerLocations([]);
    setTimer(0);
    setTimerId(0);
  }, [activeRound, playerAssets]);

  useEffect(() => {
    const playerAssets = new Map<string, Assets>();
    players.forEach((player) => {
      const playerDisplayName = player.name + '#' + player.tag;
      if (!playerAssets.has(playerDisplayName)) {
        playerAssets.set(player.name + '#' + player.tag, player.assets);
      }
    });
    setPlayerAssets(playerAssets);
  }, [players]);

  useEffect(() => {
    if (mapData) {
      const image = new window.Image();
      image.src = deathMarker.src;
      playerLocations.forEach((location) => {
        if (canvasRef.current) {
          const imgX =
            (location.y * mapData.xMultiplier + mapData.xScalarToAdd) * mapSize;
          const imgY =
            (location.x * mapData.yMultiplier + mapData.yScalarToAdd) * mapSize;
          const context = canvasRef.current.getContext('2d');
          image.onload = () => {
            context?.drawImage(image, imgX, imgY);
          };
          // context?.fillRect(imgX, imgY, 10, 10);
        }
      });
    }
  }, [mapSize, playerLocations]);

  const delay = (ms: number) => {
    return new Promise((res) => {
      const timeoutId = setTimeout(res, ms);
      setKillTimerId(timeoutId);
    });
  };

  const formatSeconds = (seconds: number): string => {
    const minutes = Math.floor(seconds / SECONDS_IN_MINUTES);
    const remainingSeconds = seconds % SECONDS_IN_MINUTES;
    const minutesString = minutes.toString().padStart(2, '0');
    const secondsString = remainingSeconds.toString().padStart(2, '0');
    return `${minutesString}:${secondsString}`;
  };

  const handlePlay = async () => {
    setTimer(0);
    clearKillEvents();
    setPlaying(true);
    setPlayerLocations([]);
    var intervalId = window.setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    setTimerId(intervalId);
    await delay(killEvents[0].kill_time_in_round);
    addKillEvent(killEvents[0]);
    setPlayerLocations([
      ...playerLocations,
      killEvents[0].victim_death_location,
    ]);
    for (var i = 1; i < killEvents.length; i++) {
      await delay(
        killEvents[i].kill_time_in_round - killEvents[i - 1].kill_time_in_round
      );
      addKillEvent(killEvents[i]);
      setPlayerLocations([
        ...playerLocations,
        killEvents[i].victim_death_location,
      ]);
    }
    setPlaying(false);
    window.clearInterval(intervalId);
    setTimerId(0);
  };

  const formattedTime = formatSeconds(timer);

  return (
    <div>
      <div>
        {mapData && (
          <div className='relative'>
            {mapSize > 0 && !playing && (
              <MediaButton handleClick={handlePlay} />
            )}
            <h1 className='text-xl absolute right-0 z-10'>{formattedTime}</h1>
            <canvas
              className='absolute'
              width={mapSize}
              height={mapSize}
              ref={canvasRef}
            />
            <Image
              src={mapData.displayIcon}
              alt={mapData.displayName}
              width={1024}
              height={1024}
              ref={imageRef}
              priority
              onLoad={() => {
                setMapSize(imageRef.current!.width);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
