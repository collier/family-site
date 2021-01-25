import { DogWalk } from './dogWalk';
import { PetFeed } from './petFeed';

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
