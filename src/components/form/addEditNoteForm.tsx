import InputControl from "components/common/inputControl";
import { useFormContext } from "react-hook-form";
import { MdClose, MdOutlineSubtitles } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import TextareaControl from "components/common/textareaControl";
import { FormValue } from "pages/userLandingPage";
interface AddNoteProps {
  mode: "add" | "edit";
  hadelAddEditNote: (data: FormValue) => void;
  setCloseModal: () => void;
}
export const AddEditNoteForm = ({
  hadelAddEditNote,
  setCloseModal,
  mode,
}: AddNoteProps) => {
  const { control, handleSubmit, reset } = useFormContext<FormValue>();
  return (
    <form
      onSubmit={handleSubmit((data) => hadelAddEditNote(data))}
      className="bg-white p-5 flex flex-col justify-center items-center rounded-lg "
    >
      <figure className="w-full flex justify-end text-gray-500 hover:text-gray-700">
        <button
          onClick={() => {
            setCloseModal();
            reset();
          }}
        >
          <MdClose size={26} />
        </button>
      </figure>
      <div className="max-w-xs w-full">
        <InputControl
          labelIcons={<MdOutlineSubtitles />}
          className="!px-0"
          control={control}
          name="titles"
          type={"text"}
          label={"title"}
          rules={{ required: true, maxLength: 40, minLength: 8 }}
        />
        <TextareaControl
          labelIcons={<BiDetail />}
          className="!px-0 border border-gray-300 border-b-2"
          control={control}
          name="details"
          label={"details"}
          rules={{ maxLength: 400 }}
        />
      </div>
      <button type="submit" className="logout-btn px-5 py-1 mt-5">
        <span>{mode == "add" ? "add note" : "edit note"}</span>
      </button>
    </form>
  );
};
