import { DogWalk, getTodaysDogWalks } from './DogWalkService';
import { PetFeed, getTodaysPetFeeds } from './PetFeedService';
import { parseISO, isAfter, formatDistanceToNowStrict } from 'date-fns';

interface DogWalkEvent {
  id: string;
  kind: 'walk';
  occuredAt: string;
  eventDetails: DogWalk;
}

interface PetFeedEvent {
  id: string;
  kind: 'feed';
  occuredAt: string;
  eventDetails: PetFeed;
}

export type PetEvent = DogWalkEvent | PetFeedEvent;

export interface PetActivity {
  dryFoodScoopTotal: number;
  durationSinceLastDogWalk: string | null;
  petEvents: PetEvent[];
}

export async function getTodaysPetActivity(): Promise<PetActivity> {
  const [dogWalks, petFeeds] = await Promise.all([
    getTodaysDogWalks(),
    getTodaysPetFeeds(),
  ]);
  const petLog: PetActivity = {
    dryFoodScoopTotal: 0,
    durationSinceLastDogWalk: null,
    petEvents: [],
  };
  let i = 0;
  let j = 0;
  while (i + j < dogWalks.length + petFeeds.length) {
    const dogWalkDate =
      i < dogWalks.length ? parseISO(dogWalks[i].walkedAt) : null;
    const petFeedDate =
      j < petFeeds.length ? parseISO(petFeeds[j].fedAt) : null;
    if (dogWalkDate && (!petFeedDate || isAfter(dogWalkDate, petFeedDate))) {
      // first entry in list is the most recent walk, so use that to display
      if (i === 0) {
        petLog.durationSinceLastDogWalk = formatDistanceToNowStrict(
          dogWalkDate
        );
      }
      petLog.petEvents.push({
        id: dogWalks[i].id,
        kind: 'walk',
        occuredAt: dogWalks[i].walkedAt,
        eventDetails: dogWalks[i],
      });
      i++;
    } else {
      petLog.dryFoodScoopTotal += petFeeds[j].dryFoodScoops;
      petLog.petEvents.push({
        id: petFeeds[j].id,
        kind: 'feed',
        occuredAt: petFeeds[j].fedAt,
        eventDetails: petFeeds[j],
      });
      j++;
    }
  }
  return petLog;
}
