import { useEffect, useState } from "react";
import * as API from "../api";

export default function useRequests() {
  const [requests, setRequests] = useState();
  const [error, setError] = useState();

  const fetchRequests = async () => {
    const res = await API.getRequests();
    if (res.success) {
      setRequests(res.data);
    } else {
      setError(<p className="text-red-600">Failed to get requests because → {res.data}</p>);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return [requests, error, fetchRequests];
}
