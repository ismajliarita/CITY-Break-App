// const BACKEND_URL = "http://localhost:3303/api";

// returns a Promise
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

async function getUsers() {
    return sendRequest('/users');
}

async function createUser(user) {
    return sendRequest('/users', { method: 'POST', body: user });
}

async function getItems() {
    return sendRequest('/items');
}

export {
  getItems,
}