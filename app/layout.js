"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const client = new ApolloClient({
  uri: "http://localhost:5000/",
  cache: new InMemoryCache(),
});

export default function RootLayout({ children }) {
  return (
    <ApolloProvider client={client}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ApolloProvider>
  );
}
