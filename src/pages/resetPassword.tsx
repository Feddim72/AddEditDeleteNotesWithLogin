import InputControl from "components/common/inputControl";
import { useForm } from "react-hook-form";
import { HiOutlineLockClosed } from "react-icons/hi";

const ResetPassword = () => {
  const { control } = useForm();

  return (
    <div className="bg-[url('/public/images/polygonGradientTriangles.jpg')] h-[100vh] flex items-center justify-center">
      <div className="bg-white -mt-20 rounded-lg py-8 px-10 flex flex-col justify-center items-center gap-6 max-w-sm w-full">
        <h1 className="font-bold text-[1.7rem] mb-2">Reset Your Password</h1>
        <form action="" className="flex flex-col w-full">
          <div className="flex flex-col gap-y-4 w-full">
            <InputControl
              labelIcons={<HiOutlineLockClosed />}
              className="!px-0"
              control={control}
              name="password"
              type={"password"}
              label={"password"}
              required
            />

            <InputControl
              labelIcons={<HiOutlineLockClosed />}
              className="!px-0"
              control={control}
              name="confirmPassword"
              type={"password"}
              label={"confirm password"}
              required
            />
          </div>

          <button type="submit" className="w-full bg background-btn mt-8">
            reset password
          </button>
        </form>
      </div>
    </div>
  );
};
export default ResetPassword;
