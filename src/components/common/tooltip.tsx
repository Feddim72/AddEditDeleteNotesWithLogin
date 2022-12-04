import Portal from "@reach/portal";
import { Children, cloneElement, isValidElement, ReactNode } from "react";
import { Config, PopperOptions, usePopperTooltip } from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css";

declare const top: "top";
declare const bottom: "bottom";
declare const right: "right";
declare const left: "left";

type BasePlacement = typeof top | typeof bottom | typeof right | typeof left;

type VariationPlacement =
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "right-start"
  | "right-end"
  | "left-start"
  | "left-end";

type AutoPlacement = "auto" | "auto-start" | "auto-end";

type Placement = AutoPlacement | BasePlacement | VariationPlacement;

const colors = {
  white: "!bg-white",
  red: "!bg-red-600 !text-white font-medium red",
};

interface TooltipProps {
  trigger?: ReactNode;
  children?: ReactNode;
  config?: Config;
  color?: keyof typeof colors;
  popperOptions?: PopperOptions;
  hasPadding?: boolean;
  offset?: [0 | 10 | 15 | 20 | number, number | 0 | 10 | 15 | 20];
  placement?: Placement;
  isActionButton?: boolean;
}
const getIsTouchDevice = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

const Tooltip = ({
  trigger,
  children,
  config,
  popperOptions,
  color = "white",
  hasPadding = true,
  offset,
  placement = "top",
  isActionButton = false,
  ...props
}: TooltipProps) => {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({ ...config, offset, placement }, popperOptions);

  const cloneElementTrik: any = cloneElement;

  return (
    <>
      {isValidElement(trigger) ? (
        cloneElementTrik(Children.only(trigger), {
          ref: setTriggerRef,
        })
      ) : (
        <div ref={setTriggerRef} className="cursor-pointer ">
          {trigger}
        </div>
      )}
      {/* if inside action button and on touchscreen we dont show the tooltip */}
      {!(isActionButton && getIsTouchDevice()) && visible && children !== null && (
        <Portal>
          <div
            ref={setTooltipRef}
            {...getTooltipProps({
              className: `tooltip-container !border-0 !bg-white !text-xs !p-3 !py-2.5 !rounded-md  ${colors[color]}`,
              style: { borderRadius: 0, boxShadow: "0px 0px 8px #4d4d4d4e" },
            })}
            {...props}
          >
            <div
              {...getArrowProps({
                className: "tooltip-arrow",
              })}
            />
            {children}
          </div>
        </Portal>
      )}
    </>
  );
};

export default Tooltip;
