import db from '../lib/db';
import camelizeKeys from '../lib/camelizeKeys';

export interface DogWalk {
  id: string;
  petId: string;
  petName: string;
  didPee: boolean;
  didPoop: boolean;
  walkedAt: string;
}

export interface NewDogWalk {
  petId: string;
  didPee: boolean;
  didPoop: boolean;
  walkedAt?: string;
}

export async function getDogWalk(dogWalkId: string): Promise<DogWalk | null> {
  const { rows } = await db.query(
    `
    SELECT 
      walk.id, 
      walk.pet_id, 
      walk.did_pee, 
      walk.did_poop, 
      to_json(walk.walked_at) as walked_at,
      pet.pet_name 
    FROM dog_walk walk 
    INNER JOIN pet ON walk.pet_id = pet.id 
    WHERE walk.id = $1
  `,
    [dogWalkId]
  );
  return rows[0] ? camelizeKeys(rows[0]) : null;
}

export async function addDogWalk(newDogWalk: NewDogWalk): Promise<DogWalk> {
  const { petId, didPee, didPoop, walkedAt } = newDogWalk;
  let query =
    'INSERT INTO dog_walk (pet_id, did_pee, did_poop) VALUES ($1, $2, $3) RETURNING *';
  let params = [petId, didPee, didPoop];
  if (walkedAt) {
    query =
      'INSERT INTO dog_walk (pet_id, did_pee, did_poop, walked_at) VALUES ($1, $2, $3, $4) RETURNING *';
    params = [petId, didPee, didPoop, walkedAt];
  }
  const result = await db.query(query, params);
  const newRow = result.rows[0];
  return camelizeKeys(newRow);
}

export interface UpdatedDogWalk {
  id: string;
  petId: string;
  didPee: boolean;
  didPoop: boolean;
  walkedAt?: string;
}

export async function updateDogWalk(
  updatedDogWalk: UpdatedDogWalk
): Promise<DogWalk> {
  const { id, petId, didPee, didPoop, walkedAt } = updatedDogWalk;
  const result = await db.query(
    'UPDATE dog_walk SET pet_id=$1, did_pee=$2, did_poop=$3, walked_at=$4 WHERE id=$5 RETURNING *',
    [petId, didPee, didPoop, walkedAt, id]
  );
  const newRow = result.rows[0];
  return camelizeKeys(newRow);
}

export async function deleteDogWalk(dogWalkId: string) {
  await db.query('DELETE FROM dog_walk WHERE id=$1', [dogWalkId]);
}

export async function getTodaysDogWalks(): Promise<DogWalk[]> {
  const { rows } = await db.query(`
    SELECT 
      walk.id, 
      walk.pet_id, 
      walk.did_pee, 
      walk.did_poop, 
      to_json(walk.walked_at) as walked_at,
      pet.pet_name 
    FROM dog_walk walk 
    INNER JOIN pet ON walk.pet_id = pet.id 
    WHERE 
      CAST((walk.walked_at AT TIME ZONE 'America/New_York') AS DATE) = timezone('America/New_York', NOW())::date
    ORDER BY walk.walked_at DESC
  `);
  return camelizeKeys(rows);
}
