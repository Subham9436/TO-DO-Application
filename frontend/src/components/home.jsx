import React, { useEffect, useState } from "react";
import axios from "axios";
export function Home() {
  const [tab, setTab] = useState(1);
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const handleTab = (tab) => {
    setTab(tab);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    console.log(task);
    axios.post("http://localhost:3000/create", { task }).then((res) => {
      /*.....*/ setTask("");
      setTodos(res.data);
    });
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:3000/todoget");
      console.log(response.data);
      setTodos(response.data);
    };
    fetch();
  }, []);

  const handleEdit = (id, task) => {
    setEdit(true);
    setTask(task);
    console.log(id);
    setUpdateId(id);
  };

  const updateTask = () => {
    const updatedTask = task;
    axios
      .post("http://localhost:3000/updatetodo", { updateId, updatedTask })
      .then((res) => {
        /*.....*/ setTask("");
        setTodos(res.data);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/delete/${id}`).then(function (res) {
      setTodos(res.data);
    });
  };

  const handleCompleted = (id) => {
    axios.put(`http://localhost:3000/complete/${id}`).then(function (res) {
      setTodos(res.data);
    });
  };

  return (
    <div className="min-h-screen bg-[url(/img/mountain-view-3840x2160-v0-fO2EKkqrlIFEPK79_TmiCmvFqtwsP38ZaB6wHL5EX6g.webp)] bg-cover bg-center bg-no-repeat">
      <div className="flex flex-col w-screen h-screen justify-center items-center  ">
        <div>
          <h2 className="font-bold text-2xl">TO-DO List</h2>
        </div>
        <div className="flex gap-3 mt-3">
          <input
            type="text"
            placeholder="Enter todo"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="outline-3 p-2 rounded-md w-64  "
          ></input>
          <button
            className="bg-blue-600 text-white px-2 rounded-md"
            style={{ cursor: "pointer" }}
            onClick={edit ? updateTask : handleAddTask}
          >
            {edit === true ? "Edit" : "Add"}
          </button>
        </div>
        <div className="flex text-sm  w-80 justify-evenly mt-4">
          <p
            onClick={() => handleTab(1)}
            style={{ cursor: "pointer" }}
            className={`${tab === 1 ? "text-blue-700" : "text-black"}`}
          >
            All
          </p>
          <p
            onClick={() => handleTab(2)}
            style={{ cursor: "pointer" }}
            className={`${tab === 2 ? "text-blue-700" : "text-black"}`}
          >
            Active
          </p>
          <p
            onClick={() => handleTab(3)}
            style={{ cursor: "pointer" }}
            className={`${tab === 3 ? "text-blue-700" : "text-black"}`}
          >
            Completed
          </p>
        </div>
        {tab == 1 &&
          todos.map((todo) => (
            <div className="flex justify-between bg-white/70  p-2 w-80 mt-3   ">
              <div>
                <p className="lext-lg font-semibold">{todo.task} </p>
                <p className="text-sm text-gray-600">
                  {new Date(todo.createdAt).toLocaleString()}{" "}
                </p>
                <p className="text-sm text-gray-600 ">
                  {" "}
                  Status: <strong>{todo.Status}</strong>
                </p>
              </div>
              <div className="flex flex-col text-sm justify-start ">
                <button
                  className="text-blue-400 "
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleEdit(todo._id, todo.task);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 "
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(todo._id)}
                >
                  Delete
                </button>
                <button
                  className="text-green-700 "
                  style={{ cursor: "pointer" }}
                  onClick={() => handleCompleted(todo._id)}
                >
                  Completed
                </button>
              </div>
            </div>
          ))}
        {tab == 2 &&
          todos
            .filter((todos) => todos.Status === "active")
            .map((todo) => (
              <div className="flex justify-between bg-white/70 bg-opacity-50 p-2 w-80 mt-3   ">
                <div>
                  <p className="lext-lg font-semibold">{todo.task} </p>
                  <p className="text-sm text-gray-600">
                    {new Date(todo.createdAt).toLocaleString()}{" "}
                  </p>
                  <p className="text-sm text-gray-600 ">
                    {" "}
                    Status: <strong>{todo.Status}</strong>
                  </p>
                </div>
                <div className="flex flex-col text-sm justify-start ">
                  <button
                    className="text-blue-400 "
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleEdit(todo._id, todo.task);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 "
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(todo._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="text-green-700 "
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCompleted(todo._id)}
                  >
                    Completed
                  </button>
                </div>
              </div>
            ))}
        {tab == 3 &&
          todos
            .filter((todos) => todos.Status === "completed")
            .map((todo) => (
              <div className="flex justify-between bg-white/70  p-2 w-80 mt-3   ">
                <div>
                  <p className="lext-lg font-semibold">{todo.task} </p>
                  <p className="text-sm text-gray-600">
                    {new Date(todo.createdAt).toLocaleString()}{" "}
                  </p>
                  <p className="text-sm text-gray-600 ">
                    {" "}
                    Status: <strong>{todo.Status}</strong>
                  </p>
                </div>
                <div className="flex flex-col text-sm justify-center ">
                  <button
                    className="text-red-600 "
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(todo._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
