import type { NextApiRequest, NextApiResponse } from 'next';
import HenrikDevValorantAPI from 'unofficial-valorant-api';
import { Match } from '../../typings';

const VAPI = new HenrikDevValorantAPI();

type Data = {
  data: Array<Match>;
};

const fetchMatches = async () => {
  const data = await VAPI.getMatches({
    region: 'na',
    name: 'chaduh',
    tag: 'NA1',
    size: 10,
    filter: 'competitive',
  });

  return data.data;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    fetchMatches().then((data) => {
      const matchList: Match[] = data;
      matchList.map((match) => console.log(match.metadata.matchid));
      res.status(200).json({ data: data[1] });
    });
  }
}
