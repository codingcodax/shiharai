'use client';

import { useEffect } from 'react';

import { CheckIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
	Cell,
	CellBody,
	CellGroup,
	Cells,
	CellTitle,
	CellValue,
} from '~/components/ui/cell';
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '~/components/ui/drawer';
import { Skeleton } from '~/components/ui/skeleton';
import { useBoolean } from '~/hooks/use-boolean';
import { capitalize } from '~/utils/capitalize';

export const ThemeCell = () => {
	const { value: isMounted, setValue: setIsMounted } = useBoolean();
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setIsMounted(true);
	}, [setIsMounted]);

	if (!isMounted)
		return (
			<Cell>
				<CellBody>
					<CellTitle>Theme</CellTitle>
				</CellBody>
				<CellBody>
					<Skeleton className='my-[5px] ml-auto h-3.5 w-12' />
				</CellBody>
			</Cell>
		);

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Cell>
					<CellBody>
						<CellTitle>Theme</CellTitle>
					</CellBody>
					<CellBody>
						<CellValue>{capitalize(theme ?? '')}</CellValue>
					</CellBody>
				</Cell>
			</DrawerTrigger>

			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Theme</DrawerTitle>
					<DrawerDescription>
						Change the default theme of Shiharai.
					</DrawerDescription>
				</DrawerHeader>

				<div>
					<CellGroup>
						<Cells>
							<Cell onClick={() => setTheme('light')}>
								<CellBody>
									<CellTitle>Light</CellTitle>
								</CellBody>
								{theme === 'light' && <CheckIcon />}
							</Cell>

							<Cell onClick={() => setTheme('dark')}>
								<CellBody>
									<CellTitle>Dark</CellTitle>
								</CellBody>
								{theme === 'dark' && <CheckIcon />}
							</Cell>

							<Cell onClick={() => setTheme('system')}>
								<CellBody>
									<CellTitle>System</CellTitle>
								</CellBody>
								{theme === 'system' && <CheckIcon />}
							</Cell>
						</Cells>
					</CellGroup>
				</div>
			</DrawerContent>
		</Drawer>
	);
};
