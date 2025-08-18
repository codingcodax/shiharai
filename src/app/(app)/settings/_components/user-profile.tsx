import { ChevronRightIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import type { GetUser } from '~/server/api/routers/user/get';
import { getInitials } from '~/utils/get-initials';

type Props = {
	user: GetUser;
};

export const UserProfile = ({ user }: Props) => {
	return (
		<div className='flex flex-col items-center justify-center space-y-4'>
			<Avatar>
				<AvatarImage alt={user.name} src={user.image ?? ''} />
				<AvatarFallback>{getInitials(user.name)}</AvatarFallback>
			</Avatar>

			<div className='text-center'>
				<h2 className='font-semibold text-xl'>{user.name}</h2>
				<p className='text-muted-foreground'>{user.email}</p>
			</div>

			<Button disabled>
				Edit Profile <ChevronRightIcon />
			</Button>
		</div>
	);
};
