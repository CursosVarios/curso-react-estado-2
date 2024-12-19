import { useNavigate } from "react-router-dom";
import { TodoForm } from "../../ui/TodoForm";
import { useTodos } from "../useTodos";

function NewTodoPage() {
  const navigate = useNavigate();
  const { stateUpdaters } = useTodos();
  const { addTodo } = stateUpdaters;
  const goHome = () => {
    navigate("/");
  };
  return (
    <>
      <TodoForm
        onSubmitEvent={(text) => {
          addTodo(text);
          goHome();
        }}
        onClose={goHome}
      />
    </>
  );
}
export { NewTodoPage };
