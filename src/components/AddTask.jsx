import { useEffect, useState } from "react";
import DatePicker from "./DatePicker";

import { HiPlus } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";

const AddTask = (props) => {
  const [todo, setTodo] = useState("");
  const [inputBoxVisibility, setInputBoxVisibility] = useState();

  const [editStatus, setEditStatus] = useState(false);
  // Handle Edit
  useEffect(() => {
    if (props.editable) {
      setTodo(props.editable.task);
      setInputBoxVisibility(true);
      setEditStatus(true);
    }
  }, [props.editable, props.editStatus]);

  const handleCreate = () => {
    setInputBoxVisibility(true);
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleAdd = () => {
    if (todo.trim()) {
      props.getTasks(todo);
      setTodo("");
    }
  };

  const handleEdit = () => {
    if (todo.trim()) {
      props.updateTask(todo);
      setTodo("");
      setEditStatus(false);
    }
  };

  const handleClose = () => {
    setInputBoxVisibility(false);
    setTodo("");
    setEditStatus(false);
  };
  const date = new Date(Date.now());
  return (
    <>
      <div className="addTask-container flex justify-between items-center gap-5  py-5 pr-3">
        <div className="date-text flex items-start justify-between w-full sm:w-auto gap-5">
          <div className="text-content flex flex-col items-start justify-center">
            <h2 className="text-xl md-special:text-3xl font-medium">
              {date.toDateString().split(" ").slice(0, -1).join(", ")}
            </h2>
            <p className="text-sm md-special:text-base font-extralight">
              {props.pending.length}{" "}
              {props.pending.length > 1 ? "Tasks" : "Task"} Pending
            </p>
          </div>
          <div className="date-picker ">
            <DatePicker />
          </div>
        </div>

        <div className="addTask fixed bottom-8 right-2 sm:right-[10vw] md-special:right-[23vw] sm:top-4 z-20 pr-4 h-20">
          <button
            className="hidden sm:block w-[20vw] md-special:w-[13vw] xl:w-[10vw] py-4 bg-[#625B5B] rounded-xl hover:opacity-95 "
            onClick={handleCreate}
          >
            <div className=" text-white font-bold flex items-center justify-center">
              <span className="text-2xl">
                <HiPlus />
              </span>
              <span className="text-lg xl:text-xl">New Task</span>
            </div>
          </button>
          <button
            className="w-14 h-14 bg-color_3 rounded-full sm:hidden flex justify-center items-center shadow-lg shadow-color_3"
            onClick={handleCreate}
          >
            <span className="text-4xl text-white font-regular">
              <HiPlus />
            </span>
          </button>
        </div>

        <div
          className={
            "addTaskWindow fixed bottom-5 sm:top-20 z-30 right-4 sm:right-[4rem] p-6 w-4/5 h-1/4 sm:h-1/2 sm:w-1/2 rounded-2xl bg-color_4 " +
            (inputBoxVisibility ? "" : "hidden")
          }
        >
          <div className="w-full flex items-center justify-end gap-3 flex-wrap pt-5">
            <input
              type="text"
              name="text"
              id="task"
              value={todo}
              placeholder="Enter Task"
              onChange={handleChange}
              className="p-3 rounded-md w-full object-contain"
            />
            <button
              className="border p-3 px-5 bg-color_8 text-color_1 hover:opacity-90 rounded-md"
              onClick={editStatus ? handleEdit : handleAdd}
            >
              Add
            </button>
          </div>
          <div
            className="close text-2xl font-extrabold bg-black bg-opacity-20 text-color_1 p-1 absolute top-2 right-6 cursor-pointer rounded-sm"
            onClick={handleClose}
          >
            <RxCross1 />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTask;
