import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const googleLoginAPI = async (jwtToken) => {
  try {
    const { data } = await axios.post("/api/user/googlesignin", { jwtToken });
    return data;
  } catch (error) {
    console.error("Error logging in using google : ", error);
  }
};
