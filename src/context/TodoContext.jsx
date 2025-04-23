import { createContext, useContext, useState } from "react";

const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [editId, setEditId] = useState("");
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);

  const addTodo = (input) => {
    // Update Todo
    if (editId) {
      const isTodoExists = todos.find((t) => t.id === editId);
      if (!isTodoExists) return;

      const updatedTodo = todos?.map((curr) => {
        if (curr?.id === editId) {
          return { ...curr, title: input, id: editId };
        }
        return curr;
      });
      setTodos(updatedTodo);
      localStorage.setItem("todos", JSON.stringify(updatedTodo));
    } else {
      // Add Todo
      if (!input) {
        setModal(true);
        return;
      }
      setTodos((prev) => [
        ...prev,
        { title: input, id: crypto.randomUUID(), completed: false },
      ]);

      localStorage.setItem(
        "todos",
        JSON.stringify([
          ...todos,
          { title: input, id: crypto.randomUUID(), completed: false },
        ])
      );
    }
  };

  const toggleCompleted = (id) => {
    const isNum = typeof id === "number";

    if (isNum) {
      const isTodoExists = data?.find((t) => t?.id === id);
      if (!isTodoExists) return;

      const newTodos = data?.map((task) => {
        if (task?.id === id) {
          return { ...task, completed: !task.completed, id: id };
        }
        return task;
      });
      setData(newTodos);
    } else {
      const isTodoExists = todos?.find((t) => t?.id === id);
      if (!isTodoExists) return;

      const newTodos = todos?.map((task) => {
        if (task?.id === id) {
          return { ...task, completed: !task.completed, id: id };
        }
        return task;
      });
      setTodos(newTodos);
      localStorage.setItem("todos", JSON.stringify(newTodos));
    }
  };
  
  const deleteTodo = (id) => {
    const remainTodo = todos.filter((todo) => todo.id !== id);
    setTodos(remainTodo);
    localStorage.setItem("todos", JSON.stringify(remainTodo));
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        addTodo,
        deleteTodo,
        editId,
        setEditId,
        toggleCompleted,
        modal,
        setModal,
        show,
        setShow,
        data,
        setData,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
const useTodo = () => useContext(TodoContext);

export { TodoContext, TodoContextProvider, useTodo };
