"use client";
import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const CreatePost = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const CREATE_POST = gql`
    mutation ($input: createPostInput!) {
      createPost(input: $input) {
        title
      }
    }
  `;

  const [newPost, { data, loading, error }] = useMutation(CREATE_POST);

  const handleClick = async (e) => {
    e.preventDefault();

    newPost({
      variables: {
        input: {
          title: values.title,
          content: values.description,
        },
      },
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Create New Post</h1>
      <form className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Title
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            id="name"
            name="title"
            placeholder="Enter your Title..."
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Description
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            id="email"
            name="description"
            placeholder="Enter your Description..."
            onChange={handleChange}
          />
        </div>
        <button
          className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          onClick={handleClick}
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
