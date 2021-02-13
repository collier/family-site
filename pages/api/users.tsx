import type { NextApiRequest, NextApiResponse } from 'next';

import * as UserService from '@/services/UserService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'HEAD':
      return handleHead(req, res);
    default:
      res.status(405).end();
  }
}

async function handleHead(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;
  if (typeof email !== 'string') {
    return res.status(400).end();
  }
  const result = await UserService.getUserByEmail(email);
  if (result !== null) {
    return res.status(200).end();
  } else {
    return res.status(404).end();
  }
}
