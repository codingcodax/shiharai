import { cn } from '~/utils/cn';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			className={cn(
				'before:-translate-x-full pointer-events-none relative overflow-hidden rounded-lg bg-accent transition-background duration-300 before:absolute before:inset-0 before:animate-shimmer before:border-accent before:border-t before:bg-gradient-to-r before:from-transparent before:via-accent/80 before:to-transparent',
				className,
			)}
			data-slot='skeleton'
			{...props}
		/>
	);
}

export { Skeleton };
