import React from "react";
import { ChangeAlert } from "../../ui/ChangeAlert";
import { CreateTodoButton } from "../../ui/CreateTodoButton";
import { EmptyTodos } from "../../ui/EmptyTodos";
import { Modal } from "../../ui/Modal";
import { TodoCounter } from "../../ui/TodoCounter";
import { TodoForm } from "../../ui/TodoForm";
import { TodoHeader } from "../../ui/TodoHeader";
import { TodoItem } from "../../ui/TodoItem";
import { TodoList } from "../../ui/TodoList";
import { TodoSearch } from "../../ui/TodoSearch";
import { TodosError } from "../../ui/TodosError";
import { TodosLoading } from "../../ui/TodosLoading";
import { useTodos } from "../useTodos";

function HomePage() {
  const { state, stateUpdaters } = useTodos();

  const { error, loading, searchedTodos, totalTodos, openModal, searchValue } =
    state;

  const {
    completedTodos,
    setOpenModal,
    addTodo,
    completeTodo,
    deleteTodo,
    setSearchValue,
    sincronizeTodos,
  } = stateUpdaters;

  return (
    <React.Fragment>
      <TodoHeader loading={loading}>
        <TodoCounter totalTodos={totalTodos} completedTodos={completedTodos} />
        <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
      </TodoHeader>

      <TodoList
        error={error}
        loading={loading}
        totalTodos={totalTodos}
        searchedTodos={searchedTodos}
        searchText={searchValue}
        onError={() => <TodosError />}
        onLoading={() => <TodosLoading />}
        onEmptyTodos={() => <EmptyTodos />}
        onEmptySearchResults={(searchText) => (
          <p>No hay resultados para {searchText}</p>
        )}
      >
        {(todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onEdit={() => console.log("Edit", todo)}
            onComplete={() => completeTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        )}
      </TodoList>

      {!!openModal && (
        <Modal>
          <TodoForm addTodo={addTodo} setOpenModal={setOpenModal} />
        </Modal>
      )}

      <CreateTodoButton setOpenModal={setOpenModal} />

      <ChangeAlert sincronize={sincronizeTodos} />
    </React.Fragment>
  );
}

export { HomePage };
