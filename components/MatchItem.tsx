import Image from 'next/image';
import Link from 'next/link';
import { Account, Match } from '../typings';

interface Props {
  account: Account | null;
  matchItem: Match;
}

export default function MatchItem({ account, matchItem }: Props) {
  const player = matchItem.players.all_players.find(
    (player) => player.puuid === account?.puuid
  );
  const winningTeam = matchItem.teams.blue.has_won ? 'Blue' : 'Red';
  const gameWon = player?.team === winningTeam;

  return (
    <li className='py-3'>
      <Link
        href={{
          pathname: 'matches/[id]',
          query: { id: matchItem.metadata.matchid },
        }}
      >
        <div
          className={`flex items-center space-x-4 border-l-2 ${
            gameWon ? 'border-[#17E5B4]' : 'border-[#EE5350]'
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
            <p className='font-medium'>{matchItem.metadata.map}</p>
            <p className='text-sm text-gray-400'>{matchItem.metadata.mode}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}
