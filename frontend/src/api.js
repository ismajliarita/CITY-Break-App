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
    headers: new Headers({ ...headers }),
    body: body instanceof FormData ? body : JSON.stringify(body),
  };

  if (!(body instanceof FormData)) {
    options.headers.set('Content-Type', 'application/json');
  }

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
  

  
  for (var pair of formData.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
  }


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
  const formData = new FormData();

  for (const key in itemData) {
    formData.append(key, itemData[key]);
  }

  for (var pair of formData.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
  }

  return sendRequest(`${BACKEND_URL}/items/update-item/${itemId}`, {
    method: "PATCH",
    headers: {
      Authorization: "JWT " + token,
    },
    body: formData,
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

export async function createOrder(token, orderItems, totalCost, scheduleDate){
  return sendRequest(`${BACKEND_URL}/orders/create-order`, {
    method: "POST",
    headers: {
      Authorization: "JWT " + token
    },
    body: {
      orderItems,
      totalCost,
      scheduleDate,
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

export async function getIncomingOrders(token){
  return sendRequest(`${BACKEND_URL}/orders/get-incoming-orders`, {
    method: "GET",
    headers: {
      Authorization: "JWT " + token,
    },
  }).then((response) => response.data);
}

export async function getOrderItems(token, orderId){
  return sendRequest(`${BACKEND_URL}/orders/get-order-items/${orderId}`, {
    method: "GET",
    headers: {
      Authorization: "JWT " + token,
    },
  }).then((response) => response.data);
} 

export async function setIsFinishedTrue(token, orderId){
  return sendRequest(`${BACKEND_URL}/orders/set-is-finished-true/${orderId}`, {
    method: "PATCH",
    headers: {
      Authorization: "JWT " + token,
    },
  }).then((response) => response.data);
}

export async function setIsTakenTrue(token, orderId){
  return sendRequest(`${BACKEND_URL}/orders/set-is-taken-true/${orderId}`, {
    method: "PATCH",
    headers: {
      Authorization: "JWT " + token,
    },
  }).then((response) => response.data);
}

//----------------- USERS -----------------//
export async function verifyEmail(verificationCode){
  return sendRequest(`${BACKEND_URL}/users/verify-email`, {
    method: "POST",
    body: {
      verificationCode,
    },
  }).then((response) => response.data);
}

export async function createUser(email, username, password){
  return sendRequest(`${BACKEND_URL}/users/signup`, {
    method: "POST",
    body: {
      email,
      username,
      password,
    },
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

export async function changeUsername(token, userId, newUsername){
  return sendRequest(`${BACKEND_URL}/users/change-username/${userId}`, {
    method: "PATCH",
    headers: {
      Authorization: "JWT " + token,
    },
    body: {
      newUsername,
    },
  }).then((response) => response.data);
}

export async function changePassword(token, userId, {oldPassword, newPassword, confirmPassword}){
  if(newPassword !== confirmPassword){
    return Promise.reject({ message: "Passwords do not match" });
  }
  return sendRequest(`${BACKEND_URL}/users/change-password/${userId}`, {
    method: "PATCH",
    headers: {
      Authorization: "JWT " + token,
    },
    body: {
      oldPassword,
      newPassword,
    },
  }).then((response) => response.data);
}