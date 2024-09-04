import { useEffect, useState } from "react";
import CustomButton from "../components/customButton";
import Loader from "../components/loader";
import { getUsers } from "../controllers/authController";
import moment from "moment";
import { getDistributers } from "../controllers/distributorController";
import NoData from "../components/noData";

const DistributersPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    setLoading(true);
    getDistributers().then((response) => {
      console.log(response.data.body);
      setLoading(false);
      setData(response.data.body);
    });
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div className="">
      <div className="flex justify-between items-center border-b border-muted border-opacity-40 pb-2">
        <h1 className="  text-2xl font-bold">Distributors</h1>
        {/* <CustomButton text={"Add User"} /> */}
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
                  <th className="text-sm text-start text-muted">Business</th>
                  <th className="text-sm text-start text-muted">Email</th>
                  <th className="text-sm text-start text-muted">Owner</th>
                  <th className="text-sm text-start text-muted">Phone</th>
                </tr>
              </thead>
              <tbody>
                {data
                  //   .filter((item) =>
                  //     item.name.toLowerCase().includes(filter.toLowerCase())
                  //   )
                  .map((item) => {
                    return (
                      <tr>
                        <td className="text-sm py-3">
                          {moment(item.createdAt).fromNow()}
                        </td>
                        <td className="text-sm py-4">{item.businessName}</td>
                        <td className="text-sm py-4">{item.email}</td>
                        <td className="text-sm py-4">{item.User.name}</td>
                        <td className="text-sm py-4">{item.User.phone}</td>
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

export default DistributersPage;
