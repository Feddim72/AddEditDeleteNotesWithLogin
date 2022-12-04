import { FieldTooltipError } from "components/fieldTooltipError";
import React, { ReactNode, useState } from "react";
import { FieldError, RegisterOptions } from "react-hook-form";

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  isWithBorder?: boolean;
  label?: string;
  error?: FieldError;
  numberArrows?: ReactNode;
  rules?: RegisterOptions;
  labelIcons?: JSX.Element;
};

EventTarget;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      type = "text",
      minLength,
      className,
      isWithBorder = true,
      label,
      value,
      onChange,
      step = 1,
      numberArrows,
      error,
      disabled,
      onBlur,
      rules,
      placeholder,
      labelIcons,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
      <div
        className={`w-full rounded-md relative shadow-light flex flex-col justify-center bg-white h-[48px] px-4 
        ${type === "number" && "pr-7"}

        ${
          !!error
            ? `shadow-error ${
                type === "text" || type === "email" || type === "password"
                  ? "pr-11"
                  : "pr-16"
              }`
            : "border-white"
        }
        ${(type === "date" || type === "month") && "pr-3 xl:!pr-0.5"} 
        ${disabled && "text-gray-500 bg-gray-100"}
        ${className}`}
      >
        {label && (
          <label
            className={`flex flex-row items-center gap-2 mobileM:text-[13px] mobileS:text-xs ml-2 text-gray-400 font-normal text-sm transition-all absolute origin-left pointer-events-none ${
              (value ||
                value === "0" ||
                isFocused ||
                type === "date" ||
                type === "month") &&
              "transform -translate-y-3 scale-75"
            }`}
            htmlFor={id || props.name}
          >
            {/* {type === "email" && <HiOutlineMail />}
            {type === "password" && <HiOutlineLockClosed />}  */}
            {labelIcons}
            {label}
            {rules?.required === true && (
              <span className="text-red-600"> *</span>
            )}
          </label>
        )}

        <FieldTooltipError
          error={error}
          isWithIcon={
            type !== "text" && type !== "email" && type !== "password"
          }
          className={type === "date" || type === "month" ? "xl:right-10" : ""}
          rules={rules}
        />
        <input
          minLength={minLength}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            onBlur?.(e);
            setIsFocused(false);
          }}
          id={id || props.name}
          step={step}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          {...props}
          ref={ref}
          className={`block focus:outline-none w-full min-w-0 text-sm  bg-white border-gray-300 border-b-2
            ${!!label && "pt-2"}    
            ${disabled && "bg-gray-100"}
            ${error && "has-error"}`}
        />
        {numberArrows}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
