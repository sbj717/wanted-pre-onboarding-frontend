import React, { useState } from "react";
import TodoItem from "../components/TodoItem";
import "./Todo.scss";

export default function Todo() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "사전과제 구현하기",
      status: "true",
    },
    {
      id: 2,
      text: "사전과제 제출하기",
      status: "false",
    },
  ]);
  const [todoInput, setTodoInput] = useState("");

  const handleSubmit = () => {};

  return (
    <div className="todoContainer">
      <div className="todoWrap">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add todo"
            value={todoInput}
            onChange={(e) => {
              setTodoInput(e.target.value);
            }}
          ></input>
          <button>추가</button>
        </form>
        <ul>
          {todos.map((todo) => {
            <TodoItem key={todo.id} todo={todo} />;
          })}
        </ul>
      </div>
    </div>
  );
}
