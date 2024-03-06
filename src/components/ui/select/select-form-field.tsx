"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import * as React from "react";

import { cn } from "@utils/cn";
import { Control, FieldValues } from "react-hook-form";
import { Select } from ".";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";

type Props = {
  label?: string;
  containerClassName?: string;
  description?: string;
  control?: Control<FieldValues>;
  placeholder?: string;
  options?: {
    label: string;
    value: string;
  }[];
  Wrapper?: React.ExoticComponent<{
    children?: React.ReactNode;
  }>;
};

const SelectFormField = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> & Props
>(
  (
    {
      containerClassName,
      name,
      label,
      control,
      description,
      placeholder,
      options = [],
      Wrapper,
      ...props
    },
    ref
  ) => {
    Wrapper = Wrapper ? Wrapper : React.Fragment;

    return (
      <FormField
        control={control}
        name={name!}
        render={({ field, formState }) => (
          <FormItem className={cn("w-full space-y-1", containerClassName)}>
            {label && (
              <FormLabel htmlFor={name}>
                {label}{" "}
                {props?.required && <span className="text-destructive">*</span>}
              </FormLabel>
            )}

            <Select
              {...{
                name,
                label,
                control,
                description,
                placeholder,
                options,
                ...props,
                ref,
              }}
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={formState.isSubmitting}
              Wrapper={FormControl}
            />

            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);

SelectFormField.displayName = "SelectFormField";

export { SelectFormField };
