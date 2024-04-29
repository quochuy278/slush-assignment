import axios from "axios";
import useAuth from "../store/useAuth";
import { Todo } from "../features/Todo/Todo";

const baseURL = import.meta.env.VITE_APP_API_URL;

const fetchTodos = async () => {
  const accessToken = useAuth.getState().user?.accessToken;
  try {
    const result = await axios.get(`${baseURL}/todos`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const createTodo = async (data: {
  name: string;
  description: string;
  ready: boolean;
}) => {
  const accessToken = useAuth.getState().user?.accessToken;
  try {
    const result = await axios.post(`${baseURL}/todo`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const updateTodo = async (data: Todo) => {
  const accessToken = useAuth.getState().user?.accessToken;
  try {
    const result = await axios.patch(`${baseURL}/todo/${data.id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteTodo = async (data: Todo) => {
  const accessToken = useAuth.getState().user?.accessToken;
  try {
    const result = await axios.delete(`${baseURL}/todo/${data.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export { fetchTodos, createTodo, updateTodo, deleteTodo };
