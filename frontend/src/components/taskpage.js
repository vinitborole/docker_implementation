import { useEffect, useState } from "react";
import { addTodo, getTodo, updateTodo } from "../api/api";
import useWindowDimensions from "../hooks/useWindowdimentions";

export const TaskPage = () => {
  const [todo, setTodo] = useState([]);
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchTodo = () => {
    getTodo()
      .then((data) => {
        console.log(data);
        setTodo([...data.data]);
      })
      .catch((err) => alert(err.message));
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  const dimentions = useWindowDimensions();

  const handleChange = (e, id) => {
    updateTodo(id, { completed: e.target.checked })
      .then((data) => fetchTodo())
      .catch((err) => alert(err.message));
  };

  const handleSubmit = () => {
    console.log(task);
    if (task) {
      addTodo({
        title: task,
      })
        .then((data) => {
          setTask("");
          fetchTodo();
        })
        .catch((e) => {
          alert(e.message);
        });
    }
  };
  return (
    <>
      <div className="flex">
        <div className="half first">
          <div className="center">
            <h1>Daily Task Manager</h1>
            <p>
              A simple application to demonstrate React Application
              Containerisaion with Docker.
            </p>
          </div>
          <div className="addNew">
            <input
              className="inp"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Add new task here"
            />
            <button disabled={!task} onClick={handleSubmit} className="addBtn">
              Add
            </button>
          </div>
          <div>
            <h2>How to use? </h2>
            <ul>
              <li>Add a task to be done from above input box.</li>
              <li>Mark task completed from Right Plane</li>
              <li>Select dedicatd filter from buttons below</li>
            </ul>
          </div>
          <div>
            <h2>Stats</h2>

            <div className="btnBox">
              <button onClick={() => setFilter("all")} className="btn black">
                All ({todo.length}){" "}
              </button>
              <button
                onClick={() => setFilter("completed")}
                className="btn green"
              >
                Complete ({todo.filter((e) => e.completed === 1).length}){" "}
              </button>
              <button
                onClick={() => setFilter("pending")}
                className="btn redbtn"
              >
                Pending ({todo.filter((e) => e.completed === 0).length}){" "}
              </button>
            </div>
          </div>
        </div>
        <div className="half second">
          <ul
            style={{
              height: dimentions.height - 93,
              overflowY: "scroll",
              listStyle: "none",
              overflowX: "hidden",
              margin: 0,
            }}
          >
            {todo
              .filter((e) => {
                switch (filter) {
                  case "completed":
                    return e.completed === 1;
                  case "pending":
                    return e.completed === 0;
                  default:
                    return e;
                }
              })
              .map((item, index) => {
                return (
                  <li className="item" key={item.id}>
                    <label className="todo_item">
                      <input
                        type={"checkbox"}
                        name="tasktodo"
                        defaultChecked={item.completed}
                        value={item.completed}
                        onChange={(e) => handleChange(e, item.id)}
                      />
                      <p className="todo_title">{item.title}</p>
                    </label>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
};
