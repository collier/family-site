import { useState } from 'react';
import { format, parse, parseISO } from 'date-fns';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { getPetFeed, PetFeed } from '@/services/PetFeedService';
import Button from '@/components/Button';
import LoadingForPage from '@/components/LoadingForPage';
import ConfirmationModal from '@/components/ConfirmationModal';
import BackLink from '@/components/BackLink';
import useUser from '@/hooks/useUser';
import {
  PetFeedFormData,
  PetFeedForm,
} from '@/components/pet-activity/PetFeedForm';

type Props = {
  petFeedId: string;
  petFeed: PetFeed;
};

export default function EditPetFeedPage({ petFeedId, petFeed }: Props) {
  const router = useRouter();
  const user = useUser({ redirectTo: '/login' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

    fetch(`/api/pet-feeds/${petFeedId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: petFeedId, petId, dryFoodScoops, fedAt }),
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

    fetch(`/api/pet-feeds/${petFeedId}`, {
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

  const fedDate = parseISO(petFeed.fedAt);
  var defaultValues: PetFeedFormData = {
    petId: petFeed.petId,
    dryFoodScoops: petFeed.dryFoodScoops,
    feedDate: format(fedDate, 'yyyy-MM-dd'),
    feedTime: format(fedDate, 'HH:mm'),
  };

  return (
    <>
      <Head>
        <title>Our Family | Pet Activity</title>
      </Head>
      <div className="container">
        <BackLink href="/pet-activity" text="Pet Activity" />
        <h1 className="text-5xl font-bold font-lora pb-3">Edit Pet Feed</h1>
        <PetFeedForm onSubmit={onSubmit} defaultValues={defaultValues}>
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
              Delete Feed
            </Button>
          </div>
        </PetFeedForm>
        <ConfirmationModal
          show={showDeleteModal}
          title="Delete Feeding?"
          confirmText="Are you sure you want to delete this feeding?"
          onClickBackdrop={() => setShowDeleteModal(false)}
          confirmButton={
            <Button
              role="button"
              loading={isDeleting}
              onClick={handleDelete}
              variant="danger"
            >
              Delete Feed
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
  const { petFeedId } = context.params;

  if (typeof petFeedId !== 'string') {
    return null;
  }

  const petFeed = await getPetFeed(petFeedId);
  return {
    props: {
      petFeedId,
      petFeed,
    },
  };
}
