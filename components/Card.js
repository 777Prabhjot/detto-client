import { useMutation, useApolloClient, gql } from "@apollo/client";
import React from "react";

const Card = ({ id, title, image, content, userPost }) => {
  const client = useApolloClient();

  const DELETE_POST = gql`
    mutation ($deletePostByUserId: Int!) {
      deletePostByUser(id: $deletePostByUserId) {
        id
      }
    }
  `;

  const [deletePost, { error }] = useMutation(DELETE_POST);

  const handleDelete = () => {
    deletePost({
      variables: {
        deletePostByUserId: id,
      },
    })
      .then(() => {
        client.resetStore();
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  return (
    <div className="w-full gap-2 grid  grid-cols-3 ">
      <div />
      <div
        key="{content}"
        className="group relative rounded-lg overflow-hidden bg-white  hover:shadow-2xl shadow-md"
      >
        <div className="h-40">
          <img
            src={`${image}`}
            alt="City"
            className="h-40 w-full object-cover object-center "
          />
        </div>
        <div className="h-1/2 p-4 ">
          <h3 className="mb-2 text-base font-semibold text-blue-800">
            <a href="" className="hover:underline">
              {title}
            </a>
          </h3>
          <div className="flex justify-between">
            <p className="text-sm font-bold text-orange-500">{content}</p>
            {userPost && (
              <p
                className="font-bold cursor-pointer text-red-500 bg-red-100 px-1 rounded-sm"
                onClick={handleDelete}
              >
                X
              </p>
            )}
          </div>
        </div>
      </div>
      <div />
    </div>
  );
};

export default Card;
