import React from "react";
import { useLocalStorage } from "./useLocalStorage";

function newTodoId(todoList) {
  const lista = todoList.map((todo) => todo.id);
  const max = Math.max(0, ...lista);
  return max + 1;
}
function useTodos() {
  const {
    item: todos,
    saveItem: saveTodos,
    sincronizeItem: sincronizeTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", []);
  const [searchValue, setSearchValue] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);

  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];

  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter((todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }

  const addTodo = (text) => {
    const id = newTodoId(todos);
    const newTodos = [...todos];
    newTodos.push({
      id,
      completed: false,
      text,
    });
    saveTodos(newTodos);
  };
  const getTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    return todo ?? {};
  };

  const completeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  const editTodo = (id, text) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    const newTodos = [...todos];
    newTodos[todoIndex].text = text;
    saveTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  const state = {
    loading,
    error,
    todos,
    totalTodos,
    completedTodos,
    searchValue,
    searchedTodos,
    openModal,
    getTodo,
  };

  const stateUpdaters = {
    setSearchValue,
    addTodo,
    editTodo,
    completeTodo,
    deleteTodo,
    setOpenModal,
    sincronizeTodos,
  };

  return { state, stateUpdaters };
}

export { useTodos };
