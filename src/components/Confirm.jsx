import { useEffect, useState } from "react";

const Confirm = (props) => {
  const [userRes, setuserRes] = useState(null);
  useEffect(() => {
    if (userRes !== null) {
      props.getUserRes(userRes);
    }
  }, [userRes]);

  const handleCancel = () => {
    setuserRes(false);
  };
  const handleYes = () => {
    setuserRes(true);
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-gray-700 bg-opacity-50 fixed top-0 left-0 z-30">
      <div className="confirm-container w-[80vw] md-special:w-[30vw] shadow-lg bg-white shadow-gray-400 rounded-md fixed top-[40%] left-[10%] md-special:left-[35%]">
        <h2 className="border-b border-b-gray-300 p-2 text-gray-700 bg-gray-200 font-bold">
          {props.title}
        </h2>
        <p className="border-b border-b-gray-300 p-2 text-gray-700">
          {props.text}
        </p>
        <div className="btn flex gap-3 items-center justify-end p-1">
          <button
            className="no bg-slate-200 text-gray-700 py-1 w-[5rem] text-center rounded-sm border border-gray-300"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="yes bg-red-500 text-white py-1 w-[5rem] text-center rounded-sm border border-gray-300 "
            onClick={handleYes}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
