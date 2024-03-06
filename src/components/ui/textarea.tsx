import * as React from "react";

import { cn } from "@utils/cn";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Control, FieldValues } from "react-hook-form";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isFormField?: boolean;
  label?: string;
  containerName?: string;
  description?: string;
  control?: Control<FieldValues>;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      isFormField = true,
      className,
      containerName,
      name,
      label,
      control,
      description,
      ...props
    },
    ref
  ) => {
    if (!isFormField)
      return (
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      );

    return (
      <FormField
        control={control}
        name={name!}
        render={({ field, formState }) => (
          <FormItem className={cn("w-full space-y-1", containerName)}>
            <FormLabel htmlFor={name}>
              {label}{" "}
              {props?.required && <span className="text-destructive">*</span>}
            </FormLabel>

            <FormControl>
              <Textarea
                {...field}
                ref={ref}
                {...props}
                name={name}
                id={name}
                disabled={formState.isSubmitting}
                isFormField={false}
              />
            </FormControl>

            {description && <FormDescription>{description}</FormDescription>}

            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
