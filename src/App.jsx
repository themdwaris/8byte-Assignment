
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";
import { useTodo } from "./context/TodoContext";
import TodoList from "./components/TodoList/TodoList";
import Modal from "./components/Modal/Modal";
import SampleTodo from "./components/SampleTodo/SampleTodo";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";


const App = () => {
  const [input, setInput] = useState("");
  const { todos, setTodos, addTodo, editId, modal, setShow, show } = useTodo();
  const [filterTodo, setFilterTodo] = useState([]);
  const [query, setQuery] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    addTodo(input);
    setInput("");
  };

  
   // ✅ Add TouchSensor for mobile support
   const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id);
      const newIndex = todos.findIndex((todo) => todo.id === over?.id);
      setTodos(arrayMove(todos, oldIndex, newIndex));
    }
  };

  const getFilteredTodo = () => {
    let copy = todos && todos?.length > 0 && todos.slice();
    copy = copy?.filter((todo) =>
      todo?.title?.toLowerCase().includes(query?.toLowerCase())
    );
    setFilterTodo(copy);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (todos?.length > 0) {
        getFilteredTodo();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query, todos]);

  return (
    <div className="main">
      <h1 className="header">
        The Todo <span>App</span>
      </h1>
      {modal && <Modal />}
      <div className="searchAndTab">
        <button className="tabBtn" onClick={() => setShow(true)}>
          Sample Todos
        </button>
        <div className="search">
          <input
            type="text"
            placeholder="Search Todo..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button>
            <FcSearch size={24} />
          </button>
        </div>
      </div>
      {show && <SampleTodo />}
      <form className="inputForm" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="What to Do Today?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="addBtn" type="submit">
          {editId&&input.trim().length>0 ? <FaRegEdit size={25} /> : <IoMdAdd size={30} />}
        </button>
      </form>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={todos} strategy={verticalListSortingStrategy}>
          <ul className="todoList hide-scrollbar">
            {filterTodo &&
              filterTodo?.length > 0 &&
              (query ? filterTodo : todos)?.map((todo, index) => (
                <li key={index}>
                  <TodoList todo={todo} setInput={setInput} id={todo.id} />
                </li>
              ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default App;
