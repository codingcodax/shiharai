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
	);
};

export default Page;
