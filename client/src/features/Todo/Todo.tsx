import React from "react";
import TodoList from "./TodoList";

type FilterOption = {
  id: number;
  title: string;
  value: string;
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
  // Fetch data here

  return (
    <div className="w-1/2 h-full p-4 bg-purple-light mt-2 ">
      {/* Ttitle */}
      <div className="text-center">
        <span className="text-base lg:text-4xl sm:text-xl md:text-2xl">
          Todo List
        </span>
      </div>

      {/* Filter bar */}

      <div className="mt-4 h-10 flex justify-between">
        {/* Add todo button */}
        <button className="bg-blue-600 grid place-items-center">
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

      <div className="mt-5">
        <TodoList />
      </div>
    </div>
  );
};

export default Todo;
