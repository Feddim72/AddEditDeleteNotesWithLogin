import { IViewNoteModelDto } from "api/axios-client";
import {
  MdOutlineDeleteOutline,
  MdOutlineModeEditOutline,
} from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { localeDate } from "utils/renderHelpers";

interface NoteItemProps {
  viewDeleteNoteModal: (data: IViewNoteModelDto) => void;
  viewEditModal: (data: IViewNoteModelDto) => void;
  openMoreNoteModal?: (data: IViewNoteModelDto) => void;
  id?: number;
  title?: string;
  details?: string;
  isCmpleted?: boolean;
  createDate?: Date;
  editTame?: Date | undefined;
}

export const NoteItem = ({
  createDate,
  details,
  editTame,
  isCmpleted,
  title,
  id,
  viewDeleteNoteModal,
  viewEditModal,
  openMoreNoteModal,
}: NoteItemProps) => {
  return (
    <div
      onClick={(event) => {
        event.preventDefault();
        openMoreNoteModal?.({
          createDate,
          details,
          editTame,
          isCmpleted,
          title,
          id,
        });
      }}
      className="cursor-pointer flex flex-col bg-white border-gray-500 border rounded-lg w-72 overflow-hidden hover:shadow-2xl"
    >
      <div className="p-4 flex flex-row gap-x-2 items-center justify-between">
        <div className="flex flex-row gap-x-2 items-center justify-between w-[80%]">
          {isCmpleted && <TiTick className="text-green-500" size={25} />}
          <p className="overflow-ellipsis whitespace-nowrap overflow-hidden">
            {title}
          </p>
        </div>
        <div className="flex flex-row gap-2 w-[20%]">
          <button
            className="hover:text-green-500"
            onClick={(event) => {
              event.stopPropagation();
              viewEditModal({
                createDate,
                details,
                editTame,
                isCmpleted,
                title,
                id,
              });
            }}
          >
            <MdOutlineModeEditOutline size={22} />
          </button>
          <button
            className="hover:text-red-500"
            onClick={(event) => {
              event.stopPropagation();
              id &&
                viewDeleteNoteModal({
                  createDate,
                  details,
                  editTame,
                  id,
                  isCmpleted,
                  title,
                });
            }}
          >
            <MdOutlineDeleteOutline size={22} />
          </button>
        </div>
      </div>
      <div className="bg-amber-200 p-4 gap-4 flex flex-col">
        <p className="bg-amber-300 pl-3 py-1 overflow-ellipsis whitespace-nowrap overflow-hidden">
          {details}
        </p>

        <p className="bg-amber-300 pl-3 py-1 overflow-ellipsis whitespace-nowrap overflow-hidden">
          date create: {createDate && localeDate(createDate)}
        </p>
        <p className="bg-amber-300 pl-3 py-1 overflow-ellipsis whitespace-nowrap overflow-hidden">
          date edit: {editTame ? localeDate(editTame, "long") : "-"}
        </p>
      </div>
    </div>
  );
};
