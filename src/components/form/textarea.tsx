import {
  DetailedHTMLProps,
  forwardRef,
  ReactNode,
  TextareaHTMLAttributes,
  useState,
} from "react";
import { FieldError, RegisterOptions } from "react-hook-form";
import { mergeRefs } from "react-merge-refs";
import { FieldTooltipError } from "components/fieldTooltipError";
import { useElementSize } from "hooks/useElementSize";

export type TextareaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  isWithBorder?: boolean;
  label?: string;
  error?: FieldError;
  numberArrows?: ReactNode;
  rules?: RegisterOptions;
  labelIcons?: JSX.Element;
};

EventTarget;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      className,
      isWithBorder = true,
      label,
      value,
      onChange,
      disabled,
      error,
      onBlur,
      rules,
      labelIcons,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const { ref: localRef, hasScroll } = useElementSize<HTMLTextAreaElement>();
    return (
      <div
        className={`w-full rounded-md overflow-hidden box-border relative  flex flex-col justify-center h-44 xl:h-72 bg-white p-px
 
        ${!!error ? `shadow-error-outside` : "shadow-light"} 
        ${disabled && "text-gray-500 bg-gray-100"}
        ${className}`}
      >
        <textarea
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            onBlur?.(e);
            setIsFocused(false);
          }}
          id={id || props.name}
          disabled={disabled}
          ref={mergeRefs([localRef, ref])}
          {...props}
          className={`resize-none h-full block focus:outline-none w-full min-w-0 pt-6 pb-3 text-sm px-4 bg-transparent ${
            label && label.length >= 30 && "mobileM:mt-2"
          }
          ${error ? (hasScroll ? "pr-12" : "pr-11") : ""}`}
        />

        {label && (
          <div
            className={`h-[35px] w-[99%] flex items-center absolute top-0 pointer-events-none `}
          >
            <div
              className={`w-[99%] flex items-center transition-transform  bg-white pt-1.5
                ${disabled && "bg-gray-100"}
                ${
                  (value || value === "0" || isFocused) &&
                  "transform -translate-y-3"
                }`}
            >
              <label
                className={`flex font-normal text-gray-400 text-sm transition-transform origin-left ${
                  (value || value === "0" || isFocused) && "scale-75"
                }`}
                htmlFor={id || props.name}
              >
                <span className="flex flex-row items-center ml-2 gap-2">
                  {labelIcons}

                  {label}
                </span>
                {rules?.required === true && (
                  <span className="text-red-600 ml-1"> *</span>
                )}
              </label>
            </div>
          </div>
        )}
        <FieldTooltipError
          error={error}
          isWithIcon={hasScroll}
          className={`${hasScroll && "right-3 xl:right-7"}`}
          rules={rules}
        />
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
