import InputControl from "components/common/inputControl";
import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Suspense } from "react";
import { FaFacebookF } from "react-icons/fa";
import {
  AiOutlineEdit,
  AiOutlineFileAdd,
  AiOutlineGoogle,
  AiOutlineTwitter,
} from "react-icons/ai";
import { HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi";
import { IViewLoginModel } from "api/axios-client";
import { useAuth } from "context/AuthProvider";
import { useAsync } from "hooks/useAsync";
import { useState } from "react";
import { ToastsSticky, viewToast } from "components/common/toastsSticky";
import { MdDeleteOutline } from "react-icons/md";

const HomePage = () => {
  const [viewToastState, setViewToastState] = useState<viewToast>({});
  const { control, handleSubmit, setError } = useForm<IViewLoginModel>({
    defaultValues: {
      email: "feddim72@gmail.com",
      password: "feddim72@gmail.com",
    },
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { run, isLoading } = useAsync();
  const redirectPathname = location.state?.from?.pathname
    ? (location.state?.from?.pathname as string)
    : "/userLandingPage";
  const onSubmit = (formDate: IViewLoginModel) => {
    run(
      login(formDate)
        .then(({ data }) => {
          navigate(redirectPathname, { state: { email: data } });
        })
        .catch((error) => {
          const errorMessage = error.response.data?.errorCode;
          if (errorMessage == "NotAuthorized") {
            setError("email", {
              type: "manual",
              message: "Incorrect e-mail or password",
            });
            setError("password", {
              type: "manual",
              message: "Incorrect e-mail or password",
            });
          } else {
            setViewToastState({
              colorView: "red",
            });
          }
          console.log("errorMessage =", errorMessage);
        })
    );
  };
  const developmentStage = () => {
    setViewToastState({
      colorView: "blue",
      message: "This function, not implemented.",
    });
  };

  return (
    <Suspense
      fallback={
        <img
          src="/loader.svg"
          className="mt-12 fixed top-[calc(50%-100px)] left-[calc(50%-100px)] pointer-events-none z-[100000]"
          alt="loader"
        />
      }
    >
      <div className="px-4 flex lg:flex-row flex-col items-center lg:justify-center justify-start lg:pt-0 pt-10 gap-16 bg-[url('/public/images/gradientForgotPassword.jpg')] bg-cover bg-center bg-no-repeat min-h-[100vh]">
        <ToastsSticky
          viewToastState={viewToastState}
          setViewToastState={setViewToastState}
        />

        <div
          className={` font-[math] text-white flex items-start lg:h-[356px] h-auto slowViewBlockLeft`}
        >
          <div className="relative slowViewBlockLeft">
            <h1 className="lg:text-6xl text-5xl font-[math]">Hello!</h1>
            <p className="text-2xl lg:text-3xl mt-2">
              Welcome to the note-taking platform.
            </p>
            <p
              className={`flex flex-row items-center gap-2 text-2xl lg:text-3xl mt-6 slowViewBlock opacity-0 animationDelay2`}
            >
              <span>Add Note</span> <AiOutlineFileAdd color="green" />
            </p>
            <p
              className={`flex flex-row items-center gap-2 text-2xl lg:text-3xl mt-2 slowViewBlock opacity-0 animationDelay4`}
            >
              <span>Edit Note</span>
              <AiOutlineEdit color="blue" />
            </p>
            <p
              className={`flex flex-row items-center gap-2 text-2xl lg:text-3xl mt-2 slowViewBlock opacity-0 animationDelay6`}
            >
              <span>Delete Note</span> <MdDeleteOutline color="red" />
            </p>
          </div>
        </div>

        <div className="bg-white lg:-mt-20 -mt-5 rounded-lg py-8 px-10 flex flex-col justify-center items-center gap-6 max-w-sm w-full slowViewBlock">
          <h2 className="font-bold font-[cursive] text-3xl mb-2">Log in.</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full"
          >
            <div className="flex flex-col gap-y-4 w-full">
              <InputControl
                labelIcons={<HiOutlineUser />}
                className="!px-0"
                control={control}
                name="email"
                type="email"
                label={"e-mail"}
                rules={{ required: true, setValueAs: (v) => v.trim() }}
              />

              <InputControl
                labelIcons={<HiOutlineLockClosed />}
                className="!px-0"
                control={control}
                name="password"
                type={"password"}
                label={"password"}
                rules={{ required: true, setValueAs: (v) => v.trim() }}
              />
            </div>
            <div className="flex justify-end w-full text-xs">
              <NavLink className={"hover:text-blue-700"} to={"/forgotPassword"}>
                <span>Forgot password?</span>
              </NavLink>
            </div>
            <button
              type="submit"
              className="w-full bg background-btn mt-8 relative"
            >
              {isLoading ? (
                <img
                  src="/loader.svg"
                  className="w-14 h-14 absolute top-[calc(50%-28px)] left-[calc(50%-28px)]"
                  alt="loader"
                />
              ) : (
                <span>login</span>
              )}
            </button>
          </form>
          <div className="mt-5 flex flex-col justify-center items-center">
            <h2 className=" text-sm">Or Sing Up Using</h2>
            <div className="flex flex-row gap-4 mt-4 justify-center">
              <button
                onClick={() => developmentStage()}
                className="h-10 w-10 flex items-center justify-center text-white font-bold bg-blue-800 rounded-full"
              >
                <FaFacebookF />
              </button>
              <button
                onClick={() => developmentStage()}
                className="h-10 w-10 flex items-center justify-center text-white font-bold bg-blue-500 rounded-full"
              >
                <AiOutlineTwitter />
              </button>
              <button
                onClick={() => developmentStage()}
                className="h-10 w-10 flex items-center justify-center text-white font-bold bg-red-500 rounded-full"
              >
                <AiOutlineGoogle />
              </button>
            </div>
            <NavLink
              className={
                "hover:text-blue-700 hover:font-medium text-center mt-2"
              }
              to={"/createAccount"}
            >
              <span>Regitster account?</span>
            </NavLink>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default HomePage;
