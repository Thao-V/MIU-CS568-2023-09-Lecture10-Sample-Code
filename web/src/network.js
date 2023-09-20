import axios from "axios";
axios.defaults.baseURL = "http://localhost:5001";

export async function login(user) {
  const url = "/login";
  try {
    const res = await axios.post(url, user);
    return res.data;
  } catch (error) {
    return null;
  }
}

export async function getEmployees(token) {
  const url = "/employees";
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    return null;
  }
}
