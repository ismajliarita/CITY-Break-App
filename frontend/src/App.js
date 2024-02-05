import React, { useEffect, useState } from 'react';
import ItemCard from './components/ItemCard';

export default function App() {

  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:8081/api")
    .catch(error => console.error('Fetch error:', error))
    .then((response) => {
      console.log("response.status =", response.status); // response.status = 200
      return response.blob();
    })
    .then(response => {
        console.log(response);
        return response.json()
      }
    ).then((data) => {
      setBackendData(data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <div>
      {(typeof backendData.items === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        backendData.items.map((item, i) => (
          <p key={i}>{item}</p>
        ))
      )}

      <ItemCard />
    </div>
  );
}


