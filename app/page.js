"use client";
import Card from "@/components/Card";
import { gql, useQuery } from "@apollo/client";

export default function Home() {
  const POSTS = gql`
    query getAllPosts {
      posts {
        title
        content
        createdAt
        authorId
        image
      }
    }
  `;
  const { loading, error, data } = useQuery(POSTS);

  return (
    <div className="flex flex-wrap justify-evenly items-center pt-10">
      {data?.posts?.map((post) => {
        return (
          <div key={post.title}>
            <Card
              id={post.id}
              title={post.title}
              image={post.image}
              content={post.content}
            />
          </div>
        );
      })}
    </div>
  );
}
