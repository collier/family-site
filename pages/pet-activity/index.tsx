import Head from 'next/head';

import {
  PetActivity,
  getTodaysPetActivity,
} from '@/services/PetActivityService';

import Button from '@/components/Button';
import BackLink from '@/components/BackLink';
import LoadingForPage from '@/components/LoadingForPage';
import PetEventLog from '@/components/pet-activity/PetEventLog';
import useUser from '@/hooks/useUser';

type Props = {
  petActivity: PetActivity;
};

export default function PetActivityPage({ petActivity }: Props) {
  const user = useUser({ redirectTo: '/login' });

  if (!user) {
    return <LoadingForPage />;
  }

  const {
    dryFoodScoopTotal,
    durationSinceLastDogWalk,
    petEvents,
  } = petActivity;
  return (
    <>
      <Head>
        <title>Pet Activity</title>
      </Head>
      <div className="container">
        <BackLink href="/" text="Home" />
        <h1 className="text-5xl font-bold font-lora pb-3">Pet Activity</h1>
        <div className="flex space-x-2">
          <Button role="link" href="/pet-activity/dog-walk/new" size="lg">
            Add Walk
          </Button>
          <Button role="link" href="/pet-activity/pet-feed/new" size="lg">
            Add Feed
          </Button>
        </div>
        <hr className="my-2 border-gray-300" />
        <dl className="flex sm:space-x-10">
          <div className="flex-1 text-center sm:flex-initial sm:text-left">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Time Since Last Walk
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 font-lora">
              {durationSinceLastDogWalk ?? '--'}
            </dd>
          </div>
          <div className="flex-1 text-center sm:flex-initial sm:text-left">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Total Scoops
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 font-lora">
              {dryFoodScoopTotal}
            </dd>
          </div>
        </dl>
        <hr className="my-2 border-gray-300" />
        <PetEventLog events={petEvents} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const petActivity = await getTodaysPetActivity();
  return {
    props: {
      petActivity,
    },
  };
}
