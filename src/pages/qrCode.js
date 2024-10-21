import { useParams } from "react-router-dom";
import { useGetParams } from "../components/getParams";
import Back from "../components/back";

const QRCode = () => {
  const params = useGetParams();
  return (
    <div>
      <Back />
      <div className="">
        {params.qr}
        <img src={params.qr} alt="QR Code" />
      </div>
    </div>
  );
};

export default QRCode;
