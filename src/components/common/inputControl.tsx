import Input, { InputProps } from "components/form/input";
import { ChangeEvent } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useController,
} from "react-hook-form";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
import {
  convertUTCDateToLocalDate,
  dateToInputFormat,
} from "utils/renderHelpers";

type InputControlProps<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: RegisterOptions;
  prefix?: string;
  onAfterChange?: () => void;
  labelIcons?: JSX.Element;
} & InputProps;

const InputControl = <TFieldValues extends FieldValues = FieldValues>({
  labelIcons,
  control,
  name,
  rules,
  error,
  type,
  onAfterChange,
  disabled,
  prefix = "",
  min,
  ...props
}: InputControlProps<TFieldValues>) => {
  const {
    field: { value, onChange: onChangeControl, ...field },
    fieldState,
  } = useController<any>({ control, name, rules });

  const onChangeMiddleware = (event: ChangeEvent<HTMLInputElement>) => {
    if (type === "date" || type === "month") {
      return onChangeControl(
        event.target.value
          ? convertUTCDateToLocalDate(new Date(event.target.value))
          : event.target.value
      );
    }

    onChangeControl(
      event.target.value.length < prefix.length ? prefix : event.target.value
    );
    setTimeout(() => {
      onAfterChange?.();
    }, 0);
  };

  const getValue = () => {
    if (type === "date") {
      return value ? dateToInputFormat(value) : "";
    }

    if (type === "month") {
      return value ? dateToInputFormat(value).slice(0, 7) : "";
    }

    return typeof value === "string"
      ? value?.startsWith(prefix)
        ? value || ""
        : (prefix || "") + (value || "")
      : value || "";
  };
  return (
    <Input
      labelIcons={labelIcons}
      value={getValue()}
      onChange={onChangeMiddleware}
      type={type}
      rules={rules}
      {...props}
      {...field}
      error={fieldState.error || error}
      disabled={disabled}
      numberArrows={
        type === "number" ? (
          <div
            className={`absolute right-0 top-0 bottom-0 w-7 flex flex-col justify-center 
            ${fieldState.error && "text-red-600"} 
            ${disabled && "pointer-events-none"}`}
          >
            <button
              className="text-base"
              type="button"
              onClick={() =>
                onChangeMiddleware({
                  target: { value: String(Number(value || 0) + 1) },
                } as any)
              }
            >
              <MdOutlineExpandLess />
            </button>
            <button
              className={`text-base ${
                !disabled && min !== undefined && getValue() <= min
                  ? "children:opacity-50"
                  : ""
              }`}
              type="button"
              disabled={min !== undefined ? getValue() <= min : false}
              onClick={() =>
                onChangeMiddleware({
                  target: { value: String(Number(value || 0) - 1) },
                } as any)
              }
            >
              <MdOutlineExpandMore />
            </button>
          </div>
        ) : type === "custom" ? (
          <div
            className={`absolute right-0 top-0 bottom-0 w-7 flex flex-col justify-center 
            ${fieldState.error && "text-red-600"} 
            ${disabled && "pointer-events-none"}`}
          >
            <button
              className="text-base"
              type="button"
              onClick={() =>
                onChangeMiddleware({
                  target: { value: String(Number(value || 0) + 1) },
                } as any)
              }
            >
              <MdOutlineExpandLess />
            </button>
            <button
              className="text-base"
              type="button"
              onClick={() =>
                onChangeMiddleware({
                  target: { value: String(Number(value || 0) - 1) },
                } as any)
              }
            >
              <MdOutlineExpandMore />
            </button>
          </div>
        ) : null
      }
    />
  );
};

export default InputControl;
