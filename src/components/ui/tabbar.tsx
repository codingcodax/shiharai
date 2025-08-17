import { clsx } from 'clsx/lite';
import { NavigationMenu as NavigationMenuPrimitive } from 'radix-ui';

type TabbarProps = React.ComponentPropsWithoutRef<
	typeof NavigationMenuPrimitive.Root
>;

function Tabbar({ className, children, ...props }: TabbarProps) {
	return (
		<NavigationMenuPrimitive.Root
			className={clsx(
				'fixed inset-x-0 bottom-0 z-10 flex items-center justify-center border-t bg-background',
				'[&>div]:w-full',
				className,
			)}
			{...props}
		>
			{children}
		</NavigationMenuPrimitive.Root>
	);
}

type TabbarListProps = React.ComponentPropsWithoutRef<
	typeof NavigationMenuPrimitive.List
>;

function TabbarList({ className, ...props }: TabbarListProps) {
	return (
		<NavigationMenuPrimitive.List
			className={clsx('flex list-none', className)}
			{...props}
		/>
	);
}

type TabbarItemProps = React.ComponentPropsWithoutRef<
	typeof NavigationMenuPrimitive.Item
>;

function TabbarItem({ className, ...props }: TabbarItemProps) {
	return (
		<NavigationMenuPrimitive.Item
			className={clsx('flex-1', className)}
			{...props}
		/>
	);
}

type TabbarTriggerProps = React.ComponentPropsWithoutRef<
	typeof NavigationMenuPrimitive.Trigger
>;

function TabbarTrigger({ className, ...props }: TabbarTriggerProps) {
	return (
		<NavigationMenuPrimitive.Trigger
			className={clsx(
				'group flex size-full cursor-pointer flex-col items-center justify-center gap-y-2 border-transparent border-b-2 py-1.5 text-foreground',
				'data-[state=active]:border-primary data-[state=active]:text-accent-foreground',
				className,
			)}
			{...props}
		/>
	);
}

type TabbarIconProps = React.ComponentPropsWithoutRef<'div'>;

function TabbarIcon({ className, ...props }: TabbarIconProps) {
	return (
		<div
			className={clsx('relative size-6', '[&>svg]:size-6', className)}
			{...props}
		/>
	);
}

type TabbarNameProps = React.ComponentPropsWithoutRef<'span'>;

function TabbarName({ className, ...props }: TabbarNameProps) {
	return <span className={clsx('text-xs/3', className)} {...props} />;
}

export {
	Tabbar,
	TabbarList,
	TabbarItem,
	TabbarTrigger,
	TabbarIcon,
	TabbarName,
};
