import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
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

export interface Props {
  label?: string;
  containerClassName?: string;
  className?: string;
  name: string;
  description?: string;
  control?: Control<FieldValues>;
  required?: boolean;
}

const StarRating = ({
  className,
  containerClassName,
  name,
  label,
  control,
  description,
  ...props
}: Props) => {
  return (
    <FormField
      control={control}
      name={name!}
      render={({ field }) => (
        <FormItem className={cn("w-full space-y-1", containerClassName)}>
          {label && (
            <FormLabel htmlFor={name}>
              {label}{" "}
              {props?.required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}

          <FormControl>
            <Rating
              className="max-w-40"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              itemStyles={{
                itemShapes: ThinRoundedStar,
                activeFillColor: "#f59e0b",
                inactiveFillColor: "#ffedd5",
              }}
              isRequired={props?.required}
            />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default StarRating;
