import type { NextApiRequest, NextApiResponse } from 'next';

import * as dogWalkService from '../../../data/dogWalk';

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
  const { dogWalkId } = req.query;
  if (typeof dogWalkId !== 'string') {
    return res.status(400).end();
  }
  if (dogWalkId !== req.body.id) {
    return res.status(400).end();
  }
  const updatedDogWalk = req.body;
  const result = await dogWalkService.updateDogWalk(updatedDogWalk);
  res.status(200).json(result);
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { dogWalkId } = req.query;
  if (typeof dogWalkId !== 'string') {
    return res.status(400).end();
  }
  const result = await dogWalkService.deleteDogWalk(dogWalkId);
  res.status(200).json({ id: dogWalkId });
}
