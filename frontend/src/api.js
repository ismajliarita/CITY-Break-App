import Auth from "./pages/Auth";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8081/api";

function transformToJsonOrTextPromise(response) {
  const contentLength = response.headers.get("Content-Length");
  const contentType = response.headers.get("Content-Type");
  if (
    contentLength !== "0" &&
    contentType &&
    contentType.includes("application/json")
  ) {
    return response.json();
  } else {
    return response.text();
  }
}

async function sendRequest(url, { method = "GET", body, headers = {} }) {
  const options = {
    method,
    headers: new Headers({ "content-type": "application/json", ...headers }),
    body: body ? JSON.stringify(body) : null,
  };

  return fetch(url, options).then((res) => {
    const jsonOrTextPromise = transformToJsonOrTextPromise(res);

    if (res.ok) {
      return jsonOrTextPromise;
    } else {
      return jsonOrTextPromise.then(function (response) {
        const responseObject = {
          status: res.status,
          ok: false,
          message: typeof response === "string" ? response : response.message,
        };

        return Promise.reject(responseObject);
      });
    }
  });
}


//----------------- ITEMS -----------------//
export async function getItems() {
  return sendRequest(`${BACKEND_URL}/items/get-items`, {
    method: "GET",
  }).then((response) => response.data);
}

export async function createItem(token, e) {
  const formData = new FormData(e.target);

  return fetch(`${BACKEND_URL}/items/create-item`, {
    method: 'POST',
    headers: {
      Authorization: "JWT " + token,
    },
    body: formData,
  })
  .then(response => response.json())
  .then(response => response.data)
}

export async function updateItem(token, itemId, itemData) {
  return sendRequest(`${BACKEND_URL}/items/update-item/${itemId}`, {
    method: "PATCH",
    headers: {
      Authorization: "JWT " + token,
    },
    body: itemData,
  }).then((response) => response.data);
}

export async function deleteItem(token, itemId) {
  return sendRequest(`${BACKEND_URL}/items/delete-item`, {
    method: "DELETE",
    headers: {
      Authorization: "JWT " + token,
    },
    body: {
      itemId,
    },
  }).then((response) => response.data);
}

export async function getItemById(token, itemId) {
  return sendRequest(`${BACKEND_URL}/items/get-item/${itemId}`, {
    method: "GET",
    headers: {
      Authorization: "JWT " + token,
    },
  }).then((response) => response.data);
}

export async function subtractAmount(token, itemId){
  return sendRequest(`${BACKEND_URL}/items/subtract-amount/${itemId}`, {
    method: "PATCH",
    headers: {
      Authorization: "JWT " + token,
    },
  }).then((response) => response.data);
}

export async function removeItemAmounts(token, orderItemsIds){
  return sendRequest(`${BACKEND_URL}/items/remove-amounts`, {
    method: "PATCH",
    headers: {
      Authorization: "JWT " + token,
    },
    body: {
      orderItemsIds
    },
  }).then((response) => response.data);
}

//----------------- ORDERS -----------------//
export async function getFinishedOrders(token, id){
  return sendRequest(`${BACKEND_URL}/orders/get-finished-orders/${id}`, {
    headers: {
      Authorization: "JWT " + token,
    },
    method: "GET",
  }).then((response) => response.data);
}

export async function createOrderAsAdmin(token, orderItems, totalCost){
  return sendRequest(`${BACKEND_URL}/orders/create-order-as-admin`, {
    method: "POST",
    headers: {
      Authorization: "JWT " + token
    },
    body: {
      orderItems,
      totalCost,
    },
  }).then((response) => response.data);
}

export async function createOrder(token, orderItems, totalCost){
  return sendRequest(`${BACKEND_URL}/orders/create-order`, {
    method: "POST",
    headers: {
      Authorization: "JWT " + token
    },
    body: {
      orderItems,
      totalCost,
    },
  }).then((response) => response.data);
}

export async function getOrders(token, id){
  return sendRequest(`${BACKEND_URL}/orders/get-orders/${id}`, {
    method: "GET",
    headers: {
      Authorization: "JWT " + token,
    },
  }).then((response) => response.data);
}


//----------------- USERS -----------------//
export async function createUser(userData){
  return sendRequest(`${BACKEND_URL}/users/signup`, {
    method: "POST",
    body: userData,
  }).then((response) => response.data);
}

export async function getUser(token, id){
  return sendRequest(`${BACKEND_URL}/users/get-user/${id}`, {
    method: "GET",
    headers: {
      Authorization: "JWT " + token,
    },
  }).then((response) => response.data);
}

export async function loginUser(userData){
  return sendRequest(`${BACKEND_URL}/users/login`, {
    method: "POST",
    body: userData,
  }).then((response) => response.data);
}

export async function getAllUsers(token){
  return sendRequest(`${BACKEND_URL}/users/get-all-users`, {
    method: "GET",
    headers: {
      Authorization: "JWT " + token,
    },
  }).then((response) => response.data);
}

export async function deleteUser(token, userId){
  return sendRequest(`${BACKEND_URL}/users/delete-user/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: "JWT " + token,
    },
  }).then((response) => response.data);
}