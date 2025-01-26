import { forwardRef } from 'react';
import { Item, List, Root, Trigger } from '@radix-ui/react-navigation-menu';
import { clsx } from 'clsx/lite';
import { tv } from 'tailwind-variants';

const tabbarStyles = tv({
  slots: {
    base: clsx(
      'fixed inset-x-0 bottom-0 z-10 flex items-center justify-center border-t bg-grey-base',
      '[&>div]:w-full',
    ),
    list: 'flex list-none',
    item: 'flex-1',
    trigger: clsx(
      'group flex size-full cursor-pointer flex-col items-center justify-center gap-y-2 border-t-2 border-transparent py-1.5 text-grey-text-contrast',
      'data-[state=active]:border-primary-solid data-[state=active]:text-primary-solid',
    ),
    icon: clsx('relative size-6', '[&>svg]:size-6'),
    name: clsx('text-xs/3'),
  },
});

const { base, list, item, trigger, icon, name } = tabbarStyles();

type TabbarRef = React.ElementRef<typeof Root>;
type TabbarProps = React.ComponentPropsWithoutRef<typeof Root>;

export const Tabbar = forwardRef<TabbarRef, TabbarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Root ref={ref} className={base({ className })} {...props}>
        {children}
      </Root>
    );
  },
);

Tabbar.displayName = 'Tabbar';

type TabbarListRef = React.ElementRef<typeof List>;
type TabbarListProps = React.ComponentPropsWithoutRef<typeof List>;

export const TabbarList = forwardRef<TabbarListRef, TabbarListProps>(
  ({ className, ...props }, ref) => {
    return <List ref={ref} className={list({ className })} {...props} />;
  },
);

TabbarList.displayName = 'TabbarList';

type TabbarItemRef = React.ElementRef<typeof Item>;
type TabbarItemProps = React.ComponentPropsWithoutRef<typeof Item>;

export const TabbarItem = forwardRef<TabbarItemRef, TabbarItemProps>(
  ({ className, ...props }, ref) => {
    return <Item ref={ref} className={item({ className })} {...props} />;
  },
);

TabbarItem.displayName = 'TabbarItem';

type TabbarTriggerRef = React.ElementRef<typeof Trigger>;
type TabbarTriggerProps = React.ComponentPropsWithoutRef<typeof Trigger>;

export const TabbarTrigger = forwardRef<TabbarTriggerRef, TabbarTriggerProps>(
  ({ className, ...props }, ref) => {
    return <Trigger ref={ref} className={trigger({ className })} {...props} />;
  },
);

TabbarTrigger.displayName = 'TabbarTrigger';

type TabbarIconRef = HTMLDivElement;
type TabbarIconProps = React.ComponentPropsWithoutRef<'div'>;

export const TabbarIcon = forwardRef<TabbarIconRef, TabbarIconProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={icon({ className })} {...props}>
        {children}
      </div>
    );
  },
);

TabbarIcon.displayName = 'TabbarIcon';

type TabbarNameRef = React.ElementRef<'span'>;
type TabbarNameProps = React.ComponentPropsWithoutRef<'span'>;

export const TabbarName = forwardRef<TabbarNameRef, TabbarNameProps>(
  ({ className, ...props }, ref) => {
    return <span ref={ref} className={name({ className })} {...props} />;
  },
);

TabbarName.displayName = 'TabbarName';
