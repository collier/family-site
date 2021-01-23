import { getTodaysDogWalks, DogWalk } from '../data/dogWalk';
import WalkList from '@/components/WalkList';
import Button from '@/components/Button';
import FeedDogIcon from '@/components/icons/FeedDogIcon';

type Props = {
  dogWalks: DogWalk[];
};

export default function Pets({ dogWalks }: Props) {
  const handleClick = () => {
    console.log('hello world');
  };

  return (
    <div className="container font-muli">
      <h1 className="text-5xl font-bold font-lora uppercase">Dog Walks</h1>
      <WalkList dogWalks={dogWalks} />
      <FeedDogIcon />
      <Button onClick={handleClick}>Add Walk</Button>
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
