import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Assets, KillEvent, MapData, Player, Round } from '../typings';
import MediaButton from './MediaButton';
import { SECONDS_IN_MINUTES } from '../constants';

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
  const [mapSize, setMapSize] = useState<number>(0);
  const [playerAssets, setPlayerAssets] = useState<Map<string, Assets>>();
  const [playing, setPlaying] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);

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
    setKillEvents(killEvents);
    setPlaying(false);
    setTimer(0);
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

  const delay = (ms: number) => {
    return new Promise((res) => setTimeout(res, ms));
  };

  const secondsToTimeDisplay = (seconds: number) => {
    var minutes = Math.floor(seconds / SECONDS_IN_MINUTES);
    var seconds = seconds % SECONDS_IN_MINUTES;

    return minutes.toString() + ':' + (seconds < 10 ? '0' : '') + seconds;
  };

  const handlePlay = async () => {
    setTimer(0);
    clearKillEvents();
    setPlaying(true);
    var intervalId = window.setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    await delay(killEvents[0].kill_time_in_round);
    addKillEvent(killEvents[0]);
    for (var i = 1; i < killEvents.length; i++) {
      await delay(
        killEvents[i].kill_time_in_round - killEvents[i - 1].kill_time_in_round
      );
      addKillEvent(killEvents[i]);
    }
    setPlaying(false);
    window.clearInterval(intervalId);
  };

  return (
    <div>
      <div>
        {mapData && (
          <div className='relative'>
            {mapSize > 0 && !playing && (
              <MediaButton handleClick={handlePlay} />
            )}
            <h1 className='text-xl absolute right-0 z-10'>
              {typeof timer == 'number' && secondsToTimeDisplay(timer)}
            </h1>
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
