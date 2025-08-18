'use client';

import { useOptimisticAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';

import { CheckIcon } from 'lucide-react';
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
import { currencies } from '~/config/currencies';
import { useBoolean } from '~/hooks/use-boolean';
import type { GetUser } from '~/server/api/routers/user/get';
import { updateCurrency as updateCurrencyAction } from './actions';

type Props = {
	currency: GetUser['currency'];
};

export const CurrencyCell = ({ currency: serverCurrency }: Props) => {
	const { value: isOpen, setValue: setIsOpen } = useBoolean();
	const { execute: updateCurrency, optimisticState: currency } =
		useOptimisticAction(updateCurrencyAction, {
			currentState: serverCurrency,
			updateFn: (_, { currency }) => {
				return currency;
			},
			onExecute: () => {
				setIsOpen(false);
				toast.loading('Updating currency', { id: 'update-currency' });
			},
			onSuccess: () =>
				toast.success('Currency updated', { id: 'update-currency' }),
			onError: () =>
				toast.error('Failed to update currency', { id: 'update-currency' }),
		});

	return (
		<Drawer onOpenChange={setIsOpen} open={isOpen}>
			<DrawerTrigger asChild>
				<Cell>
					<CellBody>
						<CellTitle>Default Currency</CellTitle>
					</CellBody>
					<CellBody>
						<CellValue>
							{currencies[(currency ?? 'USD') as keyof typeof currencies].name}
						</CellValue>
					</CellBody>
				</Cell>
			</DrawerTrigger>

			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Default Currency</DrawerTitle>
					<DrawerDescription>
						Change the default currency for your account.
					</DrawerDescription>
				</DrawerHeader>

				<div className='max-h-[40vh overflow-y-auto'>
					<CellGroup>
						<Cells>
							{Object.entries(currencies).map(([name, value]) => (
								<Cell
									key={name}
									onClick={() => updateCurrency({ currency: name })}
								>
									<CellBody>
										<CellTitle className='space-x-2'>
											<span>{value.name}</span>
											<span className='text-muted-foreground text-xs'>
												{name} ({value.symbol})
											</span>
										</CellTitle>
									</CellBody>
									{currencies[(currency ?? 'USD') as keyof typeof currencies]
										.name === value.name ? (
										<CheckIcon />
									) : null}
								</Cell>
							))}
						</Cells>
					</CellGroup>
				</div>
			</DrawerContent>
		</Drawer>
	);
};
