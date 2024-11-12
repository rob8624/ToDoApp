
import './App.css';
import React, { useEffect, useState } from "react"
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('');

  useEffect(() => {

    const apiURL = "https://todoapp-production-eed7.up.railway.app/api/todos/"

    axios.get(apiURL).then((response) => {
      setTodos(response.data)
      setLoading(false)
    })
    .catch((error) => {
      setMessage("error connecting")
      console.log("error fetching data", error)
    })
  }, [])

return (

  
    <div className="message">
    { loading ? (<p>loading</p>) :
      todos ? (todos.map((item) => (
        item.title
      ) )) : message
    }
    </div>
  
  )
}

export default App;
