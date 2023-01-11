import { Account, Match } from '../typings';
import MatchItem from './MatchItem';
import LoadingAnimation from './LoadingAnimation';

interface Props {
  account: Account | null;
  loading: boolean;
  matchList: Match[];
}

export default function MatchList({ account, loading, matchList }: Props) {
  return (
    <div className='w-full px-3'>
      {loading ? (
        <div className='mt-20'>
          <LoadingAnimation />
        </div>
      ) : (
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
    </div>
  );
}
