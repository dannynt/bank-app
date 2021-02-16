import { useEffect, useState } from "react";
import * as API from "../api";

export default function useTransactions() {
  const [transactions, setTransactions] = useState();
  const [error, setError] = useState();

  const fetchTransactions = async () => {
    const res = await API.getTransaction();
    if (res.success) {
      setTransactions(res.data);
    } else {
      setError(<p className="text-red-600">Failed to get transactions because → {res.data}</p>);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return [transactions, error, fetchTransactions];
}
