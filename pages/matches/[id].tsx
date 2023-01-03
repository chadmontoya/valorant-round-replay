import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import HenrikDevValorantAPI from 'unofficial-valorant-api';
import { Round } from '../../typings';

const VAPI = new HenrikDevValorantAPI();

export default function Match() {
  const router = useRouter();
  const matchId = router.query.id;

  const [rounds, setRounds] = useState<Round[]>([]);

  useEffect(() => {
    if (!router.isReady) return;
    console.log(matchId);
  }, [router.isReady, matchId]);

  const fetchMatchData = async () => {
    console.log(router.query.id);
    // const rounds = await VAPI.getMatch({ match_id: router.query.id as string });
    // console.log(rounds);
  };

  return <div>match {router.query.id}</div>;
}
