import { useEffect } from "react";
import SignInForm from "../features/SignIn/SignInForm";
import useAuth from "../store/useAuth";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  return (
    <div className="w-screen h-screen flex justify-center items-center p-4">
      <SignInForm />
    </div>
  );
};

export default SignInPage;
