import React, { useEffect } from "react";
import "./SampleTodo.css";
import "../TodoList/TodoList.css";
import {
  IoMdCheckmarkCircle,
  IoMdCheckmarkCircleOutline,
} from "react-icons/io";

import { useTodo } from "../../context/TodoContext";
const SampleTodo = () => {
  const { setShow, data, setData,toggleCompleted } = useTodo();

  const fetchTodos = async () => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
      const data = await res.json();
      setData(data?.slice(0, 10));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  
  return (
    <div className="sampleTodo" onClick={() => setShow(false)}>
        
      <div className="sampleContent hide-scrollbar" onClick={(e) => e.stopPropagation()}>
      <h1>Fetched from API</h1>
        {data &&
          data.length > 0 &&
          data?.map((todo) => (
            <div key={todo.id} className="todoContent">
              <div className="text">
                <button
                  className="completed"
                  onClick={() => {
                    toggleCompleted(todo?.id)
                    console.log(todo.id);
                    
                  }}
                >
                  {todo?.completed ? (
                    <span>
                      <IoMdCheckmarkCircle size={20} />
                    </span>
                  ) : (
                    <IoMdCheckmarkCircleOutline size={20} />
                  )}
                </button>
                <p className="title">{todo?.title}</p>
              </div>

            </div>
          ))}
      </div>
    </div>
  );
};

export default SampleTodo;
