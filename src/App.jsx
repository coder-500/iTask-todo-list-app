import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";
import AddTask from "./components/AddTask";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import Confirm from "./components/Confirm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [finishedTask, setFinishedTask] = useState([]);
  const [deletedTask, setDeletedTask] = useState([]);

  const [allTaskVisibility, setAllTaskVisibility] = useState(true);
  const [pendingVisibility, setPendingVisibility] = useState(false);
  const [finishedVisibility, setFinishedVisibility] = useState(false);
  const [deletedVisibility, setDeletedVisibility] = useState(false);

  const [editable, setEditable] = useState();
  const [editStatus, setEditStatus] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("tasks")) {
      let allTasks = JSON.parse(localStorage.getItem("tasks"));
      setTasks(allTasks);
    }

    if (localStorage.getItem("deleted")) {
      let allDeleted = JSON.parse(localStorage.getItem("deleted"));
      setDeletedTask(allDeleted);
    }
  }, []);

  useEffect(() => {
    let finished = tasks.filter((item) => {
      if (item.isCompleted) {
        return item;
      }
    });
    let pending = tasks.filter((item) => {
      if (!item.isCompleted) {
        return item;
      }
    });
    setFinishedTask(finished);
    setPendingTasks(pending);

    if (tasks.length !== 0) {
      addToLocal();
    }
    if (tasks.length === 0) {
      clearLocal("tasks");
    }

    if (deletedTask.length !== 0) {
      addToLocal();
    }

    if (deletedTask.length === 0) {
      clearLocal("deleted");
    }
  }, [tasks, deletedTask]);

  const addToLocal = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));

    localStorage.setItem("deleted", JSON.stringify(deletedTask));
  };

  const clearLocal = (key) => {
    localStorage[key] = [];
  };

  const getTasks = (task) => {
    setTasks([
      ...tasks,
      { id: uuidv4(), task, isCompleted: false, isDeleted: false },
    ]);
  };

  const changeStatus = (id) => {
    let newTodo = [...tasks];
    newTodo.map((item) => {
      if (item.id === id) {
        return (item.isCompleted = !item.isCompleted);
      }
    });
    setTasks(newTodo);
  };

  const deleteTask = (id) => {
    let deleted = tasks.filter((item) => {
      return item.id === id;
    });

    let newTodo = tasks.filter((item) => {
      return item.id !== id;
    });

    setTasks(newTodo);
    setDeletedTask([...deletedTask, { ...deleted[0], isDeleted: true }]);
  };

  //Delete Permanently
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [deleteFlagTask, setDeleteFlagTask] = useState();
  const deleteTaskPermanently = (id) => {
    setDeleteFlag(true);

    let deleteTodo = deletedTask.filter((item) => {
      return item.id === id;
    });
    setDeleteFlagTask(deleteTodo[0]);
  };

  const getUserRes = (res) => {
    if (res) {
      let newDeleted = deletedTask.filter((item) => {
        return item !== deleteFlagTask;
      });
      setDeletedTask(newDeleted);
      setDeleteFlag(false);
    } else {
      setDeleteFlag(false);
    }
  };

  const editTask = (id) => {
    let newTask = tasks.filter((item) => {
      return item.id === id;
    });
    setEditable(newTask[0]);
    setEditStatus(!editStatus);
  };
  const updateTask = (task) => {
    let updatedTasks = [...tasks];
    updatedTasks.map((item) => {
      if (item.id === editable.id) {
        return (item.task = task);
      }
    });
    setTasks(updatedTasks);
  };

  const getCurrent = (btnName) => {
    switch (btnName) {
      case "All Tasks":
        setAllTaskVisibility(true);
        setPendingVisibility(false);
        setFinishedVisibility(false);
        setDeletedVisibility(false);
        break;
      case "Pending":
        setAllTaskVisibility(false);
        setPendingVisibility(true);
        setFinishedVisibility(false);
        setDeletedVisibility(false);
        break;
      case "Finished":
        setAllTaskVisibility(false);
        setPendingVisibility(false);
        setFinishedVisibility(true);
        setDeletedVisibility(false);
        break;
      case "Deleted":
        setAllTaskVisibility(false);
        setPendingVisibility(false);
        setFinishedVisibility(false);
        setDeletedVisibility(true);
        break;
      default:
        break;
    }
    if (btnName === "All Tasks") {
      setAllTaskVisibility(true);
    }
  };

  return (
    <>
      <nav className="w-full sticky top-0 p-5 bg-[#f5f5f5] z-10">
        <div className="logo container sm:w-[80vw] md-special:w-[55vw] sm:mx-auto">
          <div className="text-black text-2xl sm:text-3xl font-extralight flex justify-start ">
            <span className="border border-color_6 rounded-3xl p-2 cursor-default select-none">
              iTask
            </span>
          </div>
        </div>
      </nav>

      <div className="md:container px-5 sm:pl-0 sm:w-[80vw] md-special:w-[55vw] flex flex-col justify-center mx-auto gap-5 relative pb-10">
        <AddTask
          getTasks={getTasks}
          editable={editable}
          editStatus={editStatus}
          updateTask={updateTask}
          pending={pendingTasks}
        />
        <Navbar getCurrent={getCurrent} />

        {tasks.length === 0 && allTaskVisibility && (
          <div className="text-xl sm-special:text-3xl font-light mx-auto mt-16 text-nowrap">
            Nothing To Display
          </div>
        )}

        {allTaskVisibility &&
          tasks.map((item) => {
            return (
              <Card
                key={item.id}
                data={item}
                changeStatus={changeStatus}
                deleteTask={deleteTask}
                editTask={editTask}
              />
            );
          })}

        {pendingTasks.length === 0 && pendingVisibility && (
          <div className="text-xl sm-special:text-3xl font-light mx-auto mt-16 text-nowrap">
            Nothing To Display
          </div>
        )}
        {pendingVisibility &&
          pendingTasks.map((item) => {
            return (
              <Card
                key={item.id}
                data={item}
                changeStatus={changeStatus}
                deleteTask={deleteTask}
                editTask={editTask}
              />
            );
          })}

        {finishedTask.length === 0 && finishedVisibility && (
          <div className="text-xl sm-special:text-3xl font-light mx-auto mt-16 text-nowrap">
            Nothing To Display
          </div>
        )}
        {finishedVisibility &&
          finishedTask.map((item) => {
            return (
              <Card
                key={item.id}
                data={item}
                changeStatus={changeStatus}
                deleteTask={deleteTask}
                editTask={editTask}
              />
            );
          })}

        {deletedTask.length === 0 && deletedVisibility && (
          <div className="text-xl sm-special:text-3xl font-light mx-auto mt-16 text-nowrap">
            Nothing To Display
          </div>
        )}

        {deletedVisibility &&
          deletedTask.map((item) => {
            return (
              <Card
                key={item.id}
                data={item}
                deleteTaskPermanently={deleteTaskPermanently}
              />
            );
          })}
        {deletedVisibility && deleteFlag && (
          <Confirm
            title={"Delete Permanently"}
            text={"Are you sure you want to delete this task permanently?"}
            getUserRes={getUserRes}
          />
        )}
      </div>
    </>
  );
}

export default App;
