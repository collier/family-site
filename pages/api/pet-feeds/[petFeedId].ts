import type { NextApiRequest, NextApiResponse } from 'next';

import * as PetFeedService from '@/services/PetFeedService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'PUT':
      return handlePut(req, res);
    case 'DELETE':
      return handleDelete(req, res);
    default:
      res.status(405).end();
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const { petFeedId } = req.query;
  if (typeof petFeedId !== 'string') {
    return res.status(400).end();
  }
  if (petFeedId !== req.body.id) {
    return res.status(400).end();
  }
  const updatedPetFeed = req.body;
  const result = await PetFeedService.updatePetFeed(updatedPetFeed);
  res.status(200).json(result);
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { petFeedId } = req.query;
  if (typeof petFeedId !== 'string') {
    return res.status(400).end();
  }
  await PetFeedService.deletePetFeed(petFeedId);
  res.status(200).json({ id: petFeedId });
}
