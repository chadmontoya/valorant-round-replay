import Head from 'next/head';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Account, Inputs, Match } from '../typings';

import MatchList from '../components/MatchList';
import HenrikDevValorantAPI from 'unofficial-valorant-api';

const VAPI = new HenrikDevValorantAPI();

export default function Home() {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [matches, setMatches] = useState<Match[]>([]);

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setAccount(null);
    setMatches([]);
    setLoading(true);

    const [account, matchList] = await Promise.all([
      VAPI.getAccount({ name: data.player_name, tag: data.player_tag }),
      VAPI.getMatches({
        region: data.region,
        name: data.player_name,
        tag: data.player_tag,
        size: 10,
        filter: data.game_mode,
      }),
    ]);

    const accountData: Account = account.data as Account;
    const matchListData: Match[] = matchList.data as Match[];

    setAccount(accountData);
    setMatches(matchListData);
    setLoading(false);
  };

  return (
    <div className='container mx-auto'>
      <Head>
        <title>Valorant Round Replay</title>
      </Head>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='md:flex'>
          <div className='flex lg:w-6/12'>
            <div className='w-8/12 px-3 lg:w-8/12'>
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
                placeholder='Player name'
                {...register('player_name', { required: true })}
              />
            </div>
            <div className='w-4/12 px-3 lg:w-4/12'>
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
                placeholder='Player tag'
                {...register('player_tag', { required: true })}
              />
            </div>
          </div>
          <div className='flex mt-3 md:mt-0 lg:w-5/12'>
            <div className='w-5/12 px-3 lg:w-4/12'>
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
            <div className='w-7/12 px-3 lg:w-8/12'>
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
          </div>
          <div className='mt-6 md:mt-auto px-3'>
            <button
              className='bg-secondary-dark w-full text-white font-bold py-3 px-4 rounded disabled:opacity-40'
              disabled={loading}
              type='submit'
            >
              Search
            </button>
          </div>
        </div>
      </form>
      <MatchList account={account} matchList={matches} loading={loading} />
    </div>
  );
}
