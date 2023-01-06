import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Account, Round } from '../../typings';
import RoundTab from '../../components/RoundTab';
import HenrikDevValorantAPI from 'unofficial-valorant-api';

const VAPI = new HenrikDevValorantAPI();

export default function Match() {
  const router = useRouter();
  const matchId = router.query.id;

  const [rounds, setRounds] = useState<Round[]>([]);
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    fetchData();
  }, [router.isReady, matchId]);

  const fetchData = async () => {
    const rounds = await VAPI.getMatch({ match_id: router.query.id as string });
  };

  return (
    <div>
      <Head>
        <title>Match Details</title>
      </Head>
      <div className='flex overflow-x-auto scrollbar-thin scrollbar-thumb-secondary-dark scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
        {Array.from({ length: 26 }, (_, i) => (
          <RoundTab key={i + 1} roundNumber={i + 1} />
        ))}
      </div>
    </div>
  );
}
