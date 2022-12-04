import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  MdOutlineCheckCircleOutline,
  MdOutlineHighlightOff,
  MdOutlineLogin,
} from "react-icons/md";

export type viewToast = {
  colorView?: "green" | "red" | "gray" | "blue";
  timeView?: number;
  message?: string;
};
interface ToastsProps {
  setViewToastState: Dispatch<SetStateAction<viewToast>>;
  viewToastState: viewToast;
  className?: string;
}

export const ToastsSticky = ({
  setViewToastState,
  viewToastState,
  className,
}: ToastsProps) => {
  const [isViewToast, setIsViewToast] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const { colorView, message, timeView } = viewToastState;
  const [messageToast, setMessageToast] = useState<string>(
    typeof message === "string"
      ? message
      : colorView === "red"
      ? "error"
      : "succes"
  );
  useEffect(() => {
    setMessageToast(
      typeof message === "string"
        ? message
        : colorView === "red"
        ? "error"
        : "succes"
    );
  }, [viewToastState]);
  useEffect(() => {
    if (viewToastState.colorView === undefined) {
      return;
    } else {
      if (!isViewToast) {
        setIsViewToast(true);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const newTimeoutId = setTimeout(
        () => {
          setIsViewToast(false);
          setViewToastState({
            colorView: undefined,
            message: undefined,
            timeView: undefined,
          });
        },
        timeView ? timeView : 2500
      );
      setTimeoutId(newTimeoutId);
    }
  }, [viewToastState]);

  return (
    <>
      {isViewToast && (
        <div className="w-full fixed z-50 h-full pointer-events-none">
          <div
            className={`sticky z-[200] transition  left-0 ${className} top-44 ${
              colorView ? "opacity-100" : "opacity-0"
            } `}
          >
            <div
              className={`h-16 w-fit ${
                (colorView === "green" && "bg-green-500") ||
                (colorView === "red" && "bg-red-600") ||
                (colorView === "gray" && "bg-gray-800") ||
                (colorView === "blue" && "bg-blue-800")
              } rounded-md m-auto text-white flex flex-row font-bold text-sm tracking-wide px-7 items-center`}
            >
              <div>
                {(colorView === "green" && (
                  <MdOutlineCheckCircleOutline size={24} />
                )) ||
                  (colorView === "red" && (
                    <MdOutlineHighlightOff size={24} />
                  )) ||
                  (colorView === "gray" && <MdOutlineLogin size={24} />) ||
                  (colorView === "blue" && (
                    <MdOutlineCheckCircleOutline size={24} />
                  ))}
              </div>
              <div className="ml-6 whitespace-pre-wrap">{messageToast}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
