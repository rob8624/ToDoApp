
import './App.css';
import React, { useEffect, useState } from "react"
import axios from "axios";
import Modal from "./components/modal.js"
import Todo from "./components/todo.js"
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
  console.log('Attempting to delete todo with id:', id);
  axios.delete(`${apiURL}${id}/`)
    .then(() => {
      console.log('Delete successful');
      setTodos(currentTodos => {
        const newTodos = currentTodos.filter(todo => todo.id !== id);
        console.log('New todos state:', newTodos);
        return newTodos;
      });
    })
    .catch((error) => {
      console.error("Error deleting todo", error);
      setMessage("Error deleting todo");
    });
};

const handleOpen = () => {
  setShowModal(true)
  console.log(showModal)
}



return (

  
    <div className="todo-container">
      <div className='title-flex'>
        <h1>Rob & Beths Moving Todo!</h1>
        <div className='priority-chart'>
            <div className='priority-low'>
              <div>Low</div>
              <div className='low-color'>BLUE</div>
            </div>
            <div className='priority-medium'>
              <div>Medium</div>
              <div className='medium-color'>GREEN</div>
            </div>
              <div className='priority-high'>
              <div>High</div>
            <div className='high-color'>PINK</div>
            </div>
        </div>
        <button className='add-btn' onClick={handleOpen}>Add Todo</button>
      </div>
    { loading ? (
      <div className='loader-flex'>
      <ClockLoader color="white" />
      </div>
    ) :
    ( <Todo todos={todos} deleteTodo={deleteTodo} />)
    }
    {showModal ? <Modal setShowModal={setShowModal} todos={todos} addTodo={addTodo}/>: <div></div>}
    </div>
  
  )
}

export default App;
