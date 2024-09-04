import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { AiOutlineUser } from "react-icons/ai";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { checkToken } from "../utils/checkIfAuthenticated";

const MainLayout = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    const result = checkToken();
    if (result) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div className="flex bg-white">
      <Toaster position="top-right" />
      <div className="w-[16%] 2xl:w-[13%] fixed h-screen bg-dark">
        <Sidebar />
      </div>
      <div className="w-[84%] 2xl:w-[87%] ms-auto bg-background min-h-screen">
        <div className="bg-white shadow-md py-2 px-12">
          <div className="flex justify-end items-center space-x-2">
            <div className="text-sm ">John Doe</div>
            <div
              onClick={() => {}}
              className="size-10 bg-background rounded-full flex justify-center items-center"
            >
              <div
                onClick={() => {
                  setShowMenu(!showMenu);
                }}
                className="relative cursor-pointer"
              >
                <AiOutlineUser />

                {showMenu && (
                  <div className="absolute right-0 bg-white rounded p-2 px-6 mt-4 shadow cursor-pointer">
                    <h1
                      onClick={() => {
                        localStorage.removeItem("hakiki-auth");
                        navigate("/login");
                      }}
                      className=" cursor-pointer hover:text-red-400 text-sm"
                    >
                      Logout
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full 2xl:w-8/12 mx-auto pt-12 px-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
