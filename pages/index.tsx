import Head from 'next/head';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Account, Inputs, Match } from '../typings';

import LoadingAnimation from '../components/ui/LoadingAnimation';
import MatchList from '../components/MatchList';
import HenrikDevValorantAPI, { APIResponse } from 'unofficial-valorant-api';
import { API_ACCOUNT_ERROR_MESSAGE } from '../constants';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import Image from 'next/image';

const VAPI = new HenrikDevValorantAPI();

export default function Home() {
  const [account, setAccount] = useState<Account | null>(null);
  const [apiError, setApiError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [matches, setMatches] = useState<Match[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setAccount(null);
    setMatches([]);
    setLoading(true);

    const accountResponse: APIResponse = await VAPI.getAccount({
      name: data.player_name,
      tag: data.player_tag,
    });

    if (accountResponse.error) {
      setApiError(API_ACCOUNT_ERROR_MESSAGE);
    } else {
      const matchListResponse: APIResponse = await VAPI.getMatches({
        region: data.region,
        name: data.player_name,
        tag: data.player_tag,
        size: 10,
        filter: data.game_mode,
      });
      setApiError('');
      setAccount(accountResponse.data as Account);
      setMatches(matchListResponse.data as Match[]);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className='container mx-auto flex flex-col min-h-screen'>
        <Head>
          <title>Valorant Round Replay</title>
        </Head>
        <Navbar />
        <div className='m-auto'>
          <Image
            src='/home-image-2.jpg'
            alt='l10-sillos-final'
            width={550}
            height={550}
          />
        </div>
        <div className='flex-grow my-10'>
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
                    className={`appearance-none block w-full border ${
                      errors.player_name ? 'border-red-500' : 'border-gray-200'
                    } text-gray-700 rounded py-3 px-4 leading-tight ring-red-700`}
                    type='text'
                    placeholder='Player name'
                    {...register('player_name', {
                      required: 'Player name must not be empty',
                    })}
                  />
                  {errors.player_name && (
                    <p className='text-xs text-red-500'>
                      {errors.player_name.message}
                    </p>
                  )}
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
                    className={`appearance-none block w-full border ${
                      errors.player_tag ? 'border-red-500' : 'border-gray-200'
                    } text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none`}
                    type='text'
                    placeholder='Player tag'
                    {...register('player_tag', {
                      required: 'Player tag must not be empty',
                    })}
                  />
                  {errors.player_tag && (
                    <p className='text-xs text-red-500'>
                      {errors.player_tag.message}
                    </p>
                  )}
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
                      <option value='spikerush'>Spike Rush</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className='mt-[22px] px-3'>
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
          {loading && (
            <div className='flex flex-col items-center mt-20'>
              <LoadingAnimation />
            </div>
          )}
          {!loading && matches && (
            <MatchList account={account} matchList={matches} />
          )}
          {!loading && apiError && (
            <div className='flex flex-col items-center mt-20'>
              <p>{apiError}</p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
