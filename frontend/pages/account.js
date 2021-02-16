import React, {useContext, useEffect, useRef, useState} from "react";
import Head from "next/head";
import {AccountHeader} from "../components/AccountHeader";
import {AccountContent} from "../components/AccountContent";
import {TransactionHistory} from "../components/TransactionHistory";
import styles from "../assets/styles/Account.module.css";
import MainContainer from "../components/MainContainer";
import AuthContext from "../context/auth";
import * as API from "../api";
import useTransactions from "../hooks/useTransactions";
import {formatDate} from "../utils";

export default function Account() {
  const {user} = useContext(AuthContext);
  const [transactions, error] = useTransactions();
  const outgoing = transactions?.["sent by user"];
  const incoming = transactions?.["sent to user"];

  return (
      <>
        <Head>
          <title>IVSM Bank - Account</title>
        </Head>
        <div className="container mx-auto px-4 space-y-2">

          <div className="card">
            <h1 className="text-2xl">Account info</h1>
            <ul>
              <li>
                <span className="font-bold">Name:</span> {user.first_name} {user.last_name}
              </li>
              <li><span className="font-bold">Username:</span> {user.username}</li>
              <li><span className="font-bold">Balance:</span> {user.funds} €</li>
            </ul>
          </div>

          <div className="card">
            <h2 className="text-2xl">Transactions history</h2>
            <ul>
              {transactions?.map(
                  ({bfrom_username, bto_username, trans_amount, trans_description, trans_createdAt}, index) => {
                    const isOutgoing = bfrom_username === user.username;
                    return (
                        <li key={index} className={(isOutgoing ? "bg-red-700" : "bg-green-700") + " bg-opacity-10 px-4 py-2 shadow rounded mb-3 sm:mb-2"}>
                          {isOutgoing ?
                              <p className="mr-2 sm:inline"><span className="font-medium">To:</span> {bto_username}</p>
                              :
                              <p className="mr-2 sm:inline"><span className="font-medium">From:</span> {bfrom_username}</p>
                          }
                          <p className="mr-2 sm:inline"><span className="font-medium">Amount:</span> {isOutgoing ? "-" : "+"}{trans_amount} €</p>
                          <p className="mr-2 sm:inline"><span className="font-medium">Description:</span> {trans_description}</p>
                          <p className="mr-2 sm:inline"><span className="font-medium">Created at:</span> {formatDate(trans_createdAt)}</p>
                        </li>
                    );
                  }
              )}
            </ul>
            {error}
            {/* <div className={styles.container}> */}
            {/* <AccountHeader /> */}
            {/* </div> */}
          </div>
        </div>
      </>
  );
}
