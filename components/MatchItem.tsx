import { Match } from '../typings';

interface Props {
  matchItem: Match;
}

export default function MatchItem({ matchItem }: Props) {
  return (
    <div className='border border-red-400'>
      <h1>{matchItem.metadata.map}</h1>
    </div>
  );
}
