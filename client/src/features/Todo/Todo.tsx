import React from "react";
import TodoList from "./TodoList";

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
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="hamster">Hamster</option>
            <option value="parrot">Parrot</option>
            <option value="spider">Spider</option>
            <option value="goldfish">Goldfish</option>
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
