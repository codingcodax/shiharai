import { useRef, useState } from 'react';
import { CalendarIcon, CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
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
import { timezones } from '~/config/timezones';
import { useNewSubscriptionContext } from './context';
import { NewSubscriptionBillingInfo } from './schema';

export const BillingInfoStep = () => {
  const [timezoneIsOpen, setTimezoneIsOpen] = useState(false);
  const timezoneButtonRef = useRef<HTMLButtonElement>(null);
  const { formData, updateFormData, prevStep, nextStep } =
    useNewSubscriptionContext();

  const form = useForm({
    schema: NewSubscriptionBillingInfo,
    defaultValues: {
      billingCycle: formData.billingCycle,
      nextBillingDate: formData.nextBillingDate,
      timezone: formData.timezone,
    },
  });

  const onSubmit = (data: NewSubscriptionBillingInfo) => {
    updateFormData(data);
    nextStep();
  };

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
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                      />
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
            <Button className='flex-1' type='submit'>
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
