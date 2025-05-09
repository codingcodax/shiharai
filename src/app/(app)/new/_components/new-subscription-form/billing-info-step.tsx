'use client';

import { useEffect, useId, useRef, useState } from 'react';
import {
  CalendarIcon,
  CaretSortIcon,
  CheckIcon,
  ClockIcon,
  PlusIcon,
} from '@radix-ui/react-icons';
import { clsx } from 'clsx/lite';
import { format } from 'date-fns';

import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Skeleton } from '~/components/ui/skeleton';
import { timezones } from '~/config/timezones';
import { api } from '~/trpc/react';
import { useNewSubscriptionContext } from './context';
import { NewPaymentMethodDrawer } from './new-payment-method-drawer';
import { NewSubscriptionBillingInfo } from './schema';

export const BillingInfoStep = () => {
  const { data: paymentMethods, isLoading: paymentMethodsIsLoading } =
    api.paymentMethod.getAll.useQuery();
  const [timezoneIsOpen, setTimezoneIsOpen] = useState(false);
  const timezoneButtonRef = useRef<HTMLButtonElement>(null);
  const [paymentMethodIsOpen, setPaymentMethodIsOpen] = useState(false);
  const paymentMethodButtonRef = useRef<HTMLButtonElement>(null);
  const timeId = useId();
  const { formData, updateFormData, prevStep, nextStep } =
    useNewSubscriptionContext();
  const form = useForm({
    schema: NewSubscriptionBillingInfo,
    defaultValues: {
      billingCycle: formData.billingCycle,
      nextBillingDate: formData.nextBillingDate,
      timezone: formData.timezone,
      paymentMethodId: '',
    },
  });

  const onSubmit = (data: NewSubscriptionBillingInfo) => {
    updateFormData(data);
    nextStep();
  };

  useEffect(() => {
    if (paymentMethods && paymentMethods.length > 0) {
      const defaultPaymentMethod = paymentMethods.find(
        (paymentMethod) => paymentMethod.isDefault,
      );

      if (defaultPaymentMethod) {
        form.setValue('paymentMethodId', defaultPaymentMethod.id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethods, form.setValue]);

  return (
    <div className='space-y-6'>
      <div className='space-y-1'>
        <h2 className='text-xl font-bold'>Billing Info</h2>
        <p className='text-wrap text-grey-text'>
          Please enter the billing information for your subscription.
        </p>
      </div>

      <Form {...form}>
        <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='billingCycle'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billing Cycle</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a billing cycle' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position='popper'>
                      <SelectItem value='DAYS'>Daily</SelectItem>
                      <SelectItem value='WEEKS'>Weekly</SelectItem>
                      <SelectItem value='MONTHS'>Monthly</SelectItem>
                      <SelectItem value='YEARS'>Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='nextBillingDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Next Billing Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          className='w-full justify-between font-normal'
                          role='combobox'
                          variant='outline'
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align='start' className='w-auto p-0'>
                      <Calendar
                        autoFocus
                        className='p-2'
                        disabled={(date) =>
                          date <
                            new Date(
                              new Date().getTime() - 1 * 24 * 60 * 60 * 1000,
                            ) || date < new Date(new Date().getFullYear() + 1)
                        }
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                      <div className='border-t p-3'>
                        <div className='flex items-center gap-3'>
                          <Label className='sr-only' htmlFor={timeId}>
                            Enter time
                          </Label>
                          <div className='relative grow'>
                            <Input
                              className='peer appearance-none ps-9 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
                              defaultValue={`${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}:${String(new Date().getSeconds()).padStart(2, '0')}`}
                              id={timeId}
                              step='1'
                              type='time'
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value) {
                                  const nextBillingDate =
                                    form.getValues('nextBillingDate');
                                  const [hour, minute, second] = value
                                    .split(':')
                                    .map((v) => parseInt(v, 10));
                                  const updatedNextBillingDate = new Date(
                                    nextBillingDate.getTime() +
                                      (hour ?? 0) * 60 * 60 * 1000 +
                                      (minute ?? 0) * 60 * 1000 +
                                      (second ?? 0) * 1000,
                                  );
                                  form.setValue(
                                    'nextBillingDate',
                                    updatedNextBillingDate,
                                  );
                                }
                              }}
                            />
                            <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-grey-text peer-disabled:text-grey-solid'>
                              <ClockIcon
                                aria-hidden='true'
                                className='size-4'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='timezone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Timezone</FormLabel>
                  <Popover
                    open={timezoneIsOpen}
                    onOpenChange={setTimezoneIsOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          ref={timezoneButtonRef}
                          className='w-full justify-between font-normal'
                          role='combobox'
                          variant='outline'
                        >
                          <span className='truncate'>
                            {field.value
                              ? timezones.find(
                                  (timezone) => timezone.value === field.value,
                                )?.label
                              : 'Select timezone'}
                          </span>
                          <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className='p-0'
                      style={{
                        width: `${timezoneButtonRef.current?.clientWidth}px`,
                      }}
                    >
                      <Command
                        filter={(value, search) => {
                          const normalizedValue = value.toLowerCase();
                          const normalizedSearch = search
                            .toLowerCase()
                            .replace(/\s+/g, '');
                          return normalizedValue.includes(normalizedSearch)
                            ? 1
                            : 0;
                        }}
                      >
                        <CommandInput placeholder='Search timezone...' />
                        <CommandList>
                          <CommandEmpty>No timezone found.</CommandEmpty>
                          <CommandGroup className='max-h-[30vh] overflow-auto'>
                            {timezones.map(({ value, label }) => (
                              <CommandItem
                                key={value}
                                value={value}
                                onSelect={() => {
                                  console.log(value);
                                  form.setValue('timezone', value);
                                  setTimezoneIsOpen(false);
                                }}
                              >
                                {label}
                                <CheckIcon
                                  className={clsx(
                                    'ml-auto h-4 w-4',
                                    value === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {paymentMethodsIsLoading && (
              <div className='space-y-2'>
                <Label>Payment Method</Label>
                <div className='flex gap-x-2'>
                  <Skeleton className='w-full' />
                  <Skeleton className='size-9 shrink-0' />
                </div>
              </div>
            )}

            {paymentMethods && paymentMethods?.length > 0 ? (
              <FormField
                control={form.control}
                name='paymentMethodId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <div className='flex gap-x-2'>
                      <Popover
                        open={paymentMethodIsOpen}
                        onOpenChange={setPaymentMethodIsOpen}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              ref={paymentMethodButtonRef}
                              className='w-full justify-between font-normal'
                              role='combobox'
                              variant='outline'
                            >
                              <span className='truncate'>
                                {field.value
                                  ? paymentMethods.find(
                                      (paymentMethod) =>
                                        paymentMethod.id === field.value,
                                    )?.label
                                  : 'Select a payment method'}
                              </span>
                              <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className='p-0'
                          style={{
                            width: `${paymentMethodButtonRef.current?.clientWidth}px`,
                          }}
                        >
                          <Command
                            filter={(value, search) => {
                              const normalizedValue = value.toLowerCase();
                              const normalizedSearch = search
                                .toLowerCase()
                                .replace(/\s+/g, '');
                              return normalizedValue.includes(normalizedSearch)
                                ? 1
                                : 0;
                            }}
                          >
                            <CommandInput placeholder='Search payment method...' />
                            <CommandList>
                              <CommandEmpty>
                                No payment method found.
                              </CommandEmpty>
                              <CommandGroup className='max-h-[30vh] overflow-auto'>
                                {paymentMethods.map((paymentMethod) => (
                                  <CommandItem
                                    key={paymentMethod.id}
                                    value={paymentMethod.id}
                                    onSelect={() => {
                                      form.setValue(
                                        'paymentMethodId',
                                        paymentMethod.id,
                                      );
                                      setPaymentMethodIsOpen(false);
                                    }}
                                  >
                                    {paymentMethod.label}
                                    <CheckIcon
                                      className={clsx(
                                        'ml-auto h-4 w-4',
                                        paymentMethod.id === field.value
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      <NewPaymentMethodDrawer>
                        <Button icon variant='outline'>
                          <PlusIcon />
                          <span className='sr-only'>
                            Create a payment method
                          </span>
                        </Button>
                      </NewPaymentMethodDrawer>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}

            {paymentMethods && paymentMethods?.length <= 0 ? (
              <div className='space-y-2'>
                <NewPaymentMethodDrawer>
                  <Button className='w-full' variant='outline'>
                    <PlusIcon />
                    Create a payment method
                  </Button>
                </NewPaymentMethodDrawer>

                {form.formState.errors.paymentMethodId && (
                  <p className='text-sm font-medium text-error-solid'>
                    A payment method is needed to create your subscription.
                  </p>
                )}
              </div>
            ) : null}
          </div>

          <div className='flex gap-x-2'>
            <Button
              className='flex-1'
              type='button'
              variant='outline'
              onClick={prevStep}
            >
              Previous
            </Button>
            <Button
              className='flex-1'
              disabled={paymentMethodsIsLoading}
              type='submit'
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
