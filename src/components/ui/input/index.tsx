import * as React from "react";

import { cn } from "@utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, name, ...props }, ref) => (
    <input
      ref={ref}
      {...props}
      name={name}
      id={name}
      className={cn(className)}
    />
  )
);

Input.displayName = "Input";

export { Input };
