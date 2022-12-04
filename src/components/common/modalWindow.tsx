import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";

interface ModalWindowProps {
  isOpenModal: boolean;
  isDubleModal?: boolean;
  children: ReactNode;
  setCloseModal: () => void;
  className?: string;
}

const ModalWindow = ({
  isOpenModal,
  children,
  setCloseModal,
  className,
  isDubleModal,
}: ModalWindowProps) => {
  const widthScrollBar = `${
    window.innerWidth - (document.getElementById("root")?.offsetWidth || 0)
  }px`;
  const body = document.querySelector("body");
  useEffect(() => {
    if (isOpenModal && body && !isDubleModal) {
      body.style.paddingRight = widthScrollBar;
      body.classList.toggle("-lock");
    }
    if (!isOpenModal && body && !isDubleModal) {
      body.classList.toggle("-lock");
      body.style.paddingRight = "0px";
    }
  }, [isOpenModal]);

  return (
    <div
      className={
        isOpenModal ? `modal active ${className}` : `modal ${className}`
      }
      onClick={() => setCloseModal()}
    >
      <div
        className={
          isOpenModal ? "h-auto -mt-96 modal__content active" : "modal__content"
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
