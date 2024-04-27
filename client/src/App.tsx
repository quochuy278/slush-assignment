import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Todo from "./features/Todo/Todo";

function App() {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      {" "}
      {/* Set min-height for viewport */}
      <Header />
      <div className="flex-grow bg-purple-light p-4 justify-center flex">
        {" "}
        {/* TodoList container */}
        <Todo />
      </div>
      <Footer />
    </div>
  );
}

export default App;
