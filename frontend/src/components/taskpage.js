import { useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowdimentions";

export const TaskPage = () => {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json().then((data) => setTodo(data)))
      .catch((e) => console.log(e.message));
  }, []);

  const dimentions = useWindowDimensions();

  const handleChange = (e, id) => {
    if (e.target.checked) {
      const index = todo.findIndex((e) => e.id === id);
      todo.splice(index, 1);
      setTodo([...todo]);
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
          <div>
            <h2>How to use? </h2>
             host: {process.env.DATABASE_HOST}
            <ul>
              <li>
                For the sake of simplicity we are pulling todo list from{" "}
                <a
                  target={"_blank"}
                  href="https://jsonplaceholder.typicode.com/todos"
                >
                  Jsonplaceholder
                </a>
              </li>
              <li>
                We can mark item as completed when done and it will be removed
                from the list
              </li>
            </ul>
          </div>
          <div>
            <h2>Stats</h2>
            <p className="bold">
              Total Pending Tasks : <span className="red">{todo.length}</span>
            </p>
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
            {todo.map((item, index) => {
              return (
                <li className="item" key={item.id}>
                  <label className="todo_item">
                    <input
                      type={"checkbox"}
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
