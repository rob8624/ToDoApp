
import './App.css';
import React, { useEffect, useState } from "react"
import axios from "axios";

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {

    const apiURL = "https://todoapp-production-eed7.up.railway.app/api/test/"

    axios.get(apiURL).then((response) => {
      setMessage(response.data.message)
    })
    .catch((error) => {
      setMessage("error connecting")
      console.log("error fetching data", error)
    })
  }, [])

return (
    <div className="message">{message}</div>
  )
}

export default App;
