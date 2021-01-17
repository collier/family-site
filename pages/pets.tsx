import { getTodaysDogWalks, DogWalk } from '../data/dogWalk';
import WalkList from '@/components/pets/WalkList';

type Props = {
  dogWalks: DogWalk[];
};

export default function Pets({ dogWalks }: Props) {
  return (
    <div className="container font-muli">
      <h1 className="text-5xl font-bold font-lora uppercase">Dog Walks</h1>
      <WalkList dogWalks={dogWalks} />
      <button>Add Walk</button>
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
