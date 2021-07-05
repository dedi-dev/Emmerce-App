import Axios from "axios";
import { API_URL } from "../../constants/API";

export const registerUser = ({ fullname, username, email, password }) => {
  return (dispatch) => {
    Axios.post(`${API_URL}/users`, {
      fullname,
      username,
      email,
      password,
      role: "user",
    })
      .then((result) => {
        delete result.data.password;
        dispatch({
          type: "USER_LOGIN",
          payload: result.data,
        });
        alert("Berhasil mendaftarkan user!");
      })
      .catch(() => {
        alert("Gagal mendaftarkan user!");
      });
  };
};

export const loginUser = ({ username, password }) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/users`, {
      params: {
        username,
        password,
      },
    })
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        alert("Terjadi kesalahan di server");
      });
  };
};
