import React, { useState } from "react";
import TodoItem from "../components/TodoItem";
import "./Todo.scss";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const currentId = todos.length > 0 ? todos[todos.length - 1].id : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoInput.length > 0) {
      setTodos([
        ...todos,
        { id: Number(currentId + 1), text: todoInput, status: false },
      ]);
      setTodoInput("");
    }
  };

  const checkboxChange = (id) => {
    let newTodos = [...todos];
    newTodos.map((todo) =>
      todo.id === id
        ? (todo.status = todo.status === true ? false : true)
        : todo
    );
    setTodos(newTodos);
  };

  const deleteItem = (id) => {
    let newTodos = [...todos];
    newTodos = newTodos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const editItem = (id, text) => {
    let newTodos = [...todos];
    newTodos.map((todo) => (todo.id === id ? (todo.text = text) : todo));
    setTodos(newTodos);
  };

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
            data-testid="new-todo-input"
          ></input>
          <button data-testid="new-todo-add-button">추가</button>
        </form>
        <ul>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleCheckboxChange={checkboxChange}
              handleDeleteItem={deleteItem}
              handleEditItem={editItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
