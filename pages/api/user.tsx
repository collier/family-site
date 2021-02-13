import type { NextApiRequest, NextApiResponse } from 'next';

import { getLoginSession } from '../../lib/auth';
import * as UserService from '@/services/UserService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    default:
      res.status(405).end();
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const session = await getLoginSession(req);
  const user = await UserService.getUserById(session.userId);
  res.status(200).json({ user: user || null });
}
