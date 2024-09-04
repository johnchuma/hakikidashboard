import { FcDeleteDatabase, FcNook } from "react-icons/fc";

const NoData = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <FcNook className="size-16" />
      <label className="text-muted mt-2">No Data found</label>
    </div>
  );
};

export default NoData;
