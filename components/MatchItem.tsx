import { Match } from '../typings';

interface Props {
  matchItem: Match;
}

export default function MatchItem({ matchItem }: Props) {
  return (
    <div>
      <h1>{matchItem.metadata.map}</h1>
    </div>
  );
}
