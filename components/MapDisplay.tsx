import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Assets, KillEvent, MapData, Player, Round } from '../typings';

interface Props {
  activeRound: Round | null;
  mapData: MapData | null;
  players: Player[];
}

export default function MapDisplay({ activeRound, mapData, players }: Props) {
  const [mapSize, setMapSize] = useState<number>(0);
  const [playerAssets, setPlayerAssets] = useState<Map<string, Assets>>();
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

    if (activeRound) {
      activeRound.player_stats.forEach((playerStat) => {
        killEvents = killEvents.concat(playerStat.kill_events);
      });
    }

    killEvents.sort((killOne, killTwo) =>
      killOne.kill_time_in_round < killTwo.kill_time_in_round ? -1 : 1
    );

    if (playerAssets) {
      killEvents.forEach((killEvent) => {
        killEvent.killer_assets = playerAssets.get(
          killEvent.killer_display_name
        ) as Assets;
        killEvent.victim_assets = playerAssets.get(
          killEvent.victim_display_name
        ) as Assets;
      });
    }

    if (mapData) {
      killEvents.forEach((killEvent) => {
        if (canvasRef.current) {
          const imgX =
            (killEvent.victim_death_location.y * mapData.xMultiplier +
              mapData.xScalarToAdd) *
            mapSize;
          const imgY =
            (killEvent.victim_death_location.x * mapData.yMultiplier +
              mapData.yScalarToAdd) *
            mapSize;
          const context = canvasRef.current.getContext('2d');
          context?.fillRect(imgX, imgY, 10, 10);
        }
      });
    }
  }, [activeRound, mapSize]);

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

  return (
    <div>
      {mapData && (
        <div>
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
  );
}
