import { PetEvent, getTodaysPetLog } from '../data/petLog';
import PetEventLog from '@/components/PetEventLog';
import Button from '@/components/Button';

type Props = {
  petEvents: PetEvent[];
};

export default function PetLogPage({ petEvents }: Props) {
  console.log(petEvents);
  return (
    <div className="container">
      <h1 className="text-5xl font-bold font-lora pt-2 pb-3">Pet Activity</h1>
      <Button role="link" href="/dog-walk/new">
        Add Walk
      </Button>
      <Button role="link" href="/pet-feed/new">
        Add Feed
      </Button>
      <hr className="my-2" />
      <PetEventLog events={petEvents} />
    </div>
  );
}

export async function getServerSideProps() {
  const petEvents = await getTodaysPetLog();
  return {
    props: {
      petEvents,
    },
  };
}
