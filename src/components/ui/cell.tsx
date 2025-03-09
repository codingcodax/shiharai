import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx/lite';
import { tv } from 'tailwind-variants';

const cellStyles = tv({
  slots: {
    group: '',
    groupTitle: clsx('px-4 pb-4 pt-8 text-sm/4 text-grey-text', 'first:pt-4'),
    cells: 'divide-y divide-grey-line/40',
    cell: clsx(
      'relative inline-flex w-full gap-x-1 overflow-hidden px-4 py-2.5 text-left text-sm/6 text-grey-text-contrast outline-none transition-colors duration-200',
      'hover:bg-grey-bg-subtle',
      'active:bg-grey-bg',
      'focus-visible:z-[1] focus-visible:ring-4 focus-visible:ring-primary-focus-ring',
      '[&>svg]:h-6 [&>svg]:w-4',
    ),
    cellBody: 'flex-1',
    cellTitle: '',
    cellLabel: 'leading-[18px] text-grey-text',
    cellValue: 'block text-right text-grey-text',
  },
});

const {
  group,
  groupTitle,
  cells,
  cell,
  cellBody,
  cellTitle,
  cellLabel,
  cellValue,
} = cellStyles();

type CellGroupProps = React.ComponentPropsWithoutRef<'div'>;

export const CellGroup = forwardRef<HTMLDivElement, CellGroupProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={group({ className })} {...props} />
  ),
);

CellGroup.displayName = 'CellGroup';

type CellGroupTitleProps = React.ComponentPropsWithoutRef<'h2'>;

export const CellGroupTitle = forwardRef<
  HTMLHeadingElement,
  CellGroupTitleProps
>(({ className, ...props }, ref) => (
  <h2 ref={ref} className={groupTitle({ className })} {...props} />
));

CellGroupTitle.displayName = 'CellGroupTitle';

type CellsProps = React.ComponentPropsWithoutRef<'div'>;

export const Cells = forwardRef<HTMLDivElement, CellsProps>(
  ({ className, role = 'list', ...props }, ref) => (
    <div ref={ref} className={cells({ className })} role={role} {...props} />
  ),
);

Cells.displayName = 'Cells';

type CellProps = React.ComponentPropsWithoutRef<'button'> & {
  asChild?: boolean;
};

export const Cell = forwardRef<HTMLButtonElement, CellProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return <Comp ref={ref} className={cell({ className })} {...props} />;
  },
);

Cell.displayName = 'Cell';

type CellBodyProps = React.ComponentPropsWithoutRef<'div'>;

export const CellBody = forwardRef<HTMLDivElement, CellBodyProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cellBody({ className })} {...props} />
  ),
);

CellBody.displayName = 'CellBody';

type CellTitleProps = React.ComponentPropsWithoutRef<'span'>;

export const CellTitle = forwardRef<HTMLSpanElement, CellTitleProps>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cellTitle({ className })} {...props} />
  ),
);

CellTitle.displayName = 'CellTitle';

type CellLabelProps = React.ComponentPropsWithoutRef<'div'>;

export const CellLabel = forwardRef<HTMLDivElement, CellLabelProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cellLabel({ className })} {...props} />
  ),
);

CellLabel.displayName = 'CellLabel';

type CellValueProps = React.ComponentPropsWithoutRef<'span'>;

export const CellValue = forwardRef<HTMLSpanElement, CellValueProps>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cellValue({ className })} {...props} />
  ),
);

CellValue.displayName = 'CellValue';
