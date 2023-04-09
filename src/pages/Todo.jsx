import React, { useState, useEffect } from "react";
import TodoItem from "../components/TodoItem";
import "./Todo.scss";
import { useNavigate } from "react-router-dom";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [isUpdated, setIsUpdated] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("access_token");
    if (token === null) {
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    fetch("https://www.pre-onboarding-selection-task.shop/todos", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("access_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  useEffect(() => {
    fetch("https://www.pre-onboarding-selection-task.shop/todos", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("access_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });
  }, [isUpdated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoInput.length > 0) {
      fetch("https://www.pre-onboarding-selection-task.shop/todos", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer " + window.localStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo: todoInput,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setTodos([...todos, data]);
        });
      setTodoInput("");
    }
  };

  const checkboxChange = (id) => {
    let [todo] = todos.filter((todo) => todo.id === id);
    fetch(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo: todo.todo,
        isCompleted: !todo.isCompleted,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        let newTodos = [...todos];
        newTodos.map((todo) => (todo.id === id ? (todo = data) : todo));
        setTodos(newTodos);
        setIsUpdated(isUpdated === 0 ? 1 : 0);
      });
  };

  const deleteItem = (id) => {
    fetch(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("access_token"),
      },
    }).then((res) => {
      console.log(res.status);
      setIsUpdated(isUpdated === 0 ? 1 : 0);
    });
  };

  const editItem = (id, text) => {
    let [todo] = todos.filter((todo) => todo.id === id);
    fetch(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo: text,
        isCompleted: todo.isCompleted,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        let newTodos = [...todos];
        newTodos.map((todo) => (todo.id === id ? (todo = data) : todo));
        setTodos(newTodos);
        setIsUpdated(isUpdated === 0 ? 1 : 0);
      });
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
