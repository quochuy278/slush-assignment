import { useNavigate } from "react-router-dom";
import useAuth from "../store/useAuth";

const Header = () => {
  const { user, clearUserInfor } = useAuth();
  const navigate = useNavigate();
  const onLogout = () => {
    clearUserInfor();
    navigate("/signin", { replace: true });
  };

  return (
    <div className="w-full h-20 bg-purple-light flex justify-end p-4">
      {user ? (
        <button onClick={onLogout}>
          <svg
            className="h-8 w-8 text-black"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />{" "}
            <path d="M7 12h14l-3 -3m0 6l3 -3" />
          </svg>
        </button>
      ) : (
        <div>
          <button>Login</button>
          <button>Signup</button>
        </div>
      )}
    </div>
  );
};

export default Header;
