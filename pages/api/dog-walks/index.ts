import type { NextApiRequest, NextApiResponse } from 'next';

import * as dogWalkService from '../../../data/dogWalk';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      return handlePost(req, res);
    default:
      res.status(405).end();
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;
  if (query?.date === 'today') {
    const walks = await dogWalkService.getTodaysDogWalks();
    res.status(200).json(walks);
  } else {
    res.status(400).end();
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const newDogWalk = req.body;
  const result = await dogWalkService.addDogWalk(newDogWalk);
  res.status(200).json(result);
}
