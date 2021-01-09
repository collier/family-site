import type { NextApiRequest, NextApiResponse } from 'next';

import * as dogWalkService from '../../../data/dogWalk';

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
    const walks = await dogWalkService.getTodaysDogWalks();
    res.status(200).json(walks);
  } else {
    res.status(400).end();
  }
}

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const newDogWalk = req.body;
  const result = await dogWalkService.addDogWalk(newDogWalk);
  console.log(result);
  res.status(200).json(result);
}
