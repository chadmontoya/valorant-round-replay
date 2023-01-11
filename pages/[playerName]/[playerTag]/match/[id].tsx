import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Account,
  Map,
  Match,
  MatchMetadata,
  Player,
  Round,
} from '../../../../typings';
import RoundTab from '../../../../components/RoundTab';
import HenrikDevValorantAPI from 'unofficial-valorant-api';
import Image from 'next/image';
import { DEFAULT_LOCALE } from '../../../../constants';

const VAPI = new HenrikDevValorantAPI();

export default function MatchData() {
  const [account, setAccount] = useState<Account | null>(null);
  const [activeMap, setActiveMap] = useState<Map | null | undefined>(null);
  const [activeRound, setActiveRound] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<MatchMetadata | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);

  const router = useRouter();
  const matchId = router.query.id;
  const playerName = router.query.playerName;
  const playerTag = router.query.playerTag;

  const player = players.find((player) => player.puuid === account?.puuid);

  useEffect(() => {
    if (!router.isReady) return;
    const fetchData = async () => {
      setLoading(true);

      const [account, match, content] = await Promise.all([
        VAPI.getAccount({
          name: playerName as string,
          tag: playerTag as string,
        }),
        VAPI.getMatch({ match_id: matchId as string }),
        VAPI.getContent({ locale: DEFAULT_LOCALE }),
      ]);

      const accountData: Account = account.data as Account;
      const matchData: Match = match.data as Match;
      const mapData: Map[] = content.data.maps as Map[];

      const activeMap = mapData.find(
        (map) => map.name === matchData.metadata.map
      );

      setAccount(accountData);
      setActiveMap(activeMap);
      setMetadata(matchData.metadata);
      setPlayers(matchData.players.all_players);
      setRounds(matchData.rounds);
      setLoading(false);
    };

    fetchData();
  }, [router.isReady, playerName, playerTag, matchId]);

  const handleRoundClick = (roundNumber: number) => {
    setActiveRound(roundNumber);
  };

  return (
    <div>
      <Head>
        <title>Match Details</title>
      </Head>
      <div className='flex overflow-x-auto scrollbar-thin scrollbar-thumb-secondary-dark scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
        {loading ? (
          <h1>loading...</h1>
        ) : (
          rounds.map((round, i) => (
            <RoundTab
              key={i + 1}
              handleRoundClick={handleRoundClick}
              player={player}
              round={round}
              roundNumber={i + 1}
            />
          ))
        )}
      </div>
    </div>
  );
}
