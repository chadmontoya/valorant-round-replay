import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Inputs, Match } from '../typings';

import HenrikDevValorantAPI from 'unofficial-valorant-api';
import MatchList from '../components/MatchList';

const VAPI = new HenrikDevValorantAPI();

export default function Home() {
  const [playerName, setPlayerName] = useState<string>('');
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setMatches([]);
    setLoading(true);
    const matchList = await VAPI.getMatches({
      region: data.region,
      name: data.player_name,
      tag: data.player_tag,
      size: 10,
      filter: data.game_mode,
    });
    setMatches(matchList.data as Match[]);
    setPlayerName(data.player_name);
    setLoading(false);
  };

  return (
    <div className='flex flex-col items-center'>
      <form onSubmit={handleSubmit(onSubmit)} className='w-9/12'>
        <div className='flex'>
          <div className='w-1/2 px-3'>
            <label
              className='block uppercase tracking-wide text-xs font-bold mb-2'
              htmlFor='grid-riot-id'
            >
              Riot ID
            </label>
            <input
              id='grid-riot-id'
              className='appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              type='text'
              placeholder='Enter player name'
              {...register('player_name', { required: true })}
            />
          </div>
          <div className='w-1/4 px-3'>
            <label
              className='block uppercase tracking-wide text-xs font-bold mb-2'
              htmlFor='grid-tagline'
            >
              Tagline
            </label>
            <input
              id='grid-tagline'
              className='appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              type='text'
              {...register('player_tag', { required: true })}
            />
          </div>
          <div className='w-1/4 px-3'>
            <label
              className='block uppercase tracking-wide text-xs font-bold mb-2'
              htmlFor='grid-region'
            >
              Region
            </label>
            <div className='relative'>
              <select
                className='block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-region'
                {...register('region', { required: true })}
              >
                <option value='na'>NA</option>
                <option value='eu'>EU</option>
                <option value='kr'>KR</option>
                <option value='ap'>AP</option>
                <option value='latam'>LATAM</option>
                <option value='br'>BR</option>
              </select>
            </div>
          </div>
          <div className='w-1/4 px-3'>
            <label
              className='block uppercase tracking-wide text-xs font-bold mb-2'
              htmlFor='grid-game-mode'
            >
              Game Mode
            </label>
            <div className='relative'>
              <select
                className='block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-game-mode'
                {...register('game_mode', { required: true })}
              >
                <option value='competitive'>Competitive</option>
                <option value='unrated'>Unrated</option>
                <option value='spike rush'>Spike Rush</option>
              </select>
            </div>
          </div>
          <div className='mt-auto px-3'>
            <button
              className='bg-secondary-dark text-white font-bold py-3 px-4 rounded'
              type='submit'
            >
              Search
            </button>
          </div>
        </div>
      </form>
      <MatchList
        matchList={matches}
        loading={loading}
        playerName={playerName}
      />
    </div>
  );
}
