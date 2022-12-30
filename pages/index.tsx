import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Inter } from '@next/font/google';
import { Inputs, Match } from '../typings';

import HenrikDevValorantAPI from 'unofficial-valorant-api';

const VAPI = new HenrikDevValorantAPI();

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [matches, setMatches] = useState<Match[]>([]);

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const matchList = await VAPI.getMatches({
      region: 'na',
      name: data.player_name,
      tag: data.player_tag,
      size: 10,
      filter: 'competitive',
    });

    setMatches(matchList.data);
  };

  useEffect(() => {}, [matches]);

  return (
    <>
      <span className={inter.className}>hello</span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('player_name', { required: true })} />
        <input {...register('player_tag', { required: true })} />
        <button type="submit">Search</button>
      </form>
      {matches.map((match) => (
        <h1 key={match.metadata.matchid}>{match.metadata.matchid}</h1>
      ))}
    </>
  );
}
