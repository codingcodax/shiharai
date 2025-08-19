import { clsx } from 'clsx/lite';
import { Slot as SlotPrimitive } from 'radix-ui';

type CellGroupProps = React.ComponentPropsWithoutRef<'div'>;

function CellGroup({ ...props }: CellGroupProps) {
	return <div {...props} />;
}

type CellGroupTitleProps = React.ComponentPropsWithoutRef<'h2'>;

function CellGroupTitle({ className, ...props }: CellGroupTitleProps) {
	return (
		<h2
			className={clsx(
				'px-4 pt-8 pb-4 text-muted-foreground text-sm/4',
				'first:pt-4',
				className,
			)}
			{...props}
		/>
	);
}

type CellsProps = React.ComponentPropsWithoutRef<'div'>;

function Cells({ className, role = 'list', ...props }: CellsProps) {
	return (
		<div
			className={clsx('divide-y divide-border/40', className)}
			role={role}
			{...props}
		/>
	);
}

type CellProps = React.ComponentPropsWithoutRef<'button'> & {
	asChild?: boolean;
};

function Cell({ className, asChild, ...props }: CellProps) {
	const Comp = asChild ? SlotPrimitive.Slot : 'button';

	return (
		<Comp
			className={clsx(
				'relative inline-flex w-full gap-x-1 overflow-hidden px-4 py-2.5 text-left text-foreground text-sm/6 outline-none transition-colors duration-200',
				'hover:bg-accent',
				'dark:hover:bg-accent/50',
				'focus-visible:z-[1] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
				'disabled:pointer-events-none disabled:opacity-50',
				'[&>svg]:h-6 [&>svg]:w-4',
				className,
			)}
			data-slot='button'
			{...props}
		/>
	);
}

type CellBodyProps = React.ComponentPropsWithoutRef<'div'>;

function CellBody({ className, ...props }: CellBodyProps) {
	return <div className={clsx('flex-1', className)} {...props} />;
}

type CellTitleProps = React.ComponentPropsWithoutRef<'span'>;

function CellTitle({ ...props }: CellTitleProps) {
	return <span {...props} />;
}

type CellLabelProps = React.ComponentPropsWithoutRef<'div'>;

function CellLabel({ className, ...props }: CellLabelProps) {
	return (
		<div
			className={clsx('text-muted-foreground leading-[18px]', className)}
			{...props}
		/>
	);
}

type CellValueProps = React.ComponentPropsWithoutRef<'span'>;

function CellValue({ className, ...props }: CellValueProps) {
	return (
		<span
			className={clsx('block text-right text-muted-foreground', className)}
			{...props}
		/>
	);
}

export {
	CellGroup,
	CellGroupTitle,
	Cells,
	Cell,
	CellBody,
	CellTitle,
	CellLabel,
	CellValue,
};
