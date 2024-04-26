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

export async function getItems() {
  return sendRequest(`${BACKEND_URL}/items/get-items`, {
    method: "GET",
  }).then((response) => response.data);
}

// This request will change to not change application JSON for body, but to use formdata
export async function createItem(e) {
  // Get the form data
  const formData = new FormData(e.target);

  // Send the form data to the server
  return fetch(`${BACKEND_URL}/items/create-item`, {
    method: 'POST',
    body: formData,
  })
  .then(response => response.json())
  .then(response => response.data)
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

// export async function addItemToOrder(itemId){
//   return sendRequest(`${BACKEND_URL}/orders/add-item/${itemId}`, {
//     method: "POST",
//   }).then((response) => response.data);
// }

export async function getOrders(){
  return sendRequest(`${BACKEND_URL}/orders/get-orders`, {
    method: "GET",
  }).then((response) => response.data);
}

export async function createOrder(orderItemsIds, totalCost){
  return sendRequest(`${BACKEND_URL}/orders/create-order`, {
    method: "POST",
    body: {
      orderItemsIds, 
      totalCost
    },
  }).then((response) => response.data);
}