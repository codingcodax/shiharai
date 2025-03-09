'use client';

import { useEffect, useRef, useState } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { clsx } from 'clsx/lite';
import { MinusIcon, PlusIcon } from 'lucide-react';

import { Button } from '~/components/ui/button';
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
import { Skeleton } from '~/components/ui/skeleton';
import { Switch } from '~/components/ui/switch';
import { Textarea } from '~/components/ui/textarea';
import { currencies } from '~/config/currencies';
import { api } from '~/trpc/react';
import { useNewSubscriptionContext } from './context';
import { NewSubscriptionDetails } from './schema';

export const DetailsStep = () => {
  const { data: user, isLoading: userIsLoading } = api.user.getById.useQuery(
    {},
  );
  const [currencyIsOpen, setCurrencyIsOpen] = useState(false);
  const currencyButtonRef = useRef<HTMLButtonElement>(null);
  const { formData, updateFormData, nextStep } = useNewSubscriptionContext();

  const form = useForm({
    schema: NewSubscriptionDetails,
    defaultValues: {
      logo: formData.logo,
      name: formData.name,
      price: formData.price,
      currency: formData.currency,
      freeTrial: formData.freeTrial,
      trialDays: formData.trialDays,
      tier: formData.tier,
      notes: formData.notes,
      url: formData.url,
    },
  });

  const onSubmit = (data: NewSubscriptionDetails) => {
    updateFormData(data);
    nextStep();
  };

  useEffect(() => {
    if (user) {
      const defaultCurrency = user.currency ?? 'USD';

      form.setValue('currency', defaultCurrency);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, form.setValue]);

  return (
    <div className='space-y-6'>
      <div className='space-y-1'>
        <h2 className='text-xl font-bold'>Subscription Details</h2>
        <p className='text-wrap text-grey-text'>
          Please provide the details for your subscription.
        </p>
      </div>

      <Form {...form}>
        <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='logo'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='https://i.imgur.com/dJJHsuf.png'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Netflix' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='price'>Price</FormLabel>
                  <FormControl>
                    <div
                      className={clsx(
                        'group relative rounded-lg border transition-colors duration-200',
                        'aria-[invalid=true]:border-error-border',
                        'aria-[invalid=true]:hover:border-error-border-hover',
                      )}
                    >
                      <Button
                        icon
                        aria-label='Decrease'
                        className='absolute inset-y-0 left-0 shrink-0 rounded-r-none border-0 border-r'
                        tabIndex={-1}
                        type='button'
                        variant='outline'
                        onClick={() => {
                          if (field.value <= 0) return;

                          field.onChange(Number(field.value) - 1);
                        }}
                      >
                        <MinusIcon />
                      </Button>
                      <Input
                        {...field}
                        autoComplete='off'
                        autoCorrect='off'
                        className='border-0 px-12'
                        id='price'
                        inputMode='numeric'
                        placeholder='24.99'
                        spellCheck={false}
                        type='number'
                        value={field.value === 0 ? '' : field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                      <Button
                        icon
                        aria-label='Increase'
                        className='absolute inset-y-0 right-0 shrink-0 rounded-l-none border-0 border-l'
                        tabIndex={-1}
                        type='button'
                        variant='outline'
                        onClick={() => {
                          field.onChange(Number(field.value) + 1);
                        }}
                      >
                        <PlusIcon />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {userIsLoading && (
              <div className='space-y-2'>
                <Label>Currency</Label>
                <Skeleton className='h-9 w-full' />
              </div>
            )}

            {user ? (
              <FormField
                control={form.control}
                name='currency'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Popover
                      open={currencyIsOpen}
                      onOpenChange={setCurrencyIsOpen}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            ref={currencyButtonRef}
                            className='w-full justify-between font-normal'
                            role='combobox'
                            variant='outline'
                          >
                            {field.value ? (
                              <div className='space-x-2'>
                                <span className='max-w-full truncate'>
                                  {
                                    currencies[
                                      field.value as keyof typeof currencies
                                    ].name
                                  }
                                </span>
                                <span className='max-w-full flex-1 truncate text-xs/5 text-grey-text'>
                                  {field.value} (
                                  {
                                    currencies[
                                      field.value as keyof typeof currencies
                                    ].symbol
                                  }
                                  )
                                </span>
                              </div>
                            ) : (
                              <span>Select currency</span>
                            )}
                            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className='p-0'
                        style={{
                          width: `${currencyButtonRef.current?.clientWidth}px`,
                        }}
                      >
                        <Command
                          filter={(value, search) => {
                            const currency =
                              currencies?.[value as keyof typeof currencies];
                            if (!currency) return 0;

                            const searchLower = search.toLowerCase();

                            const result =
                              Number(
                                value.toLowerCase().includes(searchLower),
                              ) ||
                              Number(
                                currency.name
                                  .toLowerCase()
                                  .includes(searchLower),
                              ) ||
                              Number(
                                currency.symbol
                                  .toLowerCase()
                                  .includes(searchLower),
                              );

                            return result;
                          }}
                        >
                          <CommandInput
                            className='h-9'
                            placeholder='Search currency...'
                          />
                          <CommandList>
                            <CommandEmpty>
                              No resource group found.
                            </CommandEmpty>
                            <CommandGroup className='max-h-[30vh] overflow-auto'>
                              {Object.entries(currencies).map(
                                ([name, value]) => (
                                  <CommandItem
                                    key={name}
                                    className='gap-x-2'
                                    value={name}
                                    onSelect={() => {
                                      form.setValue('currency', name);
                                      setCurrencyIsOpen(false);
                                    }}
                                  >
                                    <span>{value.name} </span>
                                    <span className='text-xs/5 text-grey-text'>
                                      {name} ({value.symbol})
                                    </span>
                                    <CheckIcon
                                      className={clsx(
                                        'ml-auto h-4 w-4',
                                        name === field.value
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                  </CommandItem>
                                ),
                              )}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}

            <Collapsible.Root
              className='space-y-4'
              open={form.getValues('freeTrial')}
            >
              <Collapsible.Trigger asChild>
                <FormField
                  control={form.control}
                  name='freeTrial'
                  render={({ field }) => (
                    <FormItem className='flex justify-between space-y-0'>
                      <FormLabel className='text-sm/5'>
                        It is a free trial?
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked: boolean) => {
                            field.onChange(checked);

                            if (!checked) form.setValue('trialDays', 0);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Collapsible.Trigger>

              <Collapsible.Content>
                <FormField
                  control={form.control}
                  name='trialDays'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='trial-days'>Trial Days</FormLabel>
                      <FormControl>
                        <div
                          className={clsx(
                            'group relative rounded-lg border transition-colors duration-200',
                            'aria-[invalid=true]:border-error-border',
                            'aria-[invalid=true]:hover:border-error-border-hover',
                          )}
                        >
                          <Button
                            icon
                            aria-label='Decrease'
                            className='absolute inset-y-0 left-0 shrink-0 rounded-r-none border-0 border-r'
                            tabIndex={-1}
                            type='button'
                            variant='outline'
                            onClick={() => {
                              if (field.value <= 0) return;
                              if (field.value <= 1)
                                form.setValue('freeTrial', false);

                              field.onChange(Number(field.value) - 1);
                            }}
                          >
                            <MinusIcon />
                          </Button>
                          <Input
                            {...field}
                            autoComplete='off'
                            autoCorrect='off'
                            className='grou-aria-invalid:focus:ring-error-focus-ring border-0 px-12'
                            id='trial-days'
                            inputMode='numeric'
                            placeholder='30'
                            spellCheck={false}
                            type='number'
                            value={field.value === 0 ? '' : field.value}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                          <Button
                            icon
                            aria-label='Increase'
                            className='absolute inset-y-0 right-0 shrink-0 rounded-l-none border-0 border-l'
                            tabIndex={-1}
                            type='button'
                            variant='outline'
                            onClick={() => {
                              const freeTrial = form.getValues('freeTrial');

                              if (!freeTrial && field.value === 0)
                                form.setValue('freeTrial', true);

                              field.onChange(Number(field.value) + 1);
                            }}
                          >
                            <PlusIcon />
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Collapsible.Content>
            </Collapsible.Root>

            <FormField
              control={form.control}
              name='tier'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tier</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Premium' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='notes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="I'm going to see Squid Games"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='url'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='https://www.netflix.com/account/membership'
                      type='url'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex gap-x-2'>
            <Button className='flex-1' disabled={userIsLoading} type='submit'>
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
