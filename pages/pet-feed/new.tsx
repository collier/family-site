import { useState } from 'react';
import { format, parse } from 'date-fns';
import { useRouter } from 'next/router';

import { PetFeedFormData, PetFeedForm } from '@/components/PetFeedForm';
import Button from '@/components/Button';

export default function NewPetFeedPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: PetFeedFormData) => {
    const { petId, dryFoodScoops, feedDate, feedTime } = data;

    const fedAt = parse(
      `${feedDate}${feedTime}`,
      'yyyy-MM-ddHH:mm',
      new Date()
    ).toISOString();

    setIsLoading(true);

    fetch('/api/pet-feeds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ petId, dryFoodScoops, fedAt }),
    }).then(
      () => {
        router.push('/pet-log');
      },
      (error) => {
        console.log(error);
        setIsLoading(false);
      }
    );
  };

  var defaultValues: Partial<PetFeedFormData> = {
    dryFoodScoops: 1,
    feedDate: format(new Date(), 'yyyy-MM-dd'),
    feedTime: format(new Date(), 'HH:mm'),
  };

  return (
    <div className="container">
      <h1 className="text-5xl font-bold font-lora pt-2 pb-3">Add Pet Feed</h1>
      <PetFeedForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <div className="space-y-2 sm:space-x-2 sm:space-y-0">
          <Button type="submit" size="lg" loading={isLoading}>
            Add Feed
          </Button>
          <Button role="link" href="/pet-log" size="lg" variant="secondary">
            Cancel
          </Button>
        </div>
      </PetFeedForm>
    </div>
  );
}
