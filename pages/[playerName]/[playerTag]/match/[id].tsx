import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Account,
  Content,
  KillEvent,
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
import KillBanner from '../../../../components/KillBanner';

const VAPI = new HenrikDevValorantAPI();

export default function MatchData() {
  const [account, setAccount] = useState<Account | null>(null);
  const [activeRoundNumber, setActiveRoundNumber] = useState<number>(0);
  const [activeRoundData, setActiveRoundData] = useState<Round | null>(null);
  const [killEvents, setKillEvents] = useState<KillEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [metadata, setMetadata] = useState<MatchMetadata | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);

  const router = useRouter();
  const matchId = router.query.id;
  const playerName = router.query.playerName;
  const playerTag = router.query.playerTag;

  const player: Player | undefined = players.find(
    (player) => player.puuid === account?.puuid
  );

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

  useEffect(() => {
    clearKillEvents();
  }, [activeRoundNumber]);

  const handleRoundClick = (roundNumber: number) => {
    setActiveRoundNumber(roundNumber);
    setActiveRoundData(rounds[roundNumber]);
  };

  const addKillEvent = (newKillEvent: KillEvent) => {
    setKillEvents((prevKills) => [...prevKills, newKillEvent]);
  };

  const clearKillEvents = () => {
    setKillEvents([]);
  };

  const killBanners = killEvents.map((killEvent, i) => (
    <KillBanner player={player} killEvent={killEvent} key={i} />
  ));

  return (
    <div className='container mx-auto mt-5'>
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
        <div>
          <h1>Round {activeRoundNumber + 1}</h1>
          <div className='flex overflow-x-auto scrollbar-thin scrollbar-thumb-secondary-dark scrollbar-thumb-rounded-full scrollbar-track-rounded-full gap-2'>
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
        </div>
      )}
      <div className='flex flex-col-reverse mt-3 justify-between select-none lg:flex-row-reverse'>
        <div className='relative right-0 lg:ml-3 lg:w-1/2 2xl:ml-10'>
          <div className='flex flex-col-reverse lg:flex-col gap-1'>
            {killBanners}
          </div>
        </div>
        <div className='lg:w-1/2'>
          <MapDisplay
            activeRound={activeRoundData}
            addKillEvent={addKillEvent}
            clearKillEvents={clearKillEvents}
            mapData={mapData}
            player={player}
            players={players}
          />
        </div>
      </div>
    </div>
  );
}
