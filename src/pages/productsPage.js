import { useContext, useEffect, useState } from "react";
import CustomButton from "../components/customButton";
import Loader from "../components/loader";
import { getUsers } from "../controllers/authController";
import { getProductScans } from "../controllers/scansController";
import { deleteProduct, getProducts } from "../controllers/productsController";
import moment from "moment";
import NoData from "../components/noData";
import AddProduct from "../components/forms/addProduct";
import { AppContext } from "../layouts/mainLayout";
import toast from "react-hot-toast";

const ProductsPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { setShowDelete, setOnDelete } = useContext(AppContext);
  const fetchProducts = async () => {
    const response = await getProducts();
    setLoading(false);
    setData(response.data.body);
  };
  useEffect(() => {
    console.log(
      Math.floor(Math.random() * 1000000000000)
        .toString()
        .padStart(12, "0")
    );
    fetchProducts();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div className="">
      <div className="flex justify-between items-center border-b border-muted border-opacity-40 pb-2">
        <h1 className="  text-2xl font-bold">Products</h1>
        {showCreateModal && (
          <AddProduct
            setShowCreateModal={setShowCreateModal}
            fetchProducts={fetchProducts}
          />
        )}
        <CustomButton
          onTap={() => {
            setShowCreateModal(true);
          }}
          text={"Add Product"}
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
                        <td className="text-sm py-3">
                          <button
                            className="hover:bg-primaryColor transition-all"
                            onClick={() => window.open(item.qrCode, "__blank")}
                          >
                            QR Code
                          </button>
                        </td>
                        <td
                          onClick={() => {
                            setShowDelete(true);
                            setOnDelete(() => () => {
                              deleteProduct(item.uuid).then((res) => {
                                fetchProducts();
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

export default ProductsPage;
