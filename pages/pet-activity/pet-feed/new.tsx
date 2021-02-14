import { useState } from 'react';
import { format, parse } from 'date-fns';
import { useRouter } from 'next/router';
import Head from 'next/head';

import Button from '@/components/Button';
import BackLink from '@/components/BackLink';
import LoadingForPage from '@/components/LoadingForPage';
import useUser from '@/hooks/useUser';
import {
  PetFeedFormData,
  PetFeedForm,
} from '@/components/pet-activity/PetFeedForm';

export default function NewPetFeedPage() {
  const router = useRouter();
  const user = useUser({ redirectTo: '/login' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) {
    return <LoadingForPage />;
  }

  const onSubmit = (data: PetFeedFormData) => {
    const { petId, dryFoodScoops, feedDate, feedTime } = data;

    const fedAt = parse(
      `${feedDate}${feedTime}`,
      'yyyy-MM-ddHH:mm',
      new Date()
    ).toISOString();

    setIsSubmitting(true);

    fetch('/api/pet-feeds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ petId, dryFoodScoops, fedAt }),
    }).then(
      () => {
        router.push('/pet-activity');
      },
      (error) => {
        console.log(error);
        setIsSubmitting(false);
      }
    );
  };

  var defaultValues: Partial<PetFeedFormData> = {
    dryFoodScoops: 1,
    feedDate: format(new Date(), 'yyyy-MM-dd'),
    feedTime: format(new Date(), 'HH:mm'),
  };

  return (
    <>
      <Head>
        <title>Our Family | Pet Activity</title>
      </Head>
      <div className="container">
        <BackLink href="/pet-activity" text="Pet Activity" />
        <h1 className="text-5xl font-bold font-lora pb-3">Add Pet Feed</h1>
        <PetFeedForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <div className="space-y-2 sm:space-x-2 sm:space-y-0">
            <Button type="submit" size="lg" loading={isSubmitting}>
              Submit
            </Button>
            <Button
              role="link"
              href="/pet-activity"
              size="lg"
              variant="secondary"
            >
              Cancel
            </Button>
          </div>
        </PetFeedForm>
      </div>
    </>
  );
}
