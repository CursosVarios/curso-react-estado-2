import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TodoForm } from "../../ui/TodoForm";
import { useTodos } from "../useTodos";

function EditTodoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, stateUpdaters } = useTodos();
  const { loading, getTodo } = state;
  const { editTodo } = stateUpdaters;
  const param = useParams();
  const id = Number(param.id);
  let todoText = "";
  if (location.state?.todo?.id === id) {
    todoText = location.state.todo.text;
  }
  if (loading && !todoText) {
    return <p>..cargando</p>;
  }

  if (!todoText) {
    const todo = getTodo(id);
    todoText = todo.text;
  }
  const goHome = () => {
    navigate("/");
  };
  return (
    <>
      <TodoForm
        isEdit={true}
        initialText={todoText}
        onSubmitEvent={(text) => {
          editTodo(id, text);
          goHome();
        }}
        onClose={goHome}
      />
    </>
  );
}
export { EditTodoPage };
