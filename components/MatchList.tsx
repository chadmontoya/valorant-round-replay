import { NO_GAMES_FOUND_MESSAGE } from '../constants';
import { Account, Match } from '../typings';
import MatchItem from './MatchItem';

interface Props {
  account: Account | null;
  matchList: Match[];
}

export default function MatchList({ account, matchList }: Props) {
  return (
    <div className='w-full px-3'>
      {account && matchList.length > 0 && (
        <div className='mt-5'>
          <ul role='list' className='divide-y divide-gray-200'>
            {matchList.map((match) => (
              <MatchItem
                account={account}
                key={match.metadata.matchid}
                matchItem={match}
              />
            ))}
          </ul>
        </div>
      )}
      {account && matchList.length === 0 && (
        <div className='flex flex-col items-center mt-20'>
          <p>{NO_GAMES_FOUND_MESSAGE}</p>
        </div>
      )}
    </div>
  );
}
