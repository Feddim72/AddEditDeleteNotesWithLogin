import InputControl from "components/common/inputControl";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineGoogle, AiOutlineTwitter } from "react-icons/ai";
import {
  HiOutlineLockClosed,
  HiOutlineMail,
  HiOutlineUser,
} from "react-icons/hi";
import { CreateUserDto } from "api/axios-client";
import axios from "axios";
import { useAuth } from "context/AuthProvider";
import { useAsync } from "hooks/useAsync";
import { ToastsSticky, viewToast } from "components/common/toastsSticky";
import { useState, Suspense } from "react";
import { rgxPassword } from "utils/validationPattern";

interface FormValue {
  email: string;
  password: string;
  confirmPassword?: string;
  login: string;
}

const CreateAccount = () => {
  const [viewToastState, setViewToastState] = useState<viewToast>({});
  const { control, handleSubmit, watch } = useForm<FormValue>();
  const { run, isLoading } = useAsync();
  const { login: singUp } = useAuth();
  const navigate = useNavigate();

  const onSubmit = ({ password, email, login }: FormValue) => {
    run(
      axios
        .post("/Auth/register", new CreateUserDto({ login, email, password }))
        .then(() => {
          setViewToastState({
            colorView: "green",
            message: "succes registration",
          });

          singUp({ email, password })
            .then((data) =>
              setTimeout(() => {
                navigate("/userLandingPage", { state: { email: data } });
              }, 2000)
            )
            .catch(() =>
              setViewToastState({ colorView: "red", message: "error" })
            );
        })
        .catch(() => setViewToastState({ colorView: "red", message: "error" }))
    );
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
      <div className="bg-[url('/public/images/gradientAbstractionSpots.jpg')] min-h-[100vh] flex items-center justify-center">
        <ToastsSticky
          viewToastState={viewToastState}
          setViewToastState={setViewToastState}
        />
        <div className="bg-white -mt-20 rounded-lg py-8 px-10 flex flex-col justify-center items-center gap-6 max-w-sm w-full">
          <h1 className="font-bold text-3xl mb-2">Join</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full"
          >
            <div className="flex flex-col gap-y-4 w-full">
              <InputControl
                labelIcons={<HiOutlineUser />}
                className="!px-0"
                control={control}
                name="login"
                type={"text"}
                label={" user name"}
                required
              />
              <InputControl
                labelIcons={<HiOutlineMail />}
                className="!px-0"
                control={control}
                name="email"
                type={"email"}
                label={"email"}
                required
              />

              <InputControl
                labelIcons={<HiOutlineLockClosed />}
                className="!px-0"
                control={control}
                name="password"
                type={"password"}
                label={"password"}
                rules={{
                  required: true,
                  setValueAs: (v) => v.trim(),
                  pattern: {
                    value: rgxPassword,
                    message:
                      "The password must contain at least 8 characters, including upper and lower case letters, a number and a special character.",
                  },
                }}
              />

              <InputControl
                labelIcons={<HiOutlineLockClosed />}
                className="!px-0"
                control={control}
                name="confirmPassword"
                type={"password"}
                label={"confirm password"}
                rules={{
                  required: true,
                  setValueAs: (v) => v.trim(),
                  pattern: {
                    value: rgxPassword,
                    message:
                      "The password must contain at least 8 characters, including upper and lower case letters, a number and a special character.",
                  },
                  validate: (value) =>
                    value === watch("password", "") || "passwordNotMatch",
                }}
              />
            </div>
            <div className="flex justify-end w-full text-xs">
              <NavLink className={"hover:text-blue-700"} to={"/forgotPassword"}>
                <span>Forgot password?</span>
              </NavLink>
            </div>
            <button
              type="submit"
              className="w-full background-btn mt-8 relative"
            >
              {isLoading ? (
                <img
                  src="/loader.svg"
                  className="w-14 h-14 absolute top-[calc(50%-28px)] left-[calc(50%-28px)]"
                  alt="loader"
                />
              ) : (
                <span>create account</span>
              )}
            </button>
          </form>
          <div className="mt-6 flex flex-col justify-center items-center">
            <h2 className="text-center text-sm">Or Sing Up Using</h2>
            <div className="flex flex-row gap-4 mt-4 justify-center">
              <button className="h-10 w-10 flex items-center justify-center text-white font-bold bg-blue-800 rounded-full">
                <FaFacebookF />
              </button>
              <button className="h-10 w-10 flex items-center justify-center text-white font-bold bg-blue-500 rounded-full">
                <AiOutlineTwitter />
              </button>
              <button className="h-10 w-10 flex items-center justify-center text-white font-bold bg-red-500 rounded-full">
                <AiOutlineGoogle />
              </button>
            </div>
            <NavLink
              className={
                "flex flex-row gap-2 items-center hover:text-blue-700 hover:font-medium text-center mt-2"
              }
              to={"/"}
            >
              <span>Back to login</span>
            </NavLink>
          </div>
        </div>
      </div>
    </Suspense>
  );
};
export default CreateAccount;
