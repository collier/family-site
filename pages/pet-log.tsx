import { getTodaysDogWalks, DogWalk } from '../data/dogWalk';
import { PetEvent } from '../data/petLog';
import PetEventLog from '@/components/PetEventLog';
import WalkList from '@/components/WalkList';
import Button from '@/components/Button';

const testData: PetEvent[] = [
  {
    id: '57f02364-2401-4de3-aafe-dd5617d916a3',
    kind: 'walk',
    occuredAt: '11:34 AM',
    eventDetails: {
      id: '57f02364-2401-4de3-aafe-dd5617d916a3',
      petId: 'RIESLING',
      petName: 'Riesling',
      didPee: true,
      didPoop: true,
      walkedAt: '11:34 AM',
    },
  },
  {
    id: '1a089d4d-7e2e-4b21-8e2f-636d8ca14a9e',
    kind: 'walk',
    occuredAt: '3:34 AM',
    eventDetails: {
      id: '1a089d4d-7e2e-4b21-8e2f-636d8ca14a9e',
      petId: 'RIESLING',
      petName: 'Riesling',
      didPee: true,
      didPoop: false,
      walkedAt: '3:34 PM',
    },
  },
];

type Props = {
  dogWalks: DogWalk[];
};

export default function PetLogPage({ dogWalks }: Props) {
  const handleClick = () => {
    console.log('hello world');
  };

  return (
    <div className="container">
      <h1 className="text-5xl font-bold font-lora">Pet Log</h1>
      <Button role="link" href="/dog-walk/new">
        Add Walk
      </Button>
      <hr className="my-2" />
      <WalkList dogWalks={dogWalks} />
      <PetEventLog events={testData} />
    </div>
  );
}

export async function getServerSideProps() {
  const dogWalks = await getTodaysDogWalks();
  return {
    props: {
      dogWalks,
    },
  };
}
