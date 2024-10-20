import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { AiOutlineDelete, AiOutlineUser } from "react-icons/ai";
import { Toaster } from "react-hot-toast";
import { createContext, useEffect, useState } from "react";
import { checkToken } from "../utils/checkIfAuthenticated";
export const AppContext = createContext();
const MainLayout = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { pathname } = useLocation();
  const [onDelete, setOnDelete] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  useEffect(() => {
    const result = checkToken();
    if (result) {
      navigate(pathname);
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div className="flex bg-white">
      {showDelete && (
        <div className="fixed inset-0 bg-dark bg-opacity-60 flex justify-center items-center">
          <div className=" w-4/12 2xl:w-3/12 bg-white shadow-2xl p-6 text-center flex flex-col items-center rounded">
            <AiOutlineDelete className="text-4xl text-red-400" />
            <h1 className="font-semiBold text-xl mt-3">
              Do you really want to delete ?
            </h1>
            {/* <p className="text-muted">Confirm Deletion below</p> */}
            <div className="flex justify-center space-x-6 mt-4">
              <button
                onClick={() => {
                  setShowDelete(false);
                }}
                className="font-bold text-muted"
              >
                No
              </button>
              <button
                onClick={() => {
                  onDelete();
                }}
                className="font-bold text-red-400 bg-red-100 px-4 py-2 rounded-md"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
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
          <AppContext.Provider value={{ setShowDelete, setOnDelete }}>
            <Outlet />
          </AppContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
