import { LaptopMinimalIcon, XIcon } from 'lucide-react';

const Page = () => {
	return (
		<div
			className='flex h-screen items-center justify-center p-4'
			style={{
				backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 24px,
                rgba(0,0,0,0.08) 24px,
                rgba(0,0,0,0.08) 25px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 24px,
                rgba(0,0,0,0.08) 24px,
                rgba(0,0,0,0.08) 25px
              )
            `,
				backgroundSize: '25px 25px',
				maskImage:
					'radial-gradient(circle at center, black 0%, black 30%, transparent 70%)',
				WebkitMaskImage:
					'radial-gradient(circle at center, black 0%, black 30%, transparent 70%)',
			}}
		>
			<div className='max-w-md border bg-background p-6 text-center'>
				<div className='mb-6 flex flex-col items-center justify-center space-y-1'>
					<div className='relative'>
						<LaptopMinimalIcon className='size-16' />
						<div className='-right-0 absolute top-0.5 flex size-5 items-center justify-center rounded-full bg-foreground'>
							<XIcon className='size-3 text-background' />
						</div>
					</div>

					<h1 className='text-2xl'>
						<span>We're sorry, but</span>
						<br />
						<span className='font-medium'>desktop is not supported</span>
					</h1>
				</div>

				<h2 className='text-lg text-muted-foreground'>
					This app is designed exclusively for mobile devices and doesn't
					support desktop browsers.
				</h2>
			</div>
		</div>
	);
};

export default Page;
