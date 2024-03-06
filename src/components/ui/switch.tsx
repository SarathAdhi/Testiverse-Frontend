"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@utils/cn";
import { Control, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

type Props = {
  isFormField?: boolean;
  label?: string;
  containerClassName?: string;
  description?: string;
  control?: Control<FieldValues>;
};

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & Props
>(
  (
    {
      isFormField = true,
      className,
      containerClassName,
      name,
      label,
      control,
      description,
      ...props
    },
    ref
  ) =>
    !isFormField ? (
      <SwitchPrimitives.Root
        className={cn(
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
          className
        )}
        {...props}
        ref={ref}
      >
        <SwitchPrimitives.Thumb
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
          )}
        />
      </SwitchPrimitives.Root>
    ) : (
      <FormField
        control={control}
        name={name!}
        render={({ field, formState }) => (
          <FormItem className={cn("w-full grid gap-1", containerClassName)}>
            {label && (
              <FormLabel htmlFor={name}>
                {label}{" "}
                {props?.required && <span className="text-destructive">*</span>}
              </FormLabel>
            )}

            <FormControl>
              <Switch
                {...field}
                ref={ref}
                {...props}
                checked={field.value}
                onCheckedChange={field.onChange}
                name={name}
                disabled={formState.isSubmitting}
                isFormField={false}
              />
            </FormControl>

            {description && <FormDescription>{description}</FormDescription>}

            <FormMessage />
          </FormItem>
        )}
      />
    )
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
