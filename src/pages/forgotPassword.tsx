import InputControl from "components/common/inputControl";
import { ToastsSticky, viewToast } from "components/common/toastsSticky";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

const ForgotPassword = () => {
  const [viewToastState, setViewToastState] = useState<viewToast>({});

  const { control } = useForm();
  const developmentStage = () => {
    setViewToastState({
      colorView: "blue",
      message: "This function, not implemented in backend.",
    });
  };
  return (
    <div className="bg-[url('/public/images/gradientBlurBlending.jpg')] h-[100vh] flex items-center justify-center">
      <ToastsSticky
        viewToastState={viewToastState}
        setViewToastState={setViewToastState}
      />
      <div className="bg-white -mt-20 rounded-lg py-8 px-10 flex flex-col justify-center items-center gap-6 max-w-sm w-full">
        <h1 className="font-bold text-3xl mb-2">Forgot password?</h1>
        <p>
          Enter your e-mail address and we will send you a message with a link
          to set a new password.
        </p>
        <form className="flex flex-col w-full items-center">
          <div className="flex flex-col gap-y-4 w-full">
            <InputControl
              className="!px-0"
              control={control}
              name="login"
              type={"email"}
              label={"user email"}
            />
          </div>

          <button
            type="button"
            onClick={() => developmentStage()}
            className="w-full bg background-btn mt-8"
          >
            send
          </button>
          <NavLink
            className={
              "flex flex-row items-center hover:text-blue-700 hover:font-medium text-center mt-4"
            }
            to={"/"}
          >
            <span>Back to login</span>
          </NavLink>
        </form>
      </div>
    </div>
  );
};
export default ForgotPassword;
