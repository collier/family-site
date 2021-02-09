import type { NextApiRequest, NextApiResponse } from 'next';

import * as dogWalkService from '@/services/PetFeedService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      return handlePost(req, res);
    default:
      res.status(405).end();
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const newPetFeed = req.body;
  const result = await dogWalkService.addPetFeed(newPetFeed);
  res.status(200).json(result);
}
