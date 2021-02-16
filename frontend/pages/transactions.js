import React, { useContext, useRef, useState } from "react";
import Modal from 'react-modal';
import PlayGround from "../components/Memory/PlayGround";
import AuthContext from "../context/auth";
import * as API from "../api";
import useRequests from "../hooks/useRequests";
import {formatDate} from "../utils";

export default function TransactionsPage() {
  const [requests, error, refetchRequests] = useRequests();
  const { user } = useContext(AuthContext);
  const [transactionResult, setTransactionResult] = useState();
  const [requestResult, setRequestResult] = useState();
  const [fulfillResult, setFulfillResult] = useState();
  const transactionForm = useRef();
  const requestForm = useRef();

  const [modalIsOpen,setIsOpen] = React.useState(false);

  const openModal = (event) => {
    event.preventDefault();
    setIsOpen(true);
  }

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const onSubmitCreateTransaction = async () => {
    closeModal();
    const formData = new FormData(transactionForm.current);
    const transaction = {
      from: user.username,
      to: formData.get("to").toString(),
      amount: formData.get("amount").toString(),
      description: formData.get("description"),
    };

    const res = await API.createTransaction(transaction);

    if (res.success) {
      setTransactionResult(<p className="text-green-600">Money successfully sent yay! 🤑</p>);
      // and refetch transactions here
    } else {
      setTransactionResult(<p className="text-red-600">Failed to send money because → {JSON.stringify(res.data)}</p>);
    }
  };

  const onSubmitCreateRequest = async (event) => {
    event.preventDefault();
    const formData = new FormData(requestForm.current);
    const request = {
      from: formData.get("to").toString(),
      amount: formData.get("amount").toString(),
      description: formData.get("description"),
    };

    const res = await API.createRequest(request);

    if (res.success) {
      setRequestResult(<p className="text-green-600">Request successfully sent yay! 🤑</p>);
      requestForm.current.reset();
      refetchRequests();
    } else {
      setRequestResult(<p className="text-red-600">Failed to send request because → {JSON.stringify(res.data)}</p>);
    }
  };

  const onFulfillRequest = async (id) => {
    const res = await API.fulfillRequest(id);
    console.log({ res });
    if (res.success) {
      setFulfillResult(<p className="text-green-600">Request fulfilled!</p>);
      refetchRequests();
    } else {
      setFulfillResult(
          <p className="text-red-600">Failed to fulfill the request because → {JSON.stringify(res.data)}</p>
      );
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="card">
        <h4 className="text-2xl">Send money</h4>
        <form className="mt-2" onSubmit={openModal} ref={transactionForm}>
          <input className="input" placeholder="Amount" name="amount" required />
          <input className="input" placeholder="To" name="to" required />
          <input className="input" placeholder="Description" name="description" required />
          <button className="bg-green-600 py-1 rounded text-white px-4 mt-2">Send money</button>
          {transactionResult}
        </form>
      </div>

      <div className="card">
        <h4 className="text-2xl">Request money</h4>
        <form className="mt-2" onSubmit={onSubmitCreateRequest} ref={requestForm}>
          <input className="input" placeholder="Amount" name="amount" required />
          <input className="input" placeholder="To" name="to" required />
          <input className="input" placeholder="Description" name="description" required />
          <button className="bg-green-600 py-1 rounded text-white px-4 mt-2">Request money</button>
          {requestResult}
        </form>
      </div>

      <div className="card">
        <h2 className="text-2xl">Current requests</h2>
        {fulfillResult}
        <ul>
          {requests?.map(
              ({request_id, bfrom_username, bto_username, request_amount, request_description, request_createdAt}, index) => {
                const isIncoming = bfrom_username === user.username;
                return (
                    <li key={index} className={(isIncoming ? "bg-red-700" : "bg-green-700") + " bg-opacity-10 px-4 py-2 shadow rounded mb-3 sm:mb-2"}>
                      <p className="mr-2 sm:inline"><span className="font-bold">{isIncoming ? "Incoming" : "Outgoing"}</span></p>
                      {isIncoming ?
                          <p className="mr-2 sm:inline"><span className="font-medium">From:</span> {bto_username}</p>
                          :
                          <p className="mr-2 sm:inline"><span className="font-medium">To:</span> {bfrom_username}</p>
                      }
                      <p className="mr-2 sm:inline"><span className="font-medium">Amount:</span> {request_amount} €</p>
                      <p className="mr-2 sm:inline"><span className="font-medium">Description:</span> {request_description}</p>
                      <p className="mr-2 sm:inline"><span className="font-medium">Created at:</span> {formatDate(request_createdAt)}</p>
                      {isIncoming &&
                        <button
                            onClick={() => onFulfillRequest(request_id)}
                            className="bg-red-600 rounded text-white px-2 mt-1"
                        >
                          Fulfill
                        </button>
                      }
                    </li>
                );
              }
          )}
        </ul>
        {error}
      </div>

      <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Puzzle Modal"
      >
        <p className="text-xl mb-3 ml-2">In order to confirm your transaction, please complete this little puzzle</p>
        <PlayGround onFinish={onSubmitCreateTransaction}/>
      </Modal>
    </div>
  );
}
