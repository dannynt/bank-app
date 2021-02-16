import React, { useContext } from "react";
import Nav from "./Nav";
import Head from "next/head";
import AuthContext from "../context/auth";

export default function MainContainer(props) {
  const { user } = useContext(AuthContext);
  if ((props.isPrivatePage && !user?.isLoggedIn) || (props.isAdminPage && user?.role !== "admin")) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex flex-col flex-grow pb-12">{props.children}</main>
    </div>
  );
}
