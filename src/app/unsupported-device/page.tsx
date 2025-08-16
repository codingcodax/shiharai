import { LaptopMinimalIcon, XIcon } from 'lucide-react';

const Page = () => {
	return (
		<div
			className='flex items-center justify-center p-4 h-screen'
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
			<div className='max-w-md text-center p-6 border bg-background'>
				<div className='mb-6 space-y-1 flex items-center justify-center flex-col'>
					<div className='relative'>
						<LaptopMinimalIcon className='size-16' />
						<div className='size-5 top-0.5 -right-0 bg-foreground rounded-full absolute flex items-center justify-center'>
							<XIcon className='size-3 text-background' />
						</div>
					</div>

					<h1 className='text-2xl'>
						<span>We're sorry, but</span>
						<br />
						<span className='font-medium'>desktop is not supported</span>
					</h1>
				</div>

				<h2 className='text-muted-foreground text-lg'>
					This app is designed exclusively for mobile devices and doesn't
					support desktop browsers.
				</h2>
			</div>
		</div>
	);
};

export default Page;
