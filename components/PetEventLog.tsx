import { PetEvent } from '../data/petLog';
import DogWalkIcon from '@/components/icons/DogWalkIcon';
import Badge from '@/components/Badge';

type PetLogEventProps = {
  event: PetEvent;
};

function PetEventLogEntry({ event }: PetLogEventProps) {
  let icon = null;
  let editLink = '#';
  let eventBody = null;

  const { occuredAt } = event;
  switch (event.kind) {
    case 'walk':
      const { petName, didPee, didPoop } = event.eventDetails;
      icon = <DogWalkIcon className="h-9 w-9 mt-1" />;
      eventBody = (
        <div>
          <p className="text-gray-500">Walked {petName}</p>
          {didPee && <span className="text-lg">💦</span>}
          {didPoop && <span className="text-lg">💩</span>}
        </div>
      );
      break;
    default:
      break;
  }

  return (
    <li>
      <div className="relative pb-8">
        <span className="absolute top-6 left-6 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
        <div className="relative flex items-center space-x-3">
          <div>
            <span className="h-12 w-12 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
              {icon}
            </span>
          </div>
          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">{eventBody}</div>
          <div className="text-right text-sm whitespace-nowrap text-gray-500">{occuredAt}</div>
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
}

type Props = {
  events: PetEvent[];
};

export default function PetEventLog({ events }: Props) {
  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {events.map((event) => (
          <PetEventLogEntry key={event.id} event={event} />
        ))}
      </ul>
    </div>
  );
}
