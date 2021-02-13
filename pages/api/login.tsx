import type { NextApiRequest, NextApiResponse } from 'next';

import magic from '../../lib/magic';
import { setLoginSession } from '../../lib/auth';
import * as UserService from '@/services/UserService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const didToken = req.headers.authorization.substr(7);
    const metadata = await magic.users.getMetadataByToken(didToken);

    // Verify user exists in our database before setting cookie
    const user = await UserService.getUserByEmail(metadata.email);
    if (user === null) {
      throw new Error('Invalid login attempt');
    }

    const session = { userId: user.id, ...metadata };

    setLoginSession(res, session);

    res.status(200).end();
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
}
