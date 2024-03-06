import * as React from "react";

import { cn } from "@utils/cn";
import { Control, FieldValues } from "react-hook-form";
import { Input } from ".";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
  description?: string;
  control?: Control<FieldValues>;
}

const InputFormField = React.forwardRef<HTMLInputElement, InputProps>(
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
      render={({ field, formState }) => (
        <FormItem className={cn("w-full space-y-1", containerClassName)}>
          {label && (
            <FormLabel htmlFor={name}>
              {label}{" "}
              {props?.required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}

          <FormControl>
            <Input
              {...field}
              ref={ref}
              {...props}
              name={name}
              value={
                props.type === "file" ? field.value?.fileName : field.value
              }
              onChange={(e) =>
                props.type === "file"
                  ? field.onChange(e.target.files?.[0])
                  : field.onChange(e.target.value)
              }
              disabled={formState.isSubmitting}
            />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage />
        </FormItem>
      )}
    />
  )
);

InputFormField.displayName = "InputFormField";

export { InputFormField };
