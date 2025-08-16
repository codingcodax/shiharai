import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '~/components/ui/card';
import { GithubLogin } from './_components/github-login';

const Page = () => {
	return (
		<div className='h-dvh p-4 flex flex-col'>
			<div className='absolute inset-0 bg-black/20 z-10' />

			<div className='flex-1 flex items-center justify-center relative z-0'>
				<div className='relative'>
					<div className='absolute inset-0 flex items-center justify-center'>
						<div className='size-32 shrink-0 border rounded-full' />
					</div>
					<div className='absolute inset-0 flex items-center justify-center'>
						<div className='size-40 shrink-0 border rounded-full opacity-80' />
					</div>
					<div className='absolute inset-0 flex items-center justify-center'>
						<div className='size-48 shrink-0 border rounded-full opacity-60' />
					</div>

					<div className='size-16 bg-primary rounded-lg relative z-10'></div>
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
