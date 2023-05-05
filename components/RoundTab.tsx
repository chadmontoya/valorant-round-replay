import { Player, Round } from '../typings';

interface Props {
  handleRoundClick: (roundNumber: number) => void;
  player: Player | undefined;
  round: Round;
  roundNumber: number;
}

export default function RoundTab({
  handleRoundClick,
  player,
  round,
  roundNumber,
}: Props) {
  const roundWon = player?.team === round.winning_team;

  return (
    <div
      className='flex flex-col justify-between items-center h-36 mb-5 bg-primary-dark-variant cursor-pointer hover:opacity-50'
      onClick={() => {
        handleRoundClick(roundNumber);
      }}
    >
      <div className='flex flex-col items-center w-12 text-s 2xl:w-14'>
        {roundNumber + 1}
      </div>
      <div
        className={`w-3/5 h-0.5 ${
          roundWon ? 'bg-color-win' : 'bg-color-lose'
        } mb-2`}
      />
    </div>
  );
}
