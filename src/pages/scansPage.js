import { useEffect, useState } from "react";
import CustomButton from "../components/customButton";
import Loader from "../components/loader";
import { getUsers } from "../controllers/authController";
import { getProductScans } from "../controllers/scansController";
import moment from "moment";
import NoData from "../components/noData";

const ScansPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    setLoading(true);
    getProductScans().then((response) => {
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
        <h1 className=" text-2xl font-bold">QR code scans</h1>
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
                  <th className="text-sm text-start text-muted">Scanned At</th>
                  <th className="text-sm text-start text-muted">
                    Product Name
                  </th>
                  <th className="text-sm text-start text-muted">User Name</th>
                  <th className="text-sm text-start text-muted">User Phone</th>
                  <th className="text-sm text-start text-muted">
                    User Location
                  </th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter((item) =>
                    item.Product.name
                      .toLowerCase()
                      .includes(filter.toLowerCase())
                  )
                  .map((item) => {
                    return (
                      <tr>
                        <td className="text-sm py-3">
                          {moment(item.createdAt).format("yyy-MM-DD")}
                        </td>
                        <td className="text-sm py-3">{item.Product.name}</td>
                        <td className="text-sm py-3">{item.User.name}</td>
                        <td className="text-sm py-3">{item.User.phone}</td>
                        <td className="text-sm py-3">{item.User.address}</td>
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

export default ScansPage;
