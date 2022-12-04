import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";
import { FieldError, RegisterOptions } from "react-hook-form";
import { MdInfoOutline } from "react-icons/md";
import Tooltip from "./common/tooltip";

interface FieldTooltipErrorProps {
  error?: FieldError;
  className?: string;
  isWithIcon?: boolean;
  rules?: RegisterOptions;
}

const FieldTooltipError = ({
  error,
  isWithIcon,
  className,
  rules,
}: FieldTooltipErrorProps) => {
  const { t } = useTranslation("common");
  // todo
  const validation: any = {
    required: "The field required",
    maxLength: "Too many characters",
    minLength: "Minimum number of characters 8",
  };

  return error ? (
    <div
      className={`absolute right-8 top-0 flex items-center h-[48px] 
      ${isWithIcon ? "right-8" : "right-3"}
      ${className}`}
    >
      <Tooltip
        placement="top"
        color="red"
        trigger={
          <div className="text-2xl text-red-600 pl-px">
            <MdInfoOutline />
          </div>
        }
      >
        <Trans
          i18nKey={
            error.message && error.type !== "required"
              ? error.message
              : validation[error.type]
            // : `common:form.validation.${error.type}`
          }
          values={
            rules
              ? Object.fromEntries(
                  Object.entries(rules).filter(
                    ([k, v]) => typeof v === "string" || typeof v === "number"
                  )
                )
              : {}
          }
        />
      </Tooltip>
    </div>
  ) : null;
};

export { FieldTooltipError };
