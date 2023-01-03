import Image from 'next/image';
import { useEffect } from 'react';
import { Match } from '../typings';

interface Props {
  matchItem: Match;
  playerName: string;
}

export default function MatchItem({ matchItem, playerName }: Props) {
  const player = matchItem.players.all_players.find(
    (player) => player.name === playerName
  );
  const winningTeam = matchItem.teams.blue.has_won ? 'Blue' : 'Red';

  useEffect(() => {
    console.log(player?.team);
    console.log(winningTeam);
  });

  return (
    <li className='py-3'>
      <div
        className={`flex items-center space-x-4 border-l-2 ${
          winningTeam === player?.team ? 'border-[#17E5B4]' : 'border-[#EE5350]'
        }`}
      >
        <div className='flex-shrink-0 px-2'>
          {player?.assets.agent.small && (
            <Image
              src={player?.assets.agent.small as string}
              alt={player?.character as string}
              width={50}
              height={50}
              className='rounded-full'
            />
          )}
        </div>
        <div className='flex-1 min-w-0'>
          <p className='font-medium truncate'>{matchItem.metadata.map}</p>
          <p className='text-sm text-gray-400'>{matchItem.metadata.mode}</p>
        </div>
      </div>
    </li>
  );
}
