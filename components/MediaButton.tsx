interface Props {
  handleClick: () => void;
  playing: boolean;
}

export default function MediaButton({ handleClick, playing }: Props) {
  return (
    <button className='absolute z-10' onClick={handleClick}>
      {playing ? (
        <svg
          className='h-8 w-8 text-zinc-400'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <rect x='6' y='4' width='4' height='16' />
          <rect x='14' y='4' width='4' height='16' />
        </svg>
      ) : (
        <svg
          className='h-8 w-8 text-zinc-400'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <polygon points='5 3 19 12 5 21 5 3' />
        </svg>
      )}
    </button>
  );
}
