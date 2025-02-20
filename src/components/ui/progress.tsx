'use client';

import { forwardRef } from 'react';
import { Indicator, Root } from '@radix-ui/react-progress';
import { tv } from 'tailwind-variants';

const progressStyles = tv({
  slots: {
    base: 'relative h-2 w-full overflow-hidden rounded-full bg-grey-bg',
    indicator: 'size-full flex-1 bg-grey-text-contrast transition-all',
  },
});

const { base, indicator } = progressStyles();

type ProgressRef = React.ElementRef<typeof Root>;
type ProgressProps = React.ComponentPropsWithoutRef<typeof Root>;

/**
 * Progress component that displays the progress of a task.
 *
 * @param {ProgressProps} props - The props for the Progress component.
 * @param {number} [value] - The current progress value (between 0 and 100).
 *
 * @example
 * ```tsx
 * <Progress value={33} />
 * ```
 *
 * @see {@link https://dub.sh/ui-progress Progress Docs} for further information.
 */
export const Progress = forwardRef<ProgressRef, ProgressProps>(
  ({ className, value, ...props }, ref) => (
    <Root ref={ref} className={base({ className })} {...props}>
      <Indicator
        className={indicator()}
        style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      />
    </Root>
  ),
);

Progress.displayName = Root.displayName;
