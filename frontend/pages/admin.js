import { useRef, useState, useEffect } from "react";
import * as API from "../api";
import useTransactions from "../hooks/useTransactions";
import Head from "next/head";
import { formatDate } from "../utils";

export default function AdminsPage() {
  const [transactions, getTransactionsError, refetchTransactions] = useTransactions();
  const [createTransactionResult, setCreateTransactionResult] = useState();
  const [cancelTransactionResult, setCancelTransactionResult] = useState();
  const [createUserResult, setCreateUserResult] = useState();
  const [history, setHistory] = useState();
  const transactionForm = useRef();
  const createUserForm = useRef();

  const onSubmitCreateTransaction = async (event) => {
    event.preventDefault();
    const formData = new FormData(transactionForm.current);
    const transaction = {
      from: formData.get("from").toString(),
      to: formData.get("to").toString(),
      amount: formData.get("amount").toString(),
      description: formData.get("description"),
    };

    const res = await API.createTransaction(transaction);

    if (res.success) {
      setCreateTransactionResult(<p className="text-green-600">Money successfully sent yay! 🤑</p>);
      transactionForm.current.reset();
      refetchTransactions();
    } else {
      setCreateTransactionResult(<p className="text-red-600">Failed to send money because → {res.data}</p>);
    }
  };

  const onSubmitCreateUser = async (event) => {
    event.preventDefault();
    const formData = new FormData(createUserForm.current);
    const user = {
      first_name: formData.get("first-name").toString(),
      last_name: formData.get("last-name").toString(),
      username: formData.get("username").toString(),
      password: formData.get("password").toString(),
      role: formData.get("role").toString(),
    };

    const res = await API.createUser(user);

    if (res.success) {
      setCreateUserResult(<p className="text-green-600">User successfully created yay! 🙆‍♂️</p>);
      createUserForm.current.reset();
    } else {
      setCreateUserResult(<p className="text-red-600">Failed to create user because → {JSON.stringify(res.data)}</p>);
    }
  };

  const onCancelTransaction = async (transaction) => {
    const res = await API.cancelTransaction(transaction);
    console.log({ res });
    if (res.success) {
      setCancelTransactionResult(<p className="text-green-600">Transaction successfully cancelled!</p>);
      refetchTransactions();
      fetchHistory();
    } else {
      setCancelTransactionResult(
        <p className="text-red-600">Failed to cancel transaction because → {JSON.stringify(res.data)}</p>
      );
    }
  };

  const fetchHistory = async () => {
    const { data } = await API.getHistory();
    setHistory(data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <>
      <Head>
        <title>IVSM - Admin</title>
      </Head>
      <div className="mx-auto px-4">
        <div className="card">
        <h4 className="text-2xl">Create transaction</h4>
        <form onSubmit={onSubmitCreateTransaction} ref={transactionForm}>
          <input className="input" placeholder="Amount" name="amount" required />
          <input className="input" placeholder="From" name="from" />
          <input className="input" placeholder="To" name="to" required />
          <input className="input" placeholder="Description" name="description" required />
          <button className="bg-green-600 text-white px-4 py-1 rounded mt-2">Create transaction</button>
          {createTransactionResult}
        </form>
        </div>

        <div className="card">
        <h4 className="text-2xl">Create user</h4>
        <form onSubmit={onSubmitCreateUser} ref={createUserForm}>
          <input className="input" placeholder="First name" name="first-name" required />
          <input className="input" placeholder="Last name" name="last-name" required />
          <input className="input" placeholder="Username" name="username" required />
          <input className="input" placeholder="Password" name="password" type="password" required />
          <select className="input" placeholder="role" name="role">
            <option value="user">Customer</option>
            <option value="admin">Admin</option>
          </select>
          <button className="bg-green-600 text-white shadow px-4 py-1 rounded">Create user</button>
          {createUserResult}
        </form>
        </div>

        <div className="card">
        <h4 className="text-2xl">All bank transactions</h4>
        {cancelTransactionResult}
        <ul>
          {getTransactionsError}
          {transactions?.length == 0 && <p>No transactions found</p>}
          {transactions?.map((transaction, index) => {
            const { bto_username, bfrom_username, trans_amount, trans_description, trans_createdAt } = transaction;
            return (
              <li key={index} className="bg-white px-4 py-2 shadow rounded mb-3 sm:mb-2">
                <p className="mr-2 sm:inline"><span className="font-medium">From:</span> {bfrom_username}</p>
                <p className="mr-2 sm:inline"><span className="font-medium">To:</span> {bto_username}</p>
                <p className="mr-2 sm:inline"><span className="font-medium">Amount:</span> {trans_amount}</p>
                <p className="mr-2 sm:inline"><span className="font-medium">Description:</span> {trans_description}</p>
                <p className="mr-2 sm:inline"><span className="font-medium">Created at:</span> {formatDate(trans_createdAt)}</p>
                <button
                  onClick={() => onCancelTransaction(transaction)}
                  className="bg-red-600 rounded text-white px-2 mt-1"
                >
                  Cancel
                </button>
              </li>
            );
          })}
        </ul>
        </div>

        <div className="card">
          <h4 className="text-2xl">Modification history</h4>
          <ul>
            {getTransactionsError}
            {history?.map(({
                history_transid,
                history_amount,
                history_description,
                history_modifiedAt,
                history_modification,
              }, i) => {
              return (
                <li key={i} className="bg-white px-4 py-2 shadow rounded mb-3 sm:mb-2">
                  <p className="mr-2 sm:inline">
                    <span className="font-medium">TransactionID:</span> {history_transid}
                  </p>
                  <p className="mr-2 sm:inline">
                    <span className="font-medium">Amount:</span> {history_amount}
                  </p>
                  <p className="mr-2 sm:inline">
                    <span className="font-medium">Description:</span> {history_description}
                  </p>
                  <p className="mr-2 sm:inline">
                    <span className="font-medium">Modified at:</span> {formatDate(history_modifiedAt)}
                  </p>
                  <p className="mr-2 sm:inline">
                    <span className="font-medium">Modification: </span>
                    <span className="text-red-500">{history_modification}</span>
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
