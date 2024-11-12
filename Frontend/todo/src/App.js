
import './App.css';
import React, { useEffect, useState } from "react"
import axios from "axios";
import ClockLoader from "react-spinners/ClockLoader";

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

  
    <div className="todo-container">
    <div>Rob & Beths Moving Todo!</div>
    { loading ? (<ClockLoader />) :
      todos ? (todos.map((item) => (
        <ul key={item.id}>
            <li>{item.title}</li>
          </ul>
      ) )) : message
    }
    </div>
  
  )
}

export default App;
