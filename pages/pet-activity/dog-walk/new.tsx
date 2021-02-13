import { useState } from 'react';
import { format, parse } from 'date-fns';
import { useRouter } from 'next/router';
import Head from 'next/head';

import Button from '@/components/Button';
import BackLink from '@/components/BackLink';
import {
  DogWalkForm,
  DogWalkFormData,
} from '@/components/pet-activity/DogWalkForm';

export default function NewDogWalkPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (data: DogWalkFormData) => {
    const { petId, didPee, didPoop, walkDate, walkTime } = data;

    const walkedAt = parse(
      `${walkDate}${walkTime}`,
      'yyyy-MM-ddHH:mm',
      new Date()
    ).toISOString();

    setIsSubmitting(true);

    fetch('/api/dog-walks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ petId, didPee, didPoop, walkedAt }),
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

  var defaultValues: Partial<DogWalkFormData> = {
    didPee: true,
    didPoop: false,
    walkDate: format(new Date(), 'yyyy-MM-dd'),
    walkTime: format(new Date(), 'HH:mm'),
  };

  return (
    <>
      <Head>
        <title>Our Family | Pet Activity</title>
      </Head>
      <div className="container">
        <BackLink href="/pet-activity" text="Pet Activity" />
        <h1 className="text-5xl font-bold font-lora pb-3">Add Dog Walk</h1>
        <DogWalkForm onSubmit={onSubmit} defaultValues={defaultValues}>
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
        </DogWalkForm>
      </div>
    </>
  );
}
