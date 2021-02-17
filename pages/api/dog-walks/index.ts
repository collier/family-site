import type { NextApiRequest, NextApiResponse } from 'next';

import { isAuthenticated } from '../../../lib/auth';
import * as DogWalkService from '@/services/DogWalkService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // check user is authenticated before allowing call
  if (!isAuthenticated(req)) return res.status(403).end();
  switch (req.method) {
    case 'POST':
      return handlePost(req, res);
    default:
      res.status(405).end();
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const newDogWalk = req.body;
  const result = await DogWalkService.addDogWalk(newDogWalk);
  res.status(200).json(result);
}
