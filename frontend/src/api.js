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

// This request will change to not change application JSON for body, but to use formdata
export async function createItem(e) {
  const formData = new FormData(e.target);

  return fetch(`${BACKEND_URL}/items/create-item`, {
    method: 'POST',
    body: formData,
  })
  .then(response => response.json())
  .then(response => response.data)
}

export async function updateItem(itemId, itemData) {
  return sendRequest(`${BACKEND_URL}/items/update-item/${itemId}`, {
    method: "PATCH",
    body: itemData,
  }).then((response) => response.data);
}

export async function deleteItem(itemId, userId) {
  return sendRequest(`${BACKEND_URL}/items/delete-item`, {
    method: "DELETE",
    body: {
      itemId,
      userId,
    },
  }).then((response) => response.data);
}

export async function getItemById(itemId) {
  return sendRequest(`${BACKEND_URL}/items/get-item/${itemId}`, {
    method: "GET",
  }).then((response) => response.data);
}

export async function subtractAmount(itemId){
  return sendRequest(`${BACKEND_URL}/items/subtract-amount/${itemId}`, {
    method: "PATCH",
  }).then((response) => response.data);
}

export async function removeItemAmounts(orderItemsIds){
  return sendRequest(`${BACKEND_URL}/items/remove-amounts`, {
    method: "PATCH",
    body: {
      orderItemsIds
    },
  }).then((response) => response.data);
}

//----------------- ORDERS -----------------//
export async function getFinishedOrders(id){
  return sendRequest(`${BACKEND_URL}/orders/get-finished-orders/${id}`, {
    method: "GET",
  }).then((response) => response.data);
}

export async function createOrderAsAdmin(orderItemsIds, totalCost, userId){
  return sendRequest(`${BACKEND_URL}/orders/create-order`, {
    method: "POST",
    body: {
      orderItemsIds, 
      totalCost,
      userId,
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

export async function getUser(id){
  return sendRequest(`${BACKEND_URL}/users/get-user/${id}`, {
    method: "GET",
  }).then((response) => response.data);
}


export async function loginUser(userData){
  return sendRequest(`${BACKEND_URL}/users/login`, {
    method: "POST",
    body: userData,
  }).then((response) => response.data);
}

