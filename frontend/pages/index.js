import styles from "../assets/styles/Home.module.css";
import React from "react";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import logo from "../assets/img/logo_dark.jpg";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>IVSM Bank</title>
      </Head>
      <div className={styles.container}>
        <img className="h-16 md:h-24" src={logo} alt="IVSM Bank" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome to the IVSM Bank!</h2>
        <p className="text-md mb-6">In order to continue, please log in!</p>
        <Link href="/login">
          <Button variant="contained" color="primary" size="medium">
            Login
          </Button>
        </Link>
      </div>
    </>
  );
}
