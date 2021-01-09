import type { NextApiRequest, NextApiResponse } from 'next';

import * as dogWalkService from '../../../data/dogWalk';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'DELETE':
      return deleteHandler(req, res);
    default:
      res.status(405);
  }
}

async function deleteHandler(req: NextApiRequest, res: NextApiResponse) {
  const { dogWalkId } = req.query;
  const result = await dogWalkService.deleteDogWalk(dogWalkId);
  res.status(200).json({ id: dogWalkId });
}
