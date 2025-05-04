import { PencilSimple } from "@phosphor-icons/react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

type props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  placeholder: string;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
  classNameBox: string;
  classNameInput: string;
  classNameIcon: string;
};

export const Input = <T extends FieldValues>({
  control,
  name,
  placeholder = "Enter text...",
  rules,
  classNameBox,
  classNameInput,
  classNameIcon,
}: props<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur, ref },
        formState: { errors },
      }) => {
        return (
          <div
            className={classNameBox}
            style={{
              borderBottom:
                errors.name?.type === "required"
                  ? "1px solid red"
                  : "1px solid rgba(255, 255, 255, .3)",
            }}
          >
            <input
              className={classNameInput}
              type="text"
              placeholder={placeholder}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              value={value}
            />
            <PencilSimple size={18} className={classNameIcon} />
          </div>
        );
      }}
    />
  );
};
