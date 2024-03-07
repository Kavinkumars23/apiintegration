import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
const Login = () => {

    const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.username.value;
    const password = event.target.password.value;
    axios
      .post(
        "https://ec52-2405-201-e059-b805-9b7-4be9-b7b7-280.ngrok-free.app/api/v1/login",
        { email, password }
      )
      .then((response) => {
        if(response.data.token){
    navigate(`/Home`);
        }
      });
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-slate-500">
      <div className="max-w-screen-lg p-10 mx-auto flex flex-col justify-center items-center w-auto h-auto bg-slate-100 rounded-lg shadow-lg">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <label htmlFor="username">UserName</label>
            <input
              id="username"
              name="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
            />
          </div>
          <button
            type="submit"
            className="bg-gray-700 text-white rounded-lg p-2 hover:scale-110 duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
