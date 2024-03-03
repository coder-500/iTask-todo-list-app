import { useState } from "react";

import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
const Card = (props) => {
  const [todo, setTodo] = useState(props);

  const handleChange = () => {
    props.changeStatus(props.data.id);
  };

  const handleDelete = () => {
    if (props.data.isDeleted) {
      props.deleteTaskPermanently(props.data.id);
    } else {
      props.deleteTask(props.data.id);
    }
  };

  const handleEdit = () => {
    props.editTask(props.data.id);
  };
  return (
    <>
      <div className="card w-full bg-white shadow-md shadow-gray-600 p-6 rounded-2xl flex flex-col items-start sm:flex-row sm:items-center justify-between gap-4">
        <div className="task-container">
          <div className="text flex gap-3 items-center">
            <input
              type="checkbox"
              id={todo.data.id}
              name="task-checked"
              value={todo.data.isCompleted}
              onChange={handleChange}
              className={"w-5 h-5" + (todo.data.isDeleted ? " hidden" : "")}
              checked={todo.data.isCompleted}
            />
            <label
              htmlFor={todo.data.id}
              className={todo.data.isCompleted ? "line-through" : ""}
            >
              {todo.data.task}
            </label>
          </div>
        </div>
        <div className="btn-container flex justify-end items-center gap-2">
          <button
            className={
              "p-2 rounded-lg text-center bg-color_8 text-lg text-white hover:opacity-90 " +
              (todo.data.isDeleted ? "hidden" : "")
            }
            onClick={handleEdit}
          >
            <FiEdit />
          </button>
          <button
            className="p-2 rounded-lg text-center bg-color_5 text-lg text-white hover:opacity-90"
            onClick={handleDelete}
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
