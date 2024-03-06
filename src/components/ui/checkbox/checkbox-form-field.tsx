"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as React from "react";

import { cn } from "@utils/cn";

import { Control, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";

import { Checkbox } from "./index";

type Props = {
  label?: string;
  containerClassName?: string;
  description?: string;
  control?: Control<FieldValues>;
};

const CheckboxFormField = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & Props
>(
  (
    {
      className,
      containerClassName,
      name,
      label,
      control,
      description,
      ...props
    },
    ref
  ) => (
    <FormField
      control={control}
      name={name!}
      render={({ field }) => (
        <FormItem className={cn("w-full space-y-1", containerClassName)}>
          <div className="flex gap-4">
            <FormControl>
              <Checkbox
                {...field}
                ref={ref}
                {...props}
                name={name}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>

            {label && (
              <FormLabel htmlFor={name}>
                {label}{" "}
                {props?.required && <span className="text-destructive">*</span>}
              </FormLabel>
            )}
          </div>

          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage />
        </FormItem>
      )}
    />
  )
);
CheckboxFormField.displayName = CheckboxPrimitive.Root.displayName;

export { CheckboxFormField };
