'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
	BellIcon,
	HomeIcon,
	LayoutListIcon,
	PlusIcon,
	SettingsIcon,
} from 'lucide-react';
import {
	Tabbar,
	TabbarIcon,
	TabbarItem,
	TabbarList,
	TabbarName,
	TabbarTrigger,
} from '~/components/ui/tabbar';

const pages = [
	{
		icon: HomeIcon,
		name: 'Home',
		href: '/dashboard',
	},
	{
		icon: LayoutListIcon,
		name: 'Subscriptions',
		href: '/subscriptions',
	},
	{
		icon: PlusIcon,
		name: 'New',
		href: '/new-subscription',
	},
	{
		icon: BellIcon,
		name: 'Notifications',
		href: '/notifications',
	},
	{
		icon: SettingsIcon,
		name: 'Settings',
		href: '/settings',
	},
];

export const Navbar = () => {
	const pathname = usePathname();

	return (
		<Tabbar>
			<TabbarList>
				{pages.map(({ icon: Icon, name, href }) => (
					<TabbarItem key={name}>
						<TabbarTrigger
							asChild
							data-state={pathname === href ? 'active' : ''}
						>
							<Link href={href}>
								<TabbarIcon>
									<Icon />
								</TabbarIcon>
								<TabbarName>{name}</TabbarName>
							</Link>
						</TabbarTrigger>
					</TabbarItem>
				))}
			</TabbarList>
		</Tabbar>
	);
};
