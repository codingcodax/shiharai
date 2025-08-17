import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '~/components/ui/card';
import { GithubLogin } from './_components/github-login';

const Page = () => {
	return (
		<div className='flex h-dvh flex-col p-4'>
			<div className='absolute inset-0 z-10 bg-black/20' />

			<div className='relative z-0 flex flex-1 items-center justify-center'>
				<div className='relative'>
					<div className='absolute inset-0 flex items-center justify-center'>
						<div className='size-32 shrink-0 rounded-full border' />
					</div>
					<div className='absolute inset-0 flex items-center justify-center'>
						<div className='size-40 shrink-0 rounded-full border opacity-80' />
					</div>
					<div className='absolute inset-0 flex items-center justify-center'>
						<div className='size-48 shrink-0 rounded-full border opacity-60' />
					</div>

					<div className='relative z-10 size-16 rounded-lg bg-primary'></div>
				</div>
			</div>

			<Card className='relative z-20'>
				<CardHeader>
					<CardTitle className='text-2xl'>Welcome back</CardTitle>
					<CardDescription>
						Log in to your account to continue where you left off.
					</CardDescription>
				</CardHeader>

				<CardContent className='space-y-4'>
					<GithubLogin />
				</CardContent>
			</Card>
		</div>
	);
};

export default Page;
