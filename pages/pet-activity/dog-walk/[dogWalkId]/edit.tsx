import { useState } from 'react';
import { format, parseISO, parse } from 'date-fns';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { getDogWalk, DogWalk } from '@/services/DogWalkService';
import Button from '@/components/Button';
import ConfirmationModal from '@/components/ConfirmationModal';
import BackLink from '@/components/BackLink';
import {
  DogWalkForm,
  DogWalkFormData,
} from '@/components/pet-activity/DogWalkForm';

type Props = {
  dogWalkId: string;
  dogWalk: DogWalk;
};

export default function EditDogWalkPage({ dogWalkId, dogWalk }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onSubmit = (newDogWalk: DogWalkFormData) => {
    const { petId, didPee, didPoop, walkDate, walkTime } = newDogWalk;

    const walkedAt = parse(
      `${walkDate}${walkTime}`,
      'yyyy-MM-ddHH:mm',
      new Date()
    ).toISOString();

    setIsSubmitting(true);

    fetch(`/api/dog-walks/${dogWalkId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: dogWalkId, petId, didPee, didPoop, walkedAt }),
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

  const handleDelete = () => {
    setIsDeleting(true);

    fetch(`/api/dog-walks/${dogWalkId}`, {
      method: 'DELETE',
    }).then(
      () => {
        router.push('/pet-activity');
      },
      (error) => {
        console.log(error);
        setIsDeleting(false);
      }
    );
  };

  const walkedDate = parseISO(dogWalk.walkedAt);
  var defaultValues: DogWalkFormData = {
    petId: dogWalk.petId,
    didPee: dogWalk.didPee,
    didPoop: dogWalk.didPoop,
    walkDate: format(walkedDate, 'yyyy-MM-dd'),
    walkTime: format(walkedDate, 'HH:mm'),
  };

  return (
    <>
      <Head>
        <title>Our Family | Pet Activity</title>
      </Head>
      <div className="container">
        <BackLink href="/pet-activity" text="Pet Activity" />
        <h1 className="text-5xl font-bold font-lora pb-3">Edit Dog Walk</h1>
        <DogWalkForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <div className="space-y-2 sm:space-x-2 sm:space-y-0">
            <Button type="submit" size="lg" loading={isSubmitting}>
              Submit Edits
            </Button>
            <Button
              role="link"
              href="/pet-activity"
              size="lg"
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="danger"
              size="lg"
              disabled={isSubmitting}
              onClick={() => setShowDeleteModal(true)}
            >
              Delete Walk
            </Button>
          </div>
        </DogWalkForm>
        <ConfirmationModal
          show={showDeleteModal}
          title="Delete Walk?"
          confirmText="Are you sure you want to delete this walk?"
          onClickBackdrop={() => setShowDeleteModal(false)}
          confirmButton={
            <Button
              role="button"
              loading={isDeleting}
              onClick={handleDelete}
              variant="danger"
            >
              Delete Walk
            </Button>
          }
          cancelButton={
            <Button
              role="button"
              onClick={() => setShowDeleteModal(false)}
              variant="white"
            >
              Cancel
            </Button>
          }
        />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { dogWalkId } = context.params;

  if (typeof dogWalkId !== 'string') {
    return null;
  }

  const dogWalk = await getDogWalk(dogWalkId);
  return {
    props: {
      dogWalkId,
      dogWalk,
    },
  };
}
