import { PetEvent } from '../data/petLog';
import { format, parseISO } from 'date-fns';
import DogWalkIcon from '@/components/icons/DogWalkIcon';
import FeedDogIcon from '@/components/icons/FeedDogIcon';

type Props = {
  events: PetEvent[];
};

export default function PetEventLog({ events }: Props) {
  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {events.map((event, i, arr) => {
          const isLast = arr.length === i + 1;
          const occuredTime = format(parseISO(event.occuredAt), 'h:mm a');
          let icon = null;
          let editLink = '';
          let eventBody = null;

          switch (event.kind) {
            case 'walk':
              const walk = event.eventDetails;
              icon = <DogWalkIcon className="h-9 w-9 mt-1" />;
              editLink = `/dog-walk/${walk.id}/edit`;
              eventBody = (
                <div>
                  <p className="font-bold">Walked {walk.petName}</p>
                  {walk.didPee && <span className="text-lg">💦</span>}
                  {walk.didPoop && <span className="text-lg">💩</span>}
                </div>
              );
              break;
            case 'feed':
              const feed = event.eventDetails;
              icon = <FeedDogIcon className="h-10 w-10 mt-2" />;
              editLink = `/pet-feed/${feed.id}/edit`;
              eventBody = (
                <div>
                  <p className="font-bold">Fed {feed.petName}</p>
                  <p className="text-gray-500">
                    {feed.dryFoodScoops} scoop{feed.dryFoodScoops !== 1 && 's'}
                  </p>
                </div>
              );
            default:
              break;
          }

          return (
            <li key={event.id}>
              <div className="relative pb-8">
                {!isLast && (
                  <span className="absolute top-6 left-6 -ml-px h-full w-0.5 bg-gray-300"></span>
                )}
                <div className="relative flex items-center space-x-3">
                  <div>
                    <span className="h-12 w-12 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-cream">
                      {icon}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    {eventBody}
                  </div>
                  <div className="text-right text-sm whitespace-nowrap">
                    {occuredTime}
                  </div>
                  <div>
                    <a
                      href={editLink}
                      className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Edit
                    </a>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
