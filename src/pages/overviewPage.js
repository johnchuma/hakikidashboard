import moment from "moment";
import { useEffect, useState } from "react";
import { getProductScans } from "../controllers/scansController";
import Loader from "../components/loader";
import NoData from "../components/noData";
import { getOverviewStats } from "../controllers/analyticsController";

const OverviewPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [stats, setStats] = useState(null);
  useEffect(() => {
    setLoading(true);
    getProductScans().then((response) => {
      setData(response.data.body);
      getOverviewStats().then((res) => {
        setStats(res.data.body);
        setLoading(false);
      });
    });
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div className="">
      <div className="grid grid-cols-4 gap-6">
        {[
          {
            title: "Total Users",
            value: stats.totalUsers,
            today: stats.totalUsersToday,
          },
          {
            title: "Total Products",
            value: stats.totalProducts,
            today: stats.totalProductsToday,
          },
          {
            title: "Total Scans",
            value: stats.totalScans,
            today: stats.totalScansToday,
          },
          {
            title: "Total Farmers",
            value: stats.totalFarmers,
            today: stats.totalFarmersToday,
          },
        ].map((item) => {
          return (
            <div className="bg-white shadow-lg p-6 rounded">
              <h1 className="">{item.title}</h1>
              <p className="text-sm text-muted">All time</p>
              <h3 className="text-primaryColor text-xl mt-2 font-bold ">
                {item.value}
              </h3>
              <p className="text-sm">{item.today} Today</p>
            </div>
          );
        })}
      </div>
      <div className="bg-white p-8 rounded shadow-lg mt-6">
        {data.length == 0 ? (
          <NoData />
        ) : (
          <div>
            <h1 className="text-2xl">Daily Scans</h1>
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
                          {moment(item.createdAt).fromNow()}
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

export default OverviewPage;
