import {
  AiFillDashboard,
  AiOutlineAim,
  AiOutlineAmazon,
  AiOutlineBoxPlot,
  AiOutlineCaretDown,
  AiOutlineDashboard,
  AiOutlineGateway,
  AiOutlineHome,
  AiOutlineQrcode,
  AiOutlineRadiusBottomright,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <div className="">
      <h1 className="text-white font-semibold text-2xl mx-9 pt-4">Hakiki</h1>
      <div className="space-y-5 mt-14">
        {[
          { title: "Overview", path: "/", icon: <AiOutlineDashboard /> },
          { title: "Users", path: "/users", icon: <AiOutlineUser /> },
          {
            title: "Manufactures",
            path: "/manufactures",
            icon: <AiOutlineAim />,
          },
          {
            title: "Distributors",
            path: "/distributors",
            icon: <AiOutlineGateway />,
          },
          {
            title: "Products",
            path: "/products",
            icon: <AiOutlineAmazon />,
          },
          { title: "QR Scans", path: "/scans", icon: <AiOutlineQrcode /> },
          {
            title: "Settings",
            path: "/settings",
            icon: <AiOutlineSetting />,
          },
        ].map((item) => {
          return (
            <div
              onClick={() => {
                navigate(item.path);
              }}
              className={`text-white  cursor-pointer ${
                pathname == item.path
                  ? "bg-primaryColor text-opacity-100"
                  : "text-opacity-80"
              } py-2`}
            >
              <div
                key={item.title}
                className="flex items-center space-x-2 px-8"
              >
                <div>{item.icon}</div>
                <div className="">{item.title}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
