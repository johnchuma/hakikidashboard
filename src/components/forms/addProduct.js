import { useState } from "react";
import CustomButton from "../customButton";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { addProduct } from "../../controllers/productsController";
import { GiCctvCamera } from "react-icons/gi";
import { CiImageOn } from "react-icons/ci";

const AddProduct = ({ fetchProducts, setShowCreateModal }) => {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  return (
    <div className="bg-dark fixed inset-0 bg-opacity-70 flex justify-center items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUploading(true);
          let formData = new FormData();
          console.log(e.target.image.files[0]);
          formData.append("file", e.target.image.files[0]);
          formData.append("name", e.target.name.value);
          formData.append("manufactureDate", e.target.manufactureDate.value);
          formData.append("expireDate", e.target.expireDate.value);
          formData.append("details", e.target.details.value);
          formData.append("introduction", e.target.introduction.value);
          formData.append("OID", e.target.OID.value);
          formData.append("size", e.target.size.value);
          formData.append("usageDetails", e.target.usageDetails.value);
          formData.append("videoLink", e.target.videoLink.value);
          console.log(formData);
          addProduct(formData)
            .then((response) => {
              setUploading(false);
              fetchProducts();
              setShowCreateModal(false);
            })
            .catch((err) => {
              toast.error("Failed to add product");
              setUploading(false);
            });
        }}
        className="bg-white w-5/12 2xl:w-4/12 shadow-2xl p-8 rounded"
      >
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-xl font-bold">Add Product</h1>
          <div
            onClick={() => {
              setShowCreateModal(false);
            }}
            className="cursor-pointer"
          >
            <AiOutlineClose />
          </div>
        </div>
        <div className="flex flex-col items-center space-y-1 mb-3">
          <label className="text-sm">Product Image</label>
          <div>
            <label for="file">
              {file ? (
                <label for="file">
                  <img className="h-24" src={URL.createObjectURL(file)} />
                </label>
              ) : (
                <CiImageOn className="text-6xl text-muted" />
              )}
            </label>
          </div>
          <input
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            name="image"
            id="file"
            required
            type="file"
            className="form-style sr-only"
            placeholder="Enter product name"
          />
        </div>
        <div className="grid grid-cols-2 text-sm gap-4">
          <div className="flex flex-col space-y-1">
            <label>Product Name</label>
            <input
              name="name"
              required
              className="form-style"
              placeholder="Enter product name"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label>Manufacture Date</label>
            <input
              type="date"
              name="manufactureDate"
              required
              className="form-style"
              placeholder="Enter manufacture date"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label>Expire Date</label>
            <input
              type="date"
              name="expireDate"
              required
              className="form-style"
              placeholder="Enter expire date"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label>OID</label>
            <input
              name="OID"
              type="number"
              required
              className="form-style"
              placeholder="Enter OID"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label>Size</label>
            <input
              name="size"
              type="number"
              required
              className="form-style"
              placeholder="Enter size"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label>Video Link</label>
            <input
              name="videoLink"
              required
              className="form-style"
              placeholder="Enter video link"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label>Details</label>
            <textarea
              name="details"
              required
              className="form-style"
              placeholder="Enter product details"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label>Introduction</label>
            <textarea
              name="introduction"
              required
              className="form-style"
              placeholder="Enter product introduction"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label>Usage Details</label>
            <textarea
              name="usageDetails"
              required
              className="form-style"
              placeholder="Enter usage details"
            />
          </div>
        </div>
        <CustomButton
          loading={uploading}
          className="mt-8 w-32"
          text="Add Product"
        />
      </form>
    </div>
  );
};

export default AddProduct;
