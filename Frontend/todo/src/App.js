
import './App.css';
import React, { useEffect, useState } from "react"
import axios from "axios";
import Modal from "./components/modal.js"
import ClockLoader from "react-spinners/ClockLoader";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false)

  
 
  useEffect(() => {

    const apiURL = "https://todoapp-production-eed7.up.railway.app/api/todos/"
    const cachedTodos = localStorage.getItem(todos)

    if(cachedTodos) {
      setTodos(JSON.parse(cachedTodos))
      setLoading(false)
    } else {
    axios.get(apiURL).then((response) => {
      setTodos(response.data)
      setLoading(false)
      
      console.log('response data', response.data)
      localStorage.setItem('todos', JSON.stringify(response.data))
    })
    .catch((error) => {
      setMessage("error connecting")
      console.log("error fetching data", error, message)
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

const addTodo = (newToDo) => {
  const apiURL =  "https://todoapp-production-eed7.up.railway.app/api/todos/"

  axios.post(apiURL, newToDo).then((response) => {
    setTodos((prevstate) => [...prevstate, response.data])
    setShowModal(false)
  }).catch((error) => {
    console.error("Error adding todo", error);
    setMessage("Error adding todo");
  });
}


const deleteTodo = (id) => {
  const apiURL =  "https://todoapp-production-eed7.up.railway.app/api/todos/"
  
  axios.delete(`${apiURL}${id}`)
  .then(() => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todo))
    localStorage.setItem('todos', JSON.stringify(todos.filter(todo => todo.id !== id)));
  })
  .catch((error) => {
    console.error("Error deleting todo", error);
    setMessage("Error deleting todo");
  })
}

const handleOpen = () => {
  setShowModal(true)
  console.log(showModal)
}



return (

  
    <div className="todo-container">
      <div className='title-flex'>
        <h1>Rob & Beths Moving Todo!</h1>
        <button className='add-btn' onClick={handleOpen}>Add Todo</button>
      </div>
    { loading ? (
      <div className='loader-flex'>
      <ClockLoader color="white" />
      </div>
    ) :
    (<div className='todo-flex'>
      todos ? { todos.map((item) => (
        <div className="todo" key={item.id}>
          <div className='todo-title'>{item.title}</div>
          <div className='todo-description'>
                {item.description}
          </div>
            <button onClick={() => deleteTodo(item.id)}>Delete</button>
        </div>
      ) )} : message
    </div> )
    }
    {showModal ? <Modal setShowModal={setShowModal} todos={todos} addTodo={addTodo}/>: <div></div>}
    </div>
  
  )
}

export default App;
