import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

import { setTokenCookie, getTokenCookie } from './cookies';

interface Session {
  userId: string;
  issuer: string; // provided by magic
  publicAddress: string; // provided by magic
  email: string; // provided by magic
}

export function setLoginSession(res: NextApiResponse, session: Session) {
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

export async function getLoginSession(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Session | null> {
  const token = getTokenCookie(req);

  if (!token) return;

  let session = jwt.verify(token, process.env.JWT_SECRET);

  if (typeof session === 'string') {
    throw new Error('Invalid session format');
  }

  // renew session, current session will be valid if the method reachs this
  // point
  setLoginSession(res, session as Session);

  return session as Session;
}

export function isAuthenticated(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = getTokenCookie(req);
    if (!token) {
      return res.status(403).end();
    }
    let session = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof session === 'string') {
      throw new Error('Invalid session format');
    }
    return true;
  } catch {
    res.status(403).end();
  }
}
