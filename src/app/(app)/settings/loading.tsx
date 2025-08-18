import { Spinner } from '~/components/ui/spinner';

const Loading = () => {
	return (
		<div className='flex h-dvh items-center justify-center'>
			<Spinner />
		</div>
	);
};

export default Loading;
