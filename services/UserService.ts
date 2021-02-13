import db from '../lib/db';
import camelizeKeys from '../lib/camelizeKeys';

export interface User {
  id: string;
  email: string;
  name: string;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const { rows } = await db.query(
    `
    SELECT id, email, name
    FROM user_account 
    WHERE email = $1
  `,
    [email]
  );
  return rows[0] ? camelizeKeys(rows[0]) : null;
}

export async function getUserById(id: string): Promise<User | null> {
  const { rows } = await db.query(
    `
    SELECT id, email, name
    FROM user_account 
    WHERE id = $1
  `,
    [id]
  );
  return rows[0] ? camelizeKeys(rows[0]) : null;
}
