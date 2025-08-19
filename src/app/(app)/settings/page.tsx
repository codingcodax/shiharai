import {
	Cell,
	CellBody,
	CellGroup,
	Cells,
	CellTitle,
	CellValue,
} from '~/components/ui/cell';
import { api } from '~/trpc/server';
import { CurrencyCell } from './_components/currency-cell';
import { ThemeCell } from './_components/theme-cell';
import { UserProfile } from './_components/user-profile';

const Page = async () => {
	const user = await api.user.get({});

	return (
		<div>
			<div className='grid h-12 grid-cols-3 items-center before:content-[""] after:content-[""]'>
				<h2 className='text-center font-medium text-base/5'>Settings</h2>
			</div>

			<div className='space-y-10 py-4'>
				<UserProfile user={user} />

				<CellGroup>
					<Cells>
						<CurrencyCell currency={user.currency} />

						<Cell disabled>
							<CellBody>
								<CellTitle>Payment Methods</CellTitle>
							</CellBody>
							<CellBody>
								<CellValue>3</CellValue>
							</CellBody>
						</Cell>

						<ThemeCell />
					</Cells>
				</CellGroup>
			</div>
		</div>
	);
};

export default Page;
