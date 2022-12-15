import {
  ICreateNoteDto,
  IViewNoteModelDto,
  UpdateNoteDto,
  ViewListModelDtoOfViewNoteModelDto,
} from "api/axios-client";
import ModalWindow from "components/common/modalWindow";
import { NoteItem } from "components/common/noteItem";
import { ToastsSticky, viewToast } from "components/common/toastsSticky";
import { AddEditNoteForm } from "components/form/addEditNoteForm";
import { DeleteNote } from "components/modal/deleteNote";
import { OpenNote } from "components/modal/openNote";
import { useAuth } from "context/AuthProvider";
import useGet from "hooks/useGet";
import usePatch from "hooks/usePatch";
import usePost from "hooks/usePost";
import useRemove from "hooks/useRemove";
import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdPlaylistAdd } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { actualUserIdKey } from "utils/auth";

export interface FormValue {
  details: string;
  titles: string;
}

const UserLandingPage = () => {
  const [viewToastState, setViewToastState] = useState<viewToast>({});
  const [isOpenEditNoteModal, setIsOpenEditNoteModal] = useState(false);
  const [isOpenAddNoteModal, setIsOpenAddNoteModal] = useState(false);
  const [isOpenDeleteNoteModal, setIsOpenDeleteNoteModal] = useState(false);
  const [isOpenMoreNoteModal, setIsOpenMoreNoteModal] = useState(false);
  const [currentNote, setCurrentNote] = useState<IViewNoteModelDto>();
  const [noteDateItems, setNoteDateItems] = useState<JSX.Element[]>();

  const { logout } = useAuth();
  const methods = useForm<FormValue>({
    defaultValues: {
      details: currentNote?.details,
      titles: currentNote?.title,
    },
  });

  const openMoreNoteModal = (data: IViewNoteModelDto) => {
    setCurrentNote(data);
    setIsOpenMoreNoteModal(true);
  };

  const viewDeleteNoteModal = (data: IViewNoteModelDto) => {
    setCurrentNote(data);
    setIsOpenDeleteNoteModal(true);
  };

  const viewEditModal = (data: IViewNoteModelDto) => {
    setCurrentNote(data);
    setIsOpenEditNoteModal(true);
  };

  const viewAddNoteModal = () => {
    setIsOpenAddNoteModal(true);
    methods.reset();
  };

  const closeNoteModal = () => {
    setIsOpenAddNoteModal(false);
    setIsOpenEditNoteModal(false);
    if (!isOpenMoreNoteModal) {
      typeof currentNote !== "undefined" && setCurrentNote(undefined);
    }

    setIsOpenDeleteNoteModal(false);
  };
  const closeMoreNoteModal = () => {
    setIsOpenMoreNoteModal(false);
  };
  const userIdKeyForGetNoteList =
    "UserId eq " + localStorage.getItem(actualUserIdKey);
  const { isLoading: isLoadingRefetchAllNotes, refetch: refetchAllNotes } =
    useGet<ViewListModelDtoOfViewNoteModelDto>(
      `/Note/GetAll?filter=${userIdKeyForGetNoteList}`,
      {
        onSuccess({ data }) {
          setNoteDateItems(
            data?.map(
              ({ createDate, details, editTame, id, isCmpleted, title }) => (
                <NoteItem
                  openMoreNoteModal={openMoreNoteModal}
                  viewEditModal={viewEditModal}
                  viewDeleteNoteModal={viewDeleteNoteModal}
                  key={id}
                  createDate={createDate}
                  details={details}
                  editTame={editTame}
                  id={id}
                  isCmpleted={isCmpleted}
                  title={title}
                />
              )
            )
          );
        },
        onError() {
          setViewToastState({
            colorView: "red",
            message: "error load notes :(",
          });
        },
      }
    );

  const { remove: deleteCurrentNote, isLoadingRemove } = useRemove({
    url: `/Note/Delete/${currentNote?.id}`,
    onSuccess() {
      setViewToastState({ colorView: "green", message: "succes delete note" });
      closeNoteModal();
      refetchAllNotes();
    },
    onError() {
      setViewToastState({ colorView: "red", message: "error delete note" });
    },
  });

  const { post: addNode, isLoadingPost } = usePost<ICreateNoteDto>({
    url: "/Note/AddNote",
    invalidateQueriesList: ["/Note/AddNote"],
    onSuccess() {
      setViewToastState({ colorView: "green", message: "succes add note" });
      refetchAllNotes();
      closeNoteModal();
      methods.reset();
    },
    onError() {
      setViewToastState({ colorView: "red", message: "error add note" });
    },
  });

  const { patch: editNote, isLoadingPatch } = usePatch<UpdateNoteDto>({
    url: `/Note/Patch/${currentNote?.id}`,
    onSuccess() {
      setViewToastState({ colorView: "green", message: "succes edit note" });
      refetchAllNotes();
      closeNoteModal();
      methods.reset();
    },
    onError() {
      setViewToastState({ colorView: "red", message: "error edit note" });
    },
  });

  const handelDeleteNote = () => {
    deleteCurrentNote("");
  };
  const hadelAddEditNote = ({ details, titles }: FormValue) => {
    if (currentNote && currentNote.id) {
      editNote(
        new UpdateNoteDto({
          details: details,
          isCompleted: currentNote.isCmpleted,
          title: titles,
        })
      );
    } else {
      addNode({
        userId: Number(localStorage.getItem(actualUserIdKey)),
        details: details,
        title: titles,
      });
    }
  };

  useEffect(() => {
    currentNote?.details && methods.setValue("details", currentNote.details);
    currentNote?.title && methods.setValue("titles", currentNote.title);
  }, [currentNote]);

  const isLoading = !!isLoadingRefetchAllNotes
    ? isLoadingRefetchAllNotes
    : !!isLoadingRemove
    ? isLoadingRemove
    : !!isLoadingPost
    ? isLoadingPost
    : isLoadingPatch;

  return (
    <div className="bg-[url('/public/images/bg-note.webp')] bg-cover bg-center bg-no-repeat min-h-[100vh] flex flex-col items-center">
      {isLoading && (
        <img
          src="/loader.svg"
          className="mt-12 fixed top-[calc(50%-100px)] left-[calc(50%-100px)] pointer-events-none z-[100000]"
          alt="loader"
        />
      )}

      <ToastsSticky
        viewToastState={viewToastState}
        setViewToastState={setViewToastState}
      />

      <FormProvider {...methods}>
        <ModalWindow
          setCloseModal={closeNoteModal}
          isOpenModal={isOpenAddNoteModal}
          children={
            <AddEditNoteForm
              isLoading={isLoading}
              mode="add"
              setCloseModal={closeNoteModal}
              hadelAddEditNote={hadelAddEditNote}
            />
          }
        />

        <ModalWindow
          className="z-10"
          isDubleModal={isOpenMoreNoteModal}
          setCloseModal={closeNoteModal}
          isOpenModal={isOpenEditNoteModal}
          children={
            <AddEditNoteForm
              isLoading={isLoading}
              mode="edit"
              setCloseModal={closeNoteModal}
              hadelAddEditNote={hadelAddEditNote}
            />
          }
        />
      </FormProvider>

      <ModalWindow
        className="z-10"
        isDubleModal={isOpenMoreNoteModal}
        setCloseModal={closeNoteModal}
        isOpenModal={isOpenDeleteNoteModal}
        children={
          <DeleteNote
            closeModal={closeNoteModal}
            handelDeleteNote={handelDeleteNote}
            title={currentNote?.title}
          />
        }
      />

      <ModalWindow
        setCloseModal={closeMoreNoteModal}
        isOpenModal={isOpenMoreNoteModal}
        children={
          <OpenNote
            viewDeleteNoteModal={viewDeleteNoteModal}
            viewEditModal={viewEditModal}
            closeModal={closeMoreNoteModal}
            handelDeleteNote={handelDeleteNote}
            currentNote={currentNote}
          />
        }
      />

      <div className={`w-full flex flex-row justify-between px-4 md:px-10`}>
        <button
          onClick={() => viewAddNoteModal()}
          className="p-3 xs:p-6 gap-2 xs:gap-5 text-sm xxs:text-base logout-btn mt-10 flex justify-center items-center"
        >
          <MdPlaylistAdd className="" size={30} /> Add note
        </button>
        <button
          onClick={() => logout()}
          className="p-3 xs:p-6 gap-2 xs:gap-5 text-sm xxs:text-base logout-btn mt-10 flex justify-center items-center"
        >
          <RiLogoutCircleRLine className="" size={30} /> Logout
        </button>
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-start gap-10 lg:gap-6 mt-10 xs:mt-20">
        {noteDateItems}
      </div>
    </div>
  );
};

export default UserLandingPage;
