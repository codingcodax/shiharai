'use client';

import { GitHubIcon } from '~/components/icons/github';
import { Button } from '~/components/ui/button';
import { Spinner } from '~/components/ui/spinner';
import { useBoolean } from '~/hooks/use-boolean';
import { signIn } from '~/server/auth/client';

export const GithubLogin = () => {
	const { value: isLoading, setValue: setIsLoading } = useBoolean();
	const handleLogIn = () =>
		signIn.social(
			{ provider: 'github', callbackURL: '/dashboard' },
			{
				onRequest: () => setIsLoading(true),
				onResponse: () => setIsLoading(false),
			},
		);

	return (
		<Button
			className='w-full'
			disabled={isLoading}
			onClick={handleLogIn}
			size='lg'
			variant='outline'
		>
			{isLoading ? (
				<Spinner />
			) : (
				<GitHubIcon color='currentColor' fill='currentColor' />
			)}
			Continue with GitHub
		</Button>
	);
};
