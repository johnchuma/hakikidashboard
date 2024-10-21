import { useState } from "react";
import { addUser } from "../../controllers/authController";
import CustomButton from "../customButton";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";

const AddUser = ({ fetchUsers, setShowCreateModal }) => {
  const [uploading, setUploading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("supplier");

  return (
    <div className=" bg-dark fixed inset-0 bg-opacity-70 flex justify-center items-center ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUploading(true);
          let payload = {
            role: e.target.role.value,
            phone: e.target.phone.value,
            name: e.target.name.value,
            email: e.target.email.value,
            address: e.target.address.value,
            companyName: "",
            businessName: "",
          };
          if (selectedRole == "supplier") {
            payload.companyName = e.target.companyName.value;
          } else {
            payload.businessName = e.target.businessName.value;
          }
          addUser(payload)
            .then((response) => {
              setUploading(false);
              fetchUsers();
              setShowCreateModal(false);
            })
            .catch((err) => {
              toast.error("Failed to create user");
              setUploading(false);
            });
        }}
        className="bg-white w-5/12 2xl:w-4/12 shadow-2xl p-8 rounded "
      >
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-xl font-bold ">Add user</h1>
          <div
            onClick={() => {
              setShowCreateModal(false);
            }}
            className="cursor-pointer"
          >
            <AiOutlineClose />
          </div>
        </div>
        <div className="grid grid-cols-2 text-sm gap-4">
          <div className="flex flex-col space-y-1">
            <label>Role</label>
            <select
              onChange={(e) => {
                setSelectedRole(e.target.value);
              }}
              name="role"
              className="form-style"
            >
              <option value="supplier">Manufacture</option>
              <option value="distributor">Distributor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex flex-col space-y-1">
            <label>User Name</label>
            <input
              name="name"
              required
              className="form-style"
              placeholder="Enter name"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label>Phone</label>
            <input
              name="phone"
              required
              className="form-style"
              placeholder="Enter phone number"
            />
          </div>
          {selectedRole == "supplier" ? (
            <div className="flex flex-col space-y-1">
              <label>Company Name</label>
              <input
                name="companyName"
                className="form-style"
                placeholder="Enter Company name"
              />
            </div>
          ) : (
            <div className="flex flex-col space-y-1">
              <label>Business Name</label>
              <input
                name="businessName"
                className="form-style"
                placeholder="Enter Business name"
              />
            </div>
          )}
          <div className="flex flex-col space-y-1">
            <label>Email</label>
            <input
              name="email"
              required
              className="form-style"
              placeholder="Enter email address"
            />
          </div>{" "}
          <div className="flex flex-col space-y-1">
            <label>Address</label>
            <select
              name="address"
              required
              className="form-style"
              placeholder="Enter address"
            >
              {[
                "Dar es salaam",
                "Dodoma",
                "Iringa",
                "Mbeya",
                "Morogoro",
                "Tanga",
              ].map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
          </div>{" "}
        </div>
        <CustomButton
          loading={uploading}
          className={"mt-8 w-32"}
          text={"Add User"}
        />
      </form>
    </div>
  );
};

export default AddUser;
