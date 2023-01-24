import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Account,
  Content,
  Map,
  MapData,
  MapDataResponse,
  Match,
  MatchMetadata,
  Player,
  Round,
} from '../../../../typings';
import RoundTab from '../../../../components/RoundTab';
import HenrikDevValorantAPI from 'unofficial-valorant-api';
import { DEFAULT_LOCALE, MAP_ENDPOINT } from '../../../../constants';
import LoadingAnimation from '../../../../components/LoadingAnimation';
import MapDisplay from '../../../../components/MapDisplay';

const VAPI = new HenrikDevValorantAPI();

export default function MatchData() {
  const [account, setAccount] = useState<Account | null>(null);
  const [activeRoundNumber, setActiveRoundNumber] = useState<number>(0);
  const [activeRoundData, setActiveRoundData] = useState<Round | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [mapData, setMapData] = useState<MapData | null>(null);
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
      const contentData: Content = content.data as Content;
      const maps: Map[] = contentData.maps as Map[];
      const activeMap = maps.find((map) => map.name === matchData.metadata.map);
      const res = await fetch(`${MAP_ENDPOINT}/${activeMap!.id}`);
      const mapData: MapDataResponse = await res.json();

      setAccount(accountData);
      setMapData(mapData.data);
      setMetadata(matchData.metadata);
      setPlayers(matchData.players.all_players);
      setRounds(matchData.rounds);
      setActiveRoundData(matchData.rounds[0]);
      setLoading(false);
    };

    fetchData();
  }, [router.isReady, playerName, playerTag, matchId]);

  const handleRoundClick = (roundNumber: number) => {
    setActiveRoundNumber(roundNumber);
    setActiveRoundData(rounds[roundNumber]);
  };

  return (
    <div className='container mx-auto mt-5 xl:max-w-max'>
      <Head>
        <title>Match Details</title>
      </Head>
      {loading ? (
        <div className='flex h-screen'>
          <div className='m-auto'>
            <LoadingAnimation />
          </div>
        </div>
      ) : (
        <div className='flex overflow-x-auto scrollbar-thin scrollbar-thumb-secondary-dark scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
          {rounds.map((round, i) => (
            <RoundTab
              key={i}
              handleRoundClick={handleRoundClick}
              player={player}
              round={round}
              roundNumber={i}
            />
          ))}
        </div>
      )}
      <div className='mt-5 flex flex-col justify-between lg:flex-row-reverse select-none xl:mt-0'>
        <div className='w-1/2'></div>
        <MapDisplay
          activeRound={activeRoundData}
          mapData={mapData}
          players={players}
        />
      </div>
    </div>
  );
}
