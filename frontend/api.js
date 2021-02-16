async function parse(res) {
  const text = await res.text(); // Parse it as text
  try {
    return JSON.parse(text); // Try to parse it as json
  } catch (err) {
    // This means response is text
    return text;
  }
}

async function fetchJSON(url, options) {
  const res = await fetch(url, {
    ...options,
  });

  return {
    success: res.ok,
    data: await parse(res),
  };
}

export function login(username, password) {
  return fetchJSON(`${process.env.API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      username,
      password,
    }),
  });
}

export function validateLogin() {
  return fetchJSON(`${process.env.API_URL}/validate-login`, {
    credentials: "include",
  });
}

export function logout() {
  return fetchJSON(`${process.env.API_URL}/logout`, { method: "POST" });
}

export function createTransaction({ from, to, amount, description, id }) {
  return fetchJSON(`${process.env.API_URL}/transaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      from,
      to,
      amount,
      description,
      id,
    }),
  });
}

export function cancelTransaction({ bto_username, bfrom_username, trans_amount, trans_description, trans_id }) {
  return fetchJSON(`${process.env.API_URL}/transaction`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      from: bto_username,
      to: bfrom_username,
      amount: trans_amount,
      description: trans_description,
      id: trans_id,
    }),
  });
}

export function getTransaction() {
  return fetchJSON(`${process.env.API_URL}/transaction`, {
    credentials: "include",
  });
}

export function viewFunds() {}
export function changeTransaction() {}

export function createUser({ first_name, last_name, username, password, role }) {
  return fetchJSON(`${process.env.API_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      first_name,
      last_name,
      username,
      password,
      role,
    }),
  });
}

export function createRequest({ from, to, amount, description, id }) {
  return fetchJSON(`${process.env.API_URL}/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      from,
      amount,
      description,
      id,
    }),
  });
}

export function getRequests() {
  return fetchJSON(`${process.env.API_URL}/request`, {
    credentials: "include",
  });
}

export function fulfillRequest(reqid) {
  return fetchJSON(`${process.env.API_URL}/request`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      reqid,
    }),
  });
}

export function getHistory() {
  return fetchJSON(`${process.env.API_URL}/history`, {
    credentials: "include",
  });
}
