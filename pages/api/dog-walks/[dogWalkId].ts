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
    case 'PUT':
      return handlePut(req, res);
    case 'DELETE':
      return handleDelete(req, res);
    default:
      res.status(405).end();
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const { dogWalkId } = req.query;
  if (typeof dogWalkId !== 'string') {
    return res.status(400).end();
  }
  if (dogWalkId !== req.body.id) {
    return res.status(400).end();
  }
  const updatedDogWalk = req.body;
  const result = await DogWalkService.updateDogWalk(updatedDogWalk);
  res.status(200).json(result);
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { dogWalkId } = req.query;
  if (typeof dogWalkId !== 'string') {
    return res.status(400).end();
  }
  await DogWalkService.deleteDogWalk(dogWalkId);
  res.status(200).json({ id: dogWalkId });
}
