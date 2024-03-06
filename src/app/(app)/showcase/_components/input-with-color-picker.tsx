import { ShowcaseType } from "@schemas/showcaseSchema";
import { Button } from "@ui/button";
import { InputFormField } from "@ui/input/input-form-field";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { Loader, Palette } from "lucide-react";
import dynamic from "next/dynamic";
import { UseFormReturn } from "react-hook-form";

const HexColorPicker = dynamic(
  () => import("react-colorful").then((Comp) => Comp.HexColorPicker),
  {
    ssr: false,
    loading: () => (
      <div>
        <Loader className="animate-spin" />
      </div>
    ),
  }
);

type Props = {
  form: UseFormReturn<ShowcaseType>;
  label: string;
  name: any;
};

const InputWithColorPicker = ({ form, label, name }: Props) => {
  return (
    <div className="flex items-end gap-2">
      <InputFormField label={label} name={name} readOnly />

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary" className="w-10 h-10 p-2">
            <Palette />
          </Button>
        </PopoverTrigger>

        <PopoverContent sideOffset={15} className="max-w-none w-auto">
          <HexColorPicker
            color={form.watch(name)}
            onChange={(value) => form.setValue(name, value)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default InputWithColorPicker;
