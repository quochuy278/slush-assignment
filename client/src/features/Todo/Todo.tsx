import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../../api/todo";
import CreateModal from "./components/CreateModal";

type FilterOption = {
  id: number;
  title: string;
  value: string;
};

export type Todo = {
  id: string;
  name: string;
  description: string;
  ready: boolean;
  created_at: string;
};

const TODO_FILTER_OPTION: FilterOption[] = [
  {
    id: 1,
    title: "Latest",
    value: "latest",
  },
  {
    id: 2,
    title: "Yesterday",
    value: "yesterday",
  },
  {
    id: 3,
    title: "Last Week",
    value: "last-week",
  },
];

const Todo = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);

  const [createModal, setCreateModal] = useState<boolean>(false);
  console.log("🚀 ~ Todo ~ todos:", todos);

  // Fetch data here
  const { data, isSuccess } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    retry: 4,
  });

  useEffect(() => {
    if (isSuccess) {
      setTodos(data);
    }
  }, [data]);

  const openCreateModal = () => {
    setCreateModal(true);
  };

  return (
    <div className="w-3/4 h-full p-4 bg-purple-light mt-2 ">
      {/* Ttitle */}
      <div className="text-center">
        <span className="text-base lg:text-4xl sm:text-xl md:text-2xl">
          Todo List
        </span>
      </div>

      {/* Filter bar */}

      <div className="mt-4 h-10 flex justify-between">
        {/* Add todo button */}
        <button
          className="bg-blue-600 grid place-items-center text-white pb-2"
          onClick={openCreateModal}
        >
          Add todo
        </button>

        {/* Filter button */}
        <div>
          <select name="filter" id="todo-filter" className="rounded-lg p-2">
            {TODO_FILTER_OPTION.map((option) => {
              return (
                <option value={option.value} key={option.id}>
                  {option.title}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Render todo list */}

      <div className="mt-5 bg-gray-500 w-full h-full rounded-lg p-4">
        {todos && <TodoList todos={todos} />}
        {!todos && <p>Nothing here</p>}
      </div>
      {createModal && <CreateModal onClose={() => setCreateModal(false)} />}
    </div>
  );
};

export default Todo;
