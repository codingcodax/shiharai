import type { DialogProps } from '@radix-ui/react-dialog';
import { forwardRef } from 'react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { clsx } from 'clsx/lite';
import {
  Command as CMDK,
  CommandEmpty as CMDKEmpty,
  CommandGroup as CMDKGroup,
  CommandInput as CMDKInput,
  CommandItem as CMDKItem,
  CommandList as CMDKList,
  CommandSeparator as CMDKSeparator,
} from 'cmdk';
import { tv } from 'tailwind-variants';

import { Dialog, DialogContent } from '~/components/ui/dialog';

const commandStyles = tv({
  slots: {
    base: 'flex size-full flex-col overflow-hidden rounded-xl bg-grey-base',
    dialogContent: 'overflow-hidden p-0 shadow-lg',
    dialogCommand: clsx(
      '[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-grey-text',
      '[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0',
      '[&_[cmdk-group]]:px-1',
      '[&_[cmdk-input-wrapper]_svg]:size-5',
      '[&_[cmdk-input]]:h-11',
      '[&_[cmdk-item]]:h-auto [&_[cmdk-item]]:px-3 [&_[cmdk-item]]:py-2',
      '[&_[cmdk-item]_svg]:size-5',
    ),
    inputWrapper:
      'flex items-center border-b border-grey-line px-3 outline-none',
    inputIcon: 'mr-2 size-4 shrink-0 text-grey-text',
    input: clsx(
      'flex h-10 w-full rounded-lg bg-grey-base py-3 text-sm',
      'placeholder:text-grey-placeholder-text',
      'focus:outline-none',
    ),
    list: clsx(
      'max-h-xs overflow-h-auto h-full overflow-x-hidden outline-none',
      'focus-visible:ring-4 focus-visible:ring-primary-focus-ring',
    ),
    empty: 'py-6 text-center text-sm',
    group: clsx(
      'overflow-hidden p-1 text-grey-text-contrast',
      '[&_[cmdk-group-heading]]:flex [&_[cmdk-group-heading]]:select-none [&_[cmdk-group-heading]]:items-center [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-grey-text',
    ),
    item: clsx(
      'group relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none',
      'aria-selected:bg-primary-bg-hover',
      'aria-disabled:cursor-not-allowed aria-disabled:text-grey-solid',
    ),
    shortcut: clsx(
      'ml-auto text-xs tracking-widest text-grey-text',
      'group-aria-disabled:text-grey-solid',
    ),
    separator: '-mx-1 h-px bg-grey-line',
  },
});

const {
  base,
  dialogContent,
  dialogCommand,
  inputWrapper,
  inputIcon,
  input,
  list,
  empty,
  group,
  item,
  shortcut,
  separator,
} = commandStyles();

/**
 * Command component that provides a command palette for executing commands or searching.
 *
 * @param {CommandProps} props - The props for the Command component.
 *
 * @example
 * ```tsx
 * <Command>
 *   <CommandInput placeholder='Type a command or search...' />
 *   <CommandList>
 *     <CommandEmpty>No results found.</CommandEmpty>
 *     <CommandGroup heading='Suggestions'>
 *       <CommandItem>Calendar</CommandItem>
 *       <CommandItem>Search Emoji</CommandItem>
 *       <CommandItem>Calculator</CommandItem>
 *     </CommandGroup>
 *     <CommandSeparator />
 *     <CommandGroup heading='Settings'>
 *       <CommandItem>Profile</CommandItem>
 *       <CommandItem>Billing</CommandItem>
 *       <CommandItem>Settings</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 * ```
 *
 * @see {@link https://dub.sh/ui-command Command Docs} for further information.
 */
export const Command = forwardRef<
  React.ElementRef<typeof CMDK>,
  React.ComponentPropsWithoutRef<typeof CMDK>
>(({ className, ...props }, ref) => (
  <CMDK ref={ref} className={base({ className })} {...props} />
));

Command.displayName = CMDK.displayName;

/**
 * CommandDialog component that wraps the Command component in a dialog.
 *
 * @param {DialogProps} props - The props for the CommandDialog component.
 *
 * @example
 * ```tsx
 * <CommandDialog>
 *   <Command>...</Command>
 * </CommandDialog>
 * ```
 */
export const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className={dialogContent()}>
        <Command className={dialogCommand()}>{children}</Command>
      </DialogContent>
    </Dialog>
  );
};

type CommandInputRef = React.ElementRef<typeof CMDKInput>;
type CommandInputProps = React.ComponentPropsWithoutRef<typeof CMDKInput>;

/**
 * CommandInput component that allows users to input commands or search terms.
 *
 * @param {CommandInputProps} props - The props for the CommandInput component.
 *
 * @example
 * ```tsx
 * <CommandInput placeholder='Type a command or search...' />
 * ```
 */
