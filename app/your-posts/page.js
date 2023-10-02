"use client";
import React from "react";
import { gql, useQuery } from "@apollo/client";
import Card from "@/components/Card";

const YourPosts = () => {
  const USER_POSTS = gql`
    query postsByUser {
      getPostsByUser {
        id
        title
        image
        content
      }
    }
  `;

  const { loading, error, data } = useQuery(USER_POSTS);

  return (
    <div className="flex flex-wrap justify-evenly items-center pt-10">
      {data?.getPostsByUser?.map((post) => {
        return (
          <div key={post.title}>
            <Card
              id={post.id}
              title={post.title}
              image={post.image}
              content={post.content}
              userPost={true}
            />
          </div>
        );
      })}
    </div>
  );
};

export default YourPosts;
