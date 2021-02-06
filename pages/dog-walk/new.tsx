import { useState } from 'react';
import { format, parse } from 'date-fns';
import { useRouter } from 'next/router';

import Button from '@/components/Button';
import { DogWalkForm, DogWalkFormData } from '@/components/DogWalkForm';

export default function NewDogWalkPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: DogWalkFormData) => {
    const { petId, didPee, didPoop, walkDate, walkTime } = data;

    const walkedAt = parse(
      `${walkDate}${walkTime}`,
      'yyyy-MM-ddHH:mm',
      new Date()
    ).toISOString();

    setIsLoading(true);

    fetch('/api/dog-walks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ petId, didPee, didPoop, walkedAt }),
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

  var defaultValues: Partial<DogWalkFormData> = {
    didPee: true,
    didPoop: false,
    walkDate: format(new Date(), 'yyyy-MM-dd'),
    walkTime: format(new Date(), 'HH:mm'),
  };

  return (
    <div className="container">
      <h1 className="text-5xl font-bold font-lora pt-2 pb-3">Add Dog Walk</h1>
      <DogWalkForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <div className="space-y-2 sm:space-x-2 sm:space-y-0">
          <Button type="submit" size="lg" loading={isLoading}>
            Add Walk
          </Button>
          <Button role="link" href="/pet-log" size="lg" variant="secondary">
            Cancel
          </Button>
        </div>
      </DogWalkForm>
    </div>
  );
}
