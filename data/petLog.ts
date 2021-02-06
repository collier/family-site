import { DogWalk, getTodaysDogWalks } from './dogWalk';
import { PetFeed, getTodaysPetFeeds } from './petFeed';
import { parseISO, isAfter } from 'date-fns';

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

export async function getTodaysPetLog(): Promise<PetEvent[]> {
  const dogWalks = await getTodaysDogWalks();
  const petFeeds = await getTodaysPetFeeds();
  console.log(dogWalks.length, petFeeds.length);
  const results: PetEvent[] = [];
  let i = 0;
  let j = 0;
  while (i + j < dogWalks.length + petFeeds.length) {
    const dogWalkDate =
      i < dogWalks.length ? parseISO(dogWalks[i].walkedAt) : null;
    const petFeedDate =
      j < petFeeds.length ? parseISO(petFeeds[j].fedAt) : null;
    if (dogWalkDate && (!petFeedDate || isAfter(dogWalkDate, petFeedDate))) {
      results.push({
        id: dogWalks[i].id,
        kind: 'walk',
        occuredAt: dogWalks[i].walkedAt,
        eventDetails: dogWalks[i],
      });
      i++;
    } else {
      results.push({
        id: petFeeds[j].id,
        kind: 'feed',
        occuredAt: petFeeds[j].fedAt,
        eventDetails: petFeeds[j],
      });
      j++;
    }
  }
  return results;
}
