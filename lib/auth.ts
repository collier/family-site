import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

import magic from '../../lib/magic';
import { setTokenCookie, getTokenCookie } from '../../lib/cookies';

export function setLoginSession(res: NextApiResponse, session: any) {
  // Create JWT
  let token = jwt.sign(
    {
      ...session,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 * 8, // eight weeks
    },
    process.env.JWT_SECRET
  );

  setTokenCookie(res, token);
}

export async function getLoginSession(req) {
  const token = getTokenCookie(req);

  if (!token) return;

  let session = jwt.verify(token, process.env.JWT_SECRET);

  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new Error('Session expired');
  }

  return session;
}
