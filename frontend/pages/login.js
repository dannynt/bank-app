import React from "react";
import { LoginForm } from "../components/LoginForm";
import MainContainer from "../components/MainContainer";
import styles from "../assets/styles/Home.module.css";
import logo from "../assets/img/logo_dark.jpg";
import Head from "next/head";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login - IVSM</title>
      </Head>
      <div className={styles.container}>
        <img className="h-16 md:h-24" src={logo} alt="IVSM Bank" />
        <LoginForm />
      </div>
    </>
  );
}
