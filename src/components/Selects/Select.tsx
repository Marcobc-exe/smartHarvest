import { listCrops } from "../../utils/const";
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
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
  classSelect: string;
  classOption: string;
};

export const Select = <T extends FieldValues>({
  control,
  name,
  rules,
  classSelect,
  classOption,
}: props<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, ref, onChange, onBlur, name },
        formState: { errors }
      }) => {
        const strValue = !value ? JSON.stringify(value) : value;
        return (
          <select
            className={classSelect}
            ref={ref}
            name={name}
            style={{
              borderBottom:
                errors.name?.type === "required"
                  ? "1px solid red"
                  : "1px solid rgba(255, 255, 255, .3)",
            }}
            value={strValue}
            onChange={onChange}
            onBlur={onBlur}
          >
            <option className="choose" value="">
              Choose a crop
            </option>
            {listCrops.map((crop) => (
              <option
                key={crop.name}
                className={classOption}
                value={JSON.stringify(crop)}
              >
                {crop.name}
              </option>
            ))}
          </select>
        );
      }}
    />
  );
};
