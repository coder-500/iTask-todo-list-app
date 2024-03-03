import { useState } from "react";

const Navbar = (props) => {
  const [title, setTitle] = useState("All Tasks");
  const handleClick = (e) => {
    let name = e.currentTarget.querySelector("span").innerHTML;
    setTitle(name);
    props.getCurrent(name);
  };
  return (
    <>
      <nav>
        <div className="button-container flex sm:flex-col sm:justify-center gap-3 sm:gap-5 overflow-x-auto sm:overflow-visible">
          <div className="btn-container-1 flex gap-3 xl:gap-10 justify-between">
            <button
              title="All Tasks"
              type="button"
              className="w-40 sm:w-[40vw] md-special:w-[27vw] h-[120px] xl:h-[90px] shadow-lg shadow-[#f6c69f] flex items-center justify-center rounded-3xl xl:rounded-[20px] text-xl sm:text-2xl xl:text-3xl font-bold text-white bg-gradient-to-br from-[#f6c69f] to-color_3 hover:bg-gradient-to-r "
              onClick={handleClick}
            >
              <span>All Tasks</span>
            </button>
            <button
              title="Pending Tasks"
              className="w-40 sm:w-[40vw] md-special:w-[27vw] h-[120px] xl:h-[90px] shadow-lg shadow-[#a4e3f6] flex items-center justify-center rounded-3xl xl:rounded-[20px] text-xl sm:text-2xl xl:text-3xl font-bold text-white bg-gradient-to-br from-[#a4e3f6] to-color_7 hover:bg-gradient-to-r "
              onClick={handleClick}
            >
              <span>Pending</span>
            </button>
          </div>
          <div className="btn-container-2 flex gap-3 xl:gap-10 justify-between">
            <button
              title="Finished Tasks"
              className="w-40 sm:w-[40vw] md-special:w-[27vw] h-[120px] xl:h-[90px] shadow-lg shadow-[#c2fad0] flex items-center justify-center rounded-3xl xl:rounded-[20px] text-xl sm:text-2xl xl:text-3xl font-bold text-white bg-gradient-to-br from-[#6ffb92] to-[#16c742] hover:bg-gradient-to-r "
              onClick={handleClick}
            >
              <span>Finished</span>
            </button>
            <button
              title="Deleted Tasks"
              className="w-40 sm:w-[40vw] md-special:w-[27vw] h-[120px] xl:h-[90px] shadow-lg shadow-[#fb997e] flex items-center justify-center rounded-3xl xl:rounded-[20px] text-xl sm:text-2xl xl:text-3xl font-bold text-white bg-gradient-to-br from-[#fb997e] to-color_5 hover:bg-gradient-to-r "
              onClick={handleClick}
            >
              <span>Deleted</span>
            </button>
          </div>
        </div>
        <div className="title pl-2 pt-6">
          <h3 className="text-2xl xl:text-3xl font-semibold">{title}</h3>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
