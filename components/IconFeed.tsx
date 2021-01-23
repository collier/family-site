import DogWalkIcon from '@/components/icons/DogWalkIcon';

interface FeedEvent {
  id: string;
  icon: string;
  description: string;
  // occuredDateTime: string;
}

type Props = {
  feedEvents: FeedEvent[];
};

export default function IconFeed({ feedEvents }: Props) {
  const feedListItems = feedEvents.map((feedEvent, i) => {
    const { id, icon, description } = feedEvent;
    <li key={id}>
      <div className="relative pb-8">
        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
        <div className="relative flex space-x-3">
          <div>
            <span className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
              <DogWalkIcon />
            </span>
          </div>
          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
            <div>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
            <div className="text-right text-sm whitespace-nowrap text-gray-500">Sep 20</div>
          </div>
        </div>
      </div>
    </li>;
  });
  return (
    <div className="flow-root">
      <ul className="-mb-8">{feedListItems}</ul>
    </div>
  );
}
