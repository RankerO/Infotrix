import React, { useEffect, useState } from 'react'
import axios from "axios";
function ListOfOperation() {
  const [operation, setOperation] = useState([]);
  useEffect(async () => {
    try {
      const response = await axios.get('http://localhost:5000');
      setOperation(response.data);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  }, [])
  return (
    <div>
      <div>
        <h1>Fetched Operation</h1>
        <ul>
          {operation.map((item, index) => (
            <li key={index}>
              <h2>
                {item.operation}
              </h2>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ListOfOperation
