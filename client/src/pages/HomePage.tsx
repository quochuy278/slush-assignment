import Todo from "../features/Todo/Todo";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-[86vh] w-screen">
      {" "}
      {/* Set min-height for viewport */}
      <div className="flex-grow bg-purple-light p-4 justify-center flex">
        {" "}
        {/* TodoList container */}
        <Todo />
      </div>
    </div>
  );
};

export default HomePage;
