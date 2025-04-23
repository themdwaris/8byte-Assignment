

import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { FcEditImage } from "react-icons/fc";
import { FcFullTrash } from "react-icons/fc";
import "./TodoList.css";
import { useTodo } from "../../context/TodoContext";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDragHandle } from "react-icons/md";

const TodoList = ({ id, todo, setInput }) => {
  const { deleteTodo, setEditId, toggleCompleted } = useTodo();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  // const style = {
  //   transform: CSS.Transform.toString(transform),
  //   transition,
  // };
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="todoContent todoItem"
      ref={setNodeRef}
      style={style}
      // style={isDragging?{opacity:0.5}:{opacity:1}}
    >
      <div className="text">
        <button className="completed" onClick={() => toggleCompleted(todo?.id)}>
          {todo?.completed ? (
            <span>
              <IoMdCheckmarkCircle size={20} />
            </span>
          ) : (
            <IoMdCheckmarkCircleOutline size={20} />
          )}
        </button>
        <p
          className={`scrollable-hidden-scrollbar ${todo?.completed && "line"}`}
        >
          {todo?.title}
        </p>
      </div>
      <div className="actionBtns">
        <button
          onClick={() => {
            setInput(todo?.title);
            setEditId(todo?.id);
            console.log("edit");
          }}
        >
          <FcEditImage size={22} />
        </button>
        <button onClick={() => deleteTodo(todo?.id)}>
          <FcFullTrash size={22} />
        </button>
        <button {...attributes} {...listeners} className="dragBtn">
          <MdDragHandle size={24}/>
        </button>
      </div>
    </div>
  );
};

export default TodoList;
