import { Button } from '~/components/ui/button';
import { signIn } from '~/server/auth';

const Page = () => {
  const handleSignIn = async () => {
    'use server';
    await signIn('github', { redirect: true, redirectTo: '/dashboard' });
  };

  return (
    <div className='grid h-dvh w-full grid-rows-2 gap-8 p-4'>
      <div className='h-full rounded-3xl bg-grey-bg' />

      <div className='flex w-full flex-col justify-between gap-4'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold'>Sign in</h1>
          <p className='mt-2 text-xl text-grey-text'>
            Manage your subscription in an efficient way
          </p>
        </div>

        <Button className='w-full' onClick={handleSignIn}>
          Sign in with GitHub
        </Button>
      </div>
    </div>
  );
};

export default Page;
