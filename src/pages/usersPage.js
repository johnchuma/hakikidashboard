import { useContext, useEffect, useState } from "react";
import CustomButton from "../components/customButton";
import Loader from "../components/loader";
import { addUser, deleteUser, getUsers } from "../controllers/authController";
import moment from "moment";
import NoData from "../components/noData";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { AppContext } from "../layouts/mainLayout";
import AddUser from "../components/forms/addUser";

const UsersPage = () => {
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { setShowDelete, setOnDelete } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const fetchUsers = async () => {
    const response = await getUsers();
    setData(response.data.body);
    setLoading(false);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div className="">
      {showCreateModal && (
        <AddUser
          fetchUsers={fetchUsers}
          setShowCreateModal={setShowCreateModal}
        />
      )}
      <div className="flex justify-between items-center border-b border-muted border-opacity-40 pb-2">
        <h1 className="  text-2xl font-bold">Users</h1>
        <CustomButton
          onTap={() => {
            setShowCreateModal(true);
          }}
          text={"Add User"}
        />
      </div>
      <div className="bg-white p-8 rounded shadow-lg mt-4">
        {data.length == 0 ? (
          <NoData />
        ) : (
          <div>
            <div className="flex justify-end mb-3">
              <input
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
                className=" form-style"
                placeholder="search here"
              />
            </div>
            <table className="w-full mt-5">
              <thead>
                <tr className="border-b border-muted border-opacity-15 pb-3">
                  <th className="text-sm text-start text-muted">Created At</th>
                  <th className="text-sm text-start text-muted">Name</th>
                  <th className="text-sm text-start text-muted">Email</th>
                  <th className="text-sm text-start text-muted">Phone</th>
                  <th className="text-sm text-start text-muted">Role</th>
                  <th className="text-sm text-start text-muted">Location</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter((item) =>
                    item.name.toLowerCase().includes(filter.toLowerCase())
                  )
                  .map((item) => {
                    return (
                      <tr>
                        <td className="text-sm py-3">
                          {moment(item.createdAt).fromNow()}
                        </td>
                        <td className="text-sm py-4">{item.name}</td>
                        <td className="text-sm py-4">
                          {item.email ?? "No email"}
                        </td>

                        <td className="text-sm py-4">{item.phone}</td>
                        <td className="text-sm py-4">{item.role}</td>
                        <td className="text-sm py-4">{item.address}</td>
                        <td
                          onClick={() => {
                            setShowDelete(true);
                            setOnDelete(() => () => {
                              deleteUser(item.uuid).then((res) => {
                                fetchUsers();
                                toast.success("Deleted Successfully");
                                setShowDelete(false);
                              });
                            });
                          }}
                          className="text-sm py-4 font-bold text-red-400 cursor-pointer"
                        >
                          Delete
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
