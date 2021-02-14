import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { Magic } from 'magic-sdk';

import MagicWand from '@/components/icons/MagicWand';
import Input from '@/components/Input';
import Button from '@/components/Button';
import useUser from '@/hooks/useUser';

type FormData = {
  email: string;
};

export default function LoginPage() {
  useUser({ redirectTo: '/', redirectIfFound: true });
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);

  async function onSubmit(data: FormData) {
    const { email } = data;

    setIsSubmitting(true);
    setErrorOccurred(false);

    try {
      const userCheck = await fetch(`/api/users?email=${email}`, {
        method: 'HEAD',
      });
      if (userCheck.status !== 200) {
        setIsSubmitting(false);
        setErrorOccurred(true);
        return;
      }

      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY);
      const didToken = await magic.auth.loginWithMagicLink({ email });

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
        body: JSON.stringify(data),
      });
      if (res.status === 200) {
        router.push('/');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      setIsSubmitting(false);
      setErrorOccurred(true);
    }
  }

  return (
    <>
      <Head>
        <title>Our Family</title>
      </Head>
      <div className="min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-sm w-full space-y-6">
          <div>
            <h2 className="mt-6 text-center text-6xl font-lora font-bold text-gray-900">
              Our Family
            </h2>
            <h3 className="mt-2 text-center text-3xl font-lora font-bold text-gray-900">
              Sign In
            </h3>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="email"
              name="email"
              placeholder="example@example.com"
              ref={register()}
            />
            <Button
              type="submit"
              fullWidth={true}
              size="lg"
              loading={isSubmitting}
            >
              Sign In with Email
            </Button>
          </form>
          {errorOccurred && (
            <div className="rounded-md bg-red-100 p-4">
              <h3 className="text-sm font-medium text-red-800">
                An issue occurred while trying to log you in.
              </h3>
            </div>
          )}
          <div className="flex space-x-2 bg-gray-300 rounded-lg px-4 py-2">
            <MagicWand className="text-xl mt-1" />
            <p>You’ll be emailed a magic link for a password-free sign in.</p>
          </div>
        </div>
      </div>
    </>
  );
}