export const CommandInput = forwardRef<CommandInputRef, CommandInputProps>(
  ({ className, ...props }, ref) => (
    // eslint-disable-next-line react/no-unknown-property
    <div className={inputWrapper()} cmdk-input-wrapper=''>
      <MagnifyingGlassIcon className={inputIcon()} />
      <CMDKInput ref={ref} className={input({ className })} {...props} />
    </div>
  ),
);

CommandInput.displayName = CMDKInput.displayName;

type CommandListRef = React.ElementRef<typeof CMDKList>;
type CommandListProps = React.ComponentPropsWithoutRef<typeof CMDKList>;

/**
 * CommandList component that wraps the list of command items.
 *
 * @param {CommandListProps} props - The props for the CommandList component.
 *
 * @example
 * ```tsx
 * <CommandList>
 *   <CommandItem>...</CommandItem>
 * </CommandList>
 * ```
 */
export const CommandList = forwardRef<CommandListRef, CommandListProps>(
  ({ className, ...props }, ref) => (
    <CMDKList ref={ref} className={list({ className })} {...props} />
  ),
);

CommandList.displayName = CMDKList.displayName;

type CommandEmptyRef = React.ElementRef<typeof CMDKEmpty>;
type CommandEmptyProps = React.ComponentPropsWithoutRef<typeof CMDKEmpty>;

/**
 * CommandEmpty component that displays a message when no results are found.
 *
 * @param {CommandEmptyProps} props - The props for the CommandEmpty component.
 *
 * @example
 * ```tsx
 * <CommandEmpty>No results found.</CommandEmpty>
 * ```
 */
export const CommandEmpty = forwardRef<CommandEmptyRef, CommandEmptyProps>(
  ({ className, ...props }, ref) => (
    <CMDKEmpty ref={ref} className={empty({ className })} {...props} />
  ),
);

CommandEmpty.displayName = CMDKEmpty.displayName;

type CommandGroupRef = React.ElementRef<typeof CMDKGroup>;
type CommandGroupProps = React.ComponentPropsWithoutRef<typeof CMDKGroup>;

/**
 * CommandGroup component that groups related command items.
 *
 * @param {CommandGroupProps} props - The props for the CommandGroup component.
 *
 * @example
 * ```tsx
 * <CommandGroup heading='Suggestions'>
 *   <CommandItem>...</CommandItem>
 * </CommandGroup>
 * ```
 */
export const CommandGroup = forwardRef<CommandGroupRef, CommandGroupProps>(
  ({ className, ...props }, ref) => (
    <CMDKGroup ref={ref} className={group({ className })} {...props} />
  ),
);

CommandGroup.displayName = CMDKGroup.displayName;

type CommandItemRef = React.ElementRef<typeof CMDKItem>;
type CommandItemProps = React.ComponentPropsWithoutRef<typeof CMDKItem>;

/**
 * CommandItem component that represents a single item in the command list.
 *
 * @param {CommandItemProps} props - The props for the CommandItem component.
 *
 * @example
 * ```tsx
 * <CommandItem>...</CommandItem>
 * ```
 */
export const CommandItem = forwardRef<CommandItemRef, CommandItemProps>(
  ({ className, ...props }, ref) => (
    <CMDKItem ref={ref} className={item({ className })} {...props} />
  ),
);

CommandItem.displayName = CMDKItem.displayName;

type CommandShortcutProps = React.HTMLAttributes<HTMLSpanElement>;

/**
 * CommandShortcut component that displays a keyboard shortcut for a command item.
 *
 * @param {CommandShortcutProps} props - The props for the CommandShortcut component.
 *
 * @example
 * ```tsx
 * <CommandShortcut>⌘K</CommandShortcut>
 * ```
 */
export const CommandShortcut = ({
  className,
  ...props
}: CommandShortcutProps) => {
  return <span className={shortcut({ className })} {...props} />;
};

type CommandSeparatorRef = React.ElementRef<typeof CMDKSeparator>;
type CommandSeparatorProps = React.ComponentPropsWithoutRef<
  typeof CMDKSeparator
>;

/**
 * CommandSeparator component that visually separates command items.
 *
 * @param {CommandSeparatorProps} props - The props for the CommandSeparator component.
 *
 * @example
 * ```tsx
 * <CommandSeparator />
 * ```
 */
export const CommandSeparator = forwardRef<
  CommandSeparatorRef,
  CommandSeparatorProps
>(({ className, ...props }, ref) => (
  <CMDKSeparator ref={ref} className={separator({ className })} {...props} />
));

CommandSeparator.displayName = CMDKSeparator.displayName;
