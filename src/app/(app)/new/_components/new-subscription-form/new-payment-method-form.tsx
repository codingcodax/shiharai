import type { DropdownNavProps, DropdownProps } from 'react-day-picker';
import { useRef, useState } from 'react';
import { CalendarIcon, CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
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
import { Switch } from '~/components/ui/switch';
import { paymentMethodTypes } from '~/config/payment-methods';
import { NewPaymentMethod } from './schema';

export const NewPaymentMethodForm = () => {
  const [typeIsOpen, setTypeIsOpen] = useState(false);
  const paymentMethodTypeButtonRef = useRef<HTMLButtonElement>(null);
  const form = useForm({
    schema: NewPaymentMethod,
    defaultValues: {
      type: 'CREDIT_CARD',
      label: '',
      expirationDate: undefined,
      isDefault: false,
    },
  });

  const handleCalendarChange = (
    _value: string | number,
    _e: React.ChangeEventHandler<HTMLSelectElement>,
  ) => {
    const _event = {
      target: {
        value: String(_value),
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    _e(_event);
  };

  const onSubmit = (data: NewPaymentMethod) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        className='space-y-4 px-4'
        id='new-payment-method-form'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Popover open={typeIsOpen} onOpenChange={setTypeIsOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      ref={paymentMethodTypeButtonRef}
                      className='w-full justify-between font-normal'
                      role='combobox'
                      variant='outline'
                    >
                      {field.value
                        ? paymentMethodTypes.find(
                            (paymentMethodType) =>
                              paymentMethodType.value === field.value,
                          )?.label
                        : 'Select type'}
                      <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className='p-0'
                  style={{
                    width: `${paymentMethodTypeButtonRef.current?.clientWidth}px`,
                  }}
                >
                  <Command
                    filter={(value, search) => {
                      const normalizedValue = value
                        .toLowerCase()
                        .replace(/_/g, ' ');
                      const normalizedSearch = search.toLowerCase();
                      return normalizedValue.includes(normalizedSearch) ? 1 : 0;
                    }}
                  >
                    <CommandInput
                      className='h-9'
                      placeholder='Search type...'
                    />
                    <CommandList>
                      <CommandEmpty>No type found.</CommandEmpty>
                      <CommandGroup>
                        {paymentMethodTypes.map(({ value, label }) => (
                          <CommandItem
                            key={value}
                            value={value}
                            onSelect={() => {
                              form.setValue('type', value);
                              setTypeIsOpen(false);
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

        <FormField
          control={form.control}
          name='label'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Main' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='expirationDate'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiration date</FormLabel>
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
                    hideNavigation
                    captionLayout='dropdown'
                    className='rounded-lg border p-2'
                    classNames={{ month_caption: 'mx-0' }}
                    components={{
                      DropdownNav: (props: DropdownNavProps) => (
                        <div className='flex w-full items-center gap-2'>
                          {props.children}
                        </div>
                      ),
                      Dropdown: (props: DropdownProps) => {
                        return (
                          <Select
                            value={String(props.value)}
                            onValueChange={(value) => {
                              if (props.onChange) {
                                handleCalendarChange(value, props.onChange);
                              }
                            }}
                          >
                            <SelectTrigger className='h-8 w-fit font-medium first:grow'>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent
                              className='max-h-[min(26rem,var(--radix-select-content-available-height))]'
                              position='popper'
                            >
                              {props.options?.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  disabled={option.disabled}
                                  value={String(option.value)}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        );
                      },
                    }}
                    disabled={{
                      before: new Date(),
                      after: new Date(new Date().getFullYear() + 10),
                    }}
                    endMonth={new Date(new Date().getFullYear() + 10, 0)}
                    mode='single'
                    selected={field.value}
                    startMonth={new Date(new Date().getFullYear() - 1, 0)}
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
          name='isDefault'
          render={({ field }) => (
            <FormItem className='flex justify-between space-y-0'>
              <FormLabel className='text-sm/5'>
                Is this the default payment method?
              </FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked: boolean) => {
                    field.onChange(checked);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
