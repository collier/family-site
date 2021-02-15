import type { NextApiRequest, NextApiResponse } from 'next';

import { isAuthenticated } from '../../../lib/auth';
import * as PetFeedService from '@/services/PetFeedService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!isAuthenticated(req)) return res.status(403).end();
  switch (req.method) {
    case 'POST':
      return handlePost(req, res);
    default:
      res.status(405).end();
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const newPetFeed = req.body;
  const result = await PetFeedService.addPetFeed(newPetFeed);
  res.status(200).json(result);
}
