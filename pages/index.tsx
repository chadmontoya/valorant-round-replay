import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Inputs, Match } from '../typings';

import HenrikDevValorantAPI from 'unofficial-valorant-api';

const VAPI = new HenrikDevValorantAPI();

export default function Home() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const matchList = await VAPI.getMatches({
      region: 'na',
      name: data.player_name,
      tag: data.player_tag,
      size: 10,
      filter: 'competitive',
    });
    setMatches(matchList.data as Match[]);
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('player_name', { required: true })} />
        <input {...register('player_tag', { required: true })} />
        <button type='submit'>Search</button>
      </form>
      {loading && <p>loading...</p>}
      {matches.map((match) => (
        <h1 key={match.metadata.matchid}>{match.metadata.matchid}</h1>
      ))}
    </>
  );
}
