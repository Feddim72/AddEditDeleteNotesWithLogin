import { IViewNoteModelDto } from "api/axios-client";
import React from "react";
import {
  MdClose,
  MdOutlineDeleteOutline,
  MdOutlineModeEditOutline,
} from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { localeDate } from "utils/renderHelpers";
interface DeleteNoteProps {
  currentNote?: IViewNoteModelDto;
  closeModal: () => void;
  handelDeleteNote: () => void;
  viewDeleteNoteModal: (data: IViewNoteModelDto) => void;
  viewEditModal: (data: IViewNoteModelDto) => void;
}
export const OpenNote = ({
  currentNote,
  closeModal,
  viewDeleteNoteModal,
  viewEditModal,
}: DeleteNoteProps) => {
  return (
    <div className=" flex flex-col bg-white border-gray-500 border rounded-lg overflow-hidden hover:shadow-2xl">
      <div className="p-4 flex flex-row gap-x-2 items-center justify-between">
        <div className="flex flex-row gap-x-2 items-center justify-between w-[80%]">
          {currentNote?.isCmpleted && (
            <TiTick className="text-green-500" size={25} />
          )}
          <p className="overflow-ellipsis whitespace-nowrap overflow-hidden">
            {currentNote?.title}
          </p>
        </div>
        <figure className="flex justify-end flex-row gap-2 w-[20%]">
          <button
            className="hover:text-green-500"
            onClick={() => currentNote && viewEditModal(currentNote)}
          >
            <MdOutlineModeEditOutline size={22} />
          </button>
          <button
            className="hover:text-red-500"
            onClick={() => currentNote?.id && viewDeleteNoteModal(currentNote)}
          >
            <MdOutlineDeleteOutline size={22} />
          </button>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => {
              closeModal();
            }}
          >
            <MdClose size={26} />
          </button>
        </figure>
      </div>
      <div className="bg-amber-200 p-4 gap-4 flex flex-col">
        <p className="bg-amber-300 pl-3 py-1 break-words">
          {currentNote?.details}
        </p>

        <p className="bg-amber-300 pl-3 py-1 overflow-ellipsis whitespace-nowrap overflow-hidden">
          date create:{" "}
          {currentNote?.createDate && localeDate(currentNote?.createDate)}
        </p>
        <p className="bg-amber-300 pl-3 py-1 overflow-ellipsis whitespace-nowrap overflow-hidden">
          date edit:{" "}
          {currentNote?.editTame
            ? localeDate(currentNote?.editTame, "long")
            : "-"}
        </p>
      </div>
    </div>
  );
};
