import { useState } from "react";

import { Todo } from "./Todo";
import TodoItem from "./TodoItem";
import UpdateModal from "./components/UpdateModal";
import DeleteModal from "./components/DeleteModal";

type TodoListProps = {
  todos: Todo[];
};

const TodoList = (props: TodoListProps) => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const { todos } = props;

  const onOpenUpdateModal = (todo: Todo) => {
    setTodo(todo);
    setUpdateModal(true);
  };

  const onOpenDeleteModal = (todo: Todo) => {
    setDeleteModal(true);
    setTodo(todo);
  };

  return (
    <div className="w-full h-full p-4 gap-3 grid">
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            update={onOpenUpdateModal}
            delete={onOpenDeleteModal}
          />
        );
      })}
      {todo && updateModal && (
        <UpdateModal todo={todo} onClose={() => setUpdateModal(false)} />
      )}
      {todo && deleteModal && (
        <DeleteModal todo={todo} onClose={() => setDeleteModal(false)} />
      )}
    </div>
  );
};

export default TodoList;
