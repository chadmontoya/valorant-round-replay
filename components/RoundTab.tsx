interface Props {
  roundNumber: number;
}

export default function RoundTab({ roundNumber }: Props) {
  return (
    <div className='flex flex-col justify-between border border-white items-center h-36 mx-1 mb-2 bg-primary-dark'>
      <div className='flex flex-col items-center w-12'>{roundNumber}</div>
      <div className='w-3/5 h-0.5 bg-red-500 mb-2'></div>
    </div>
  );
}
