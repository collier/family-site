import type { NextApiRequest, NextApiResponse } from 'next';

import { getTodaysDogWalks } from '../../data/pet';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return getHandler(req, res);
    case 'POST':
      return postHandler(req, res);
    default:
      res.status(405);
  }
}

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;
  if (query?.date === 'today') {
    const walks = await getTodaysDogWalks();
    res.status(200).json(walks);
  } else {
    res.status(400).end();
  }
}

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;
  if (query?.date === 'today') {
    const walks = await getTodaysDogWalks();
    res.status(200).json(walks);
  } else {
    res.status(400).end();
  }
}
