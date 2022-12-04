import React from "react";
import { MdClose } from "react-icons/md";
interface DeleteNoteProps {
  title?: string;
  closeModal: () => void;
  handelDeleteNote: () => void;
}
export const DeleteNote = ({
  title,
  closeModal,
  handelDeleteNote,
}: DeleteNoteProps) => {
  return (
    <div className="bg-white p-5 flex flex-col justify-center items-center rounded-lg">
      <div className="flex flex-row justify-between w-full gap-4">
        <p>delete note : {title}?</p>

        <figure className=" text-gray-500 hover:text-gray-700">
          <button
            onClick={() => {
              closeModal();
            }}
          >
            <MdClose size={26} />
          </button>
        </figure>
      </div>
      <div className="flex flex-row gap-4 justify-center">
        <button
          onClick={() => handelDeleteNote()}
          className="logout-btn px-5 py-1 mt-5"
        >
          delete
        </button>
        <button
          className="logout-btn px-5 py-1 mt-5"
          onClick={() => closeModal()}
        >
          close
        </button>
      </div>
    </div>
  );
};
