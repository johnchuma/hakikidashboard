import { useState } from "react";
import CustomButton from "../components/customButton";
import { login } from "../controllers/authController";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="bg-background min-h-screen  flex justify-center items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          const data = {
            email: e.target.email.value,
            password: e.target.password.value,
          };
          login(data)
            .then((response) => {
              setLoading(false);
              console.log(response.data);
              localStorage.setItem(
                "hakiki-auth",
                JSON.stringify(response.data.token)
              );
              navigate("/");
            })
            .catch((e) => {
              setLoading(false);
              toast.error(e.response.data.message);
            });
        }}
        className="bg-white p-10 shadow-lg  w-[27%] 2xl:w-[20%] rounded"
      >
        <div className="flex justify-center">
          <img className="h-16" src="/logo.png" />
        </div>
        <h1 className="font-bold text-2xl text-center mt-2">
          Login to continue
        </h1>
        <p className="text-muted text-center ">Enter credentials below</p>

        <div className="space-y-3 mt-8 text-sm">
          <div className=" flex flex-col space-y-1">
            <label>Email Address</label>
            <input
              name="email"
              placeholder="Enter email address "
              className="form-style"
            />
          </div>
          <div className=" flex flex-col space-y-1">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter password "
              className="form-style"
            />
          </div>
        </div>
        <CustomButton
          loading={loading}
          className={"py-3 w-full font-bold px-8 mt-8  "}
          text={"SignIn"}
        />
      </form>
    </div>
  );
};

export default LoginPage;
