import React from "react";
import "./TodoForm.css";

function TodoForm({ onSubmitEvent, onClose, isEdit, initialText }) {
  const [newTodoValue, setNewTodoValue] = React.useState(initialText ?? "");

  const onChange = (event) => {
    setNewTodoValue(event.target.value);
  };
  const onCancel = () => {
    onClose();
  };
  const onSubmit = (event) => {
    event.preventDefault();
    onSubmitEvent(newTodoValue.trim());
    onClose();
  };
  let title = "Escribe tu nuevo TODO";
  let buttonText = "Añadir";
  if (isEdit) {
    title = "Edita el TODO";
    buttonText = "Actualizar";
  }
  return (
    <form onSubmit={onSubmit}>
      <label>{title}</label>
      <textarea
        value={newTodoValue}
        onChange={onChange}
        placeholder="Cortar la cebolla oara el almuerzo"
      />
      <div className="TodoForm-buttonContainer">
        <button
          type="button"
          className="TodoForm-button TodoForm-button--cancel"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button type="submit" className="TodoForm-button TodoForm-button--add">
          {buttonText}
        </button>
      </div>
    </form>
  );
}

export { TodoForm };
