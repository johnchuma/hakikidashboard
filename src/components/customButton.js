const CustomButton = ({ text, loading = false, className }) => {
  return (
    <button
      type="submit"
      className={`py-2 text-sm  px-3 rounded flex justify-center bg-primaryColor text-white ${className}`}
    >
      {loading == true ? (
        <div className="border-4 size-5  rounded-full border-b-transparent border-white animate-spin rounded-s-full"></div>
      ) : (
        text ?? ""
      )}
    </button>
  );
};

export default CustomButton;
