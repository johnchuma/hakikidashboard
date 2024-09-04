import { useEffect, useState } from "react";
import CustomButton from "../components/customButton";
import Loader from "../components/loader";
import { getUsers } from "../controllers/authController";
import { getProductScans } from "../controllers/scansController";
import { getProducts } from "../controllers/productsController";
import moment from "moment";
import NoData from "../components/noData";

const ProductsPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    setLoading(true);
    getProducts().then((response) => {
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
        <h1 className="  text-2xl font-bold">Products</h1>
        <CustomButton text={"Add Product"} />
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
                  <th className="text-sm text-start text-muted">Image</th>

                  <th className="text-sm text-start text-muted">Created At</th>
                  <th className="text-sm text-start text-muted">Name</th>
                  <th className="text-sm text-start text-muted">
                    Scratch Code
                  </th>
                  <th className="text-sm text-start text-muted">Size</th>
                  <th className="text-sm text-start text-muted">
                    Manufacture Date
                  </th>
                  <th className="text-sm text-start text-muted">Expire Date</th>
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
                        <td>
                          <img className="size-12" src={item.image} />
                        </td>
                        <td className="text-sm py-3">
                          {moment(item.createdAt).format("yyy-MM-DD")}
                        </td>
                        <td className="text-sm py-4">{item.name}</td>
                        <td className="text-sm py-4">{item.scratchCode}</td>
                        <td className="text-sm py-4">{item.size}kg</td>
                        <td className="text-sm py-4">
                          {moment(item.manufactureDate).format("yyy-MM-DD")}
                        </td>
                        <td className="text-sm py-3">
                          {moment(item.expireDate).format("yyy-MM-DD")}
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

export default ProductsPage;
