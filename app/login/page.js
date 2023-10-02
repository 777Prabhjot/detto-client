"use client";
import Link from "next/link";
import { useMutation, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import Toast from "@/components/Toast";

const useLogin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [Error, setError] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { value, name } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const LOGIN = gql`
    mutation ($loginUser: loginUser!) {
      loginUser(loginUser: $loginUser) {
        name
        email
        token
      }
    }
  `;

  const [loginUser, { data, loading, error }] = useMutation(LOGIN);

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser({
      variables: {
        loginUser: {
          email: values.email,
          password: values.password,
        },
      },
    });
  };

  useEffect(() => {
    if (data && !error) {
      setSuccess("User Logged In Successfully");
      localStorage.setItem("token", data?.loginUser.token);
      localStorage.setItem("name", data?.loginUser.name);
      setTimeout(() => {
        setSuccess("");
        window.location.href = "/";
      }, 2000);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  }, [data, error]);

  return (
    <div className="container mx-auto py-8 relative">
      {Error && <Toast msg={error?.graphQLErrors[0]?.message} />}
      {success && <Toast msg={success} color="#46dd0f" />}
      <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>
      <form className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your Email..."
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="password"
            id="password"
            name="password"
            placeholder="********"
            onChange={handleChange}
          />
        </div>
        <button
          className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          type="submit"
          onClick={handleSubmit}
        >
          Log In
        </button>
      </form>
      <div className="w-full flex justify-center mt-8">
        <Link className="text-blue-400" href={"/signup"}>
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default useLogin;
