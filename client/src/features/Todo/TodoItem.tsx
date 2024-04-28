import { formatTime } from "../../util/formatTime";
import { Todo } from "./Todo";

type TodoItemProps = {
  todo: Todo;
  update: (todo: Todo) => void;
  delete: (todo: Todo) => void;
};

const TodoItem = (props: TodoItemProps) => {
  const { todo, update, delete: openDelete } = props;

  const onUpdate = (todo: Todo) => {
    update(todo);
  };

  const onDelete = (todo: Todo) => {
    openDelete(todo);
  };

  return (
    <div className="bg-white p-4 rounded-xl flex justify-between">
      <div className="flex gap-4">
        <input type="checkbox" className="w-5" defaultChecked={todo.ready} />
        <div>
          <p>{todo.name}</p>
          <p>{formatTime(todo.created_at)}</p>
        </div>
      </div>

      <div>
        <button onClick={() => onDelete(todo)}>
          <svg
            className="h-8 w-8 text-red-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <polyline points="3 6 5 6 21 6" />{" "}
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>

        <button onClick={() => onUpdate(todo)}>
          <svg
            className="h-8 w-8 text-gray-500"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{" "}
            <line x1="16" y1="5" x2="19" y2="8" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
