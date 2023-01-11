import React, { useEffect } from 'react';
import Image from 'next/image';
import { Map, Round } from '../typings';

interface Props {
  activeRound: Round;
  map: Map | null | undefined;
}

export default function RoundReplay({ activeRound, map }: Props) {
  return (
    <div>
      <div className='mt-5 flex flex-col justify-between lg:flex-row-reverse xl:mt-0'>
        <div className='w-1/2'>hello</div>
        {map && (
          <Image
            src={`https://media.valorant-api.com/maps/${map.id}/displayicon.png`}
            alt={map.name}
            width={768}
            height={768}
            priority
          />
        )}
      </div>
    </div>
  );
}
