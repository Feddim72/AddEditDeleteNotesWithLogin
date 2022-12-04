import Textarea, { TextareaProps } from "components/form/textarea";
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useController,
} from "react-hook-form";

type TextareaControlProps<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: RegisterOptions;
} & TextareaProps;

const TextareaControl = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  rules,
  error,
  ...props
}: TextareaControlProps<TFieldValues>) => {
  const {
    field: { value, ...field },
    fieldState,
  } = useController<any>({ control, name, rules });
  return (
    <Textarea
      rules={rules}
      {...props}
      value={value || ""}
      {...field}
      error={fieldState.error || error}
    />
  );
};

export default TextareaControl;
