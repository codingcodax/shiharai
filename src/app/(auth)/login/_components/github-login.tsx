'use client';

import { Button } from '~/components/ui/button';
import { signInWithGithub } from '~/server/auth/client';

export const GithubLogin = () => {
	return (
		<Button
			className='w-full'
			variant='outline'
			size='lg'
			onClick={() => signInWithGithub()}
		>
			Continue with GitHub
		</Button>
	);
};
