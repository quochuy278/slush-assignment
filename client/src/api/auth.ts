import axios from "axios";

const baseURL = import.meta.env.VITE_APP_API_URL;

const signIn = async (data: { email: string; password: string }) => {
  try {
    const result = await axios.post(`${baseURL}/signIn`, data);

    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export { signIn };
