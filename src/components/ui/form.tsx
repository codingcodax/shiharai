'use client';

import * as React from 'react';
import type { ZodType } from 'zod';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { type Label as LabelPrimitive, Slot as SlotPrimitive } from 'radix-ui';

import {
	useForm as __useForm,
	Controller,
	type ControllerProps,
	type FieldPath,
	type FieldValues,
	FormProvider,
	type UseFormProps,
	useFormContext,
	useFormState,
} from 'react-hook-form';
import { Label } from '~/components/ui/label';
import { cn } from '~/utils/cn';

const Form = FormProvider;

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
	{} as FormFieldContextValue,
);

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
};

const useFormField = () => {
	const fieldContext = React.useContext(FormFieldContext);
	const itemContext = React.useContext(FormItemContext);
	const { getFieldState } = useFormContext();
	const formState = useFormState({ name: fieldContext.name });
	const fieldState = getFieldState(fieldContext.name, formState);

	if (!fieldContext) {
		throw new Error('useFormField should be used within <FormField>');
	}

	const { id } = itemContext;

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	};
};

type FormItemContextValue = {
	id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
	{} as FormItemContextValue,
);

function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
	const id = React.useId();

	return (
		<FormItemContext.Provider value={{ id }}>
			<div
				className={cn('grid gap-2', className)}
				data-slot='form-item'
				{...props}
			/>
		</FormItemContext.Provider>
	);
}

function FormLabel({
	className,
	...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
	const { error, formItemId } = useFormField();

	return (
		<Label
			className={cn('data-[error=true]:text-destructive', className)}
			data-error={!!error}
			data-slot='form-label'
			htmlFor={formItemId}
			{...props}
		/>
	);
}

function FormControl({
	...props
}: React.ComponentProps<typeof SlotPrimitive.Root>) {
	const { error, formItemId, formDescriptionId, formMessageId } =
		useFormField();

	return (
		<SlotPrimitive.Root
			aria-describedby={
				!error
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			data-slot='form-control'
			id={formItemId}
			{...props}
		/>
	);
}

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
	const { formDescriptionId } = useFormField();

	return (
		<p
			className={cn('text-muted-foreground text-sm', className)}
			data-slot='form-description'
			id={formDescriptionId}
			{...props}
		/>
	);
}

function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message ?? '') : props.children;

	if (!body) {
		return null;
	}

	return (
		<p
			className={cn('text-destructive text-sm', className)}
			data-slot='form-message'
			id={formMessageId}
			{...props}
		>
			{body}
		</p>
	);
}

function useForm<TOut extends FieldValues, TIn extends FieldValues>(
	props: Omit<UseFormProps<TIn, unknown, TOut>, 'resolver'> & {
		schema: ZodType<TOut, TIn>;
	},
) {
	const form = __useForm<TIn, unknown, TOut>({
		...props,
		resolver: standardSchemaResolver(props.schema, undefined),
	});

	return form;
}

export {
	useFormField,
	Form,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
	FormField,
	useForm,
};
