import React, { useEffect, useState } from "react";
import "./TodoItem.scss";

export default function TodoItem({
  todo,
  handleCheckboxChange,
  handleDeleteItem,
  handleEditItem,
}) {
  const [editToggle, setEditToggle] = useState(false);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    setEditText(todo.todo);
  }, []);

  const cancelEdit = () => {
    setEditToggle(!editToggle);
    setEditText(todo.todo);
  };

  const completeEdit = () => {
    handleEditItem(todo.id, editText);
    setEditToggle(!editToggle);
  };

  return (
    <li className="itemWrap">
      <label>
        <input
          className="checkbox"
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => handleCheckboxChange(todo.id)}
        />
        {editToggle === false ? (
          <p>{todo.todo}</p>
        ) : (
          <input
            className="textbox"
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            data-testid="modify-input"
          ></input>
        )}
      </label>
      {editToggle === false ? (
        <div className="button">
          <button
            onClick={() => setEditToggle(!editToggle)}
            data-testid="modify-button"
          >
            수정
          </button>
          <button
            onClick={() => handleDeleteItem(todo.id)}
            data-testid="delete-button"
          >
            삭제
          </button>
        </div>
      ) : (
        <div className="button">
          <button onClick={completeEdit} data-testid="submit-button">
            제출
          </button>
          <button onClick={cancelEdit} data-testid="cancel-button">
            취소
          </button>
        </div>
      )}
    </li>
  );
}
