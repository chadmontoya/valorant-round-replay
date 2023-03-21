interface Props {
  handleClick: () => void;
}

export default function MediaButton({ handleClick }: Props) {
  return (
    <button className='absolute z-10' onClick={handleClick}>
      <svg
        className='h-8 w-8'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <polygon points='5 3 19 12 5 21 5 3' />
      </svg>
    </button>
  );
}
