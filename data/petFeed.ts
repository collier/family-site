import db from '../lib/db';
import camelizeKeys from '../lib/camelizeKeys';

export interface PetFeed {
  id: string;
  petId: string;
  petName: string;
  dryFoodScoops: number;
  fedAt: string;
}

export interface NewPetFeed {
  petId: string;
  dryFoodScoops: number;
  fedAt?: string;
}

export async function getPetFeed(petFeedId: string): Promise<PetFeed | null> {
  const { rows } = await db.query(
    `
    SELECT 
      feed.id, 
      feed.pet_id,  
      to_json(feed.dry_food_scoops) as dry_food_scoops, 
      to_json(feed.fed_at) as fed_at,
      pet.pet_name 
    FROM pet_feed feed 
    INNER JOIN pet ON feed.pet_id = pet.id 
    WHERE feed.id = $1
  `,
    [petFeedId]
  );
  return rows[0] ? camelizeKeys(rows[0]) : null;
}

export async function addPetFeed(newPetFeed: NewPetFeed): Promise<PetFeed> {
  const { petId, dryFoodScoops, fedAt } = newPetFeed;
  let query =
    'INSERT INTO pet_feed (pet_id, dry_food_scoops) VALUES ($1, $2) RETURNING *';
  let params = [petId, dryFoodScoops];
  if (fedAt) {
    query =
      'INSERT INTO pet_feed (pet_id, dry_food_scoops, fed_at) VALUES ($1, $2, $3) RETURNING *';
    params = [petId, dryFoodScoops, fedAt];
  }
  const result = await db.query(query, params);
  const newRow = result.rows[0];
  return camelizeKeys(newRow);
}

export interface UpdatedPetFeed {
  id: string;
  petId: string;
  dryFoodScoops: boolean;
  fedAt?: string;
}

export async function updatePetFeed(
  updatedPetFeed: UpdatedPetFeed
): Promise<PetFeed> {
  const { id, petId, dryFoodScoops, fedAt } = updatedPetFeed;
  const result = await db.query(
    'UPDATE pet_feed SET pet_id=$1, dry_food_scoops=$2, fed_at=$3 WHERE id=$4 RETURNING *',
    [petId, dryFoodScoops, fedAt, id]
  );
  const newRow = result.rows[0];
  return camelizeKeys(newRow);
}

export async function deletePetFeed(dogWalkId: string) {
  await db.query('DELETE FROM pet_feed WHERE id=$1', [dogWalkId]);
}

export async function getTodaysPetFeeds(): Promise<PetFeed[]> {
  const { rows } = await db.query(`
    SELECT 
      feed.id, 
      feed.pet_id,  
      to_json(feed.dry_food_scoops) as dry_food_scoops, 
      to_json(feed.fed_at) as fed_at,
      pet.pet_name  
    FROM pet_feed feed 
    INNER JOIN pet ON feed.pet_id = pet.id 
    WHERE fed_at > CURRENT_DATE AND fed_at < NOW()::date + interval '1 DAY'
    ORDER BY feed.fed_at DESC
  `);
  return camelizeKeys(rows);
}
