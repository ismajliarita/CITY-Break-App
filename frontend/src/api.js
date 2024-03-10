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
  return sendRequest(`${BACKEND_URL}/items`, {
    method: "GET",
  }).then((response) => {
    console.log(response.items);
    return response.items;
  });
  // .then((response) => response.data);
}

export async function createItem(item) {
  return sendRequest(`${BACKEND_URL}/create-item`, {
    method: "POST",
    body: item,
  }).then((response) => response.data);
}

export async function getItem(itemId) {
  return sendRequest(`${BACKEND_URL}/items/:id`, {
    method: "GET",
  }).then((response) => response.data);
}