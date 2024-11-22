
import './App.css';
import React, { useEffect, useState } from "react"
import axios from "axios";
import Modal from "./components/modal.js"
import Todo from "./components/todo.js"
import FilterSelect from "./components/filterSelect.js"
import ClockLoader from "react-spinners/ClockLoader";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [currentTodo, setCurrentTodo] = useState(null)

  
 
  const fetchTodos = () => {
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
  }
  
useEffect(() => {
    fetchTodos()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

const addTodo = (newToDo) => {
  const apiURL =  "https://todoapp-production-eed7.up.railway.app/api/todos/"

  if (editing) {
    console.log(newToDo)
    axios.put(`${apiURL}${newToDo.id}/`, newToDo).then((response) => {
     setTodos((prevstate) => {
     setShowModal(false)
     setEditing(null) 
    return prevstate.map((todo) => todo.id === newToDo.id ? response.data : todo )
     })
    })
  } else {

  axios.post(apiURL, newToDo).then((response) => {
    setTodos((prevstate) => [...prevstate, response.data])
    fetchTodos()
    setShowModal(false)
  }).catch((error) => {
    console.error("Error adding todo", error);
    setMessage("Error adding todo");
  });
}
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
        <h1>KanDoCards</h1>
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
        <button className='add-btn' onClick={handleOpen}>Click to add a Card</button>
        <FilterSelect todos={todos} setTodos={setTodos}/>
      </div>
    { loading ? (
      <div className='loader-flex'>
      <ClockLoader color="white" />
      </div>
    ) :
    ( <Todo todos={todos} deleteTodo={deleteTodo}  
      setTodos={setTodos} 
      editing={editing} 
      setEditing={setEditing}
      showModal={showModal}
      setShowModal={setShowModal}
      currentTodo={currentTodo}
      setCurrentTodo={setCurrentTodo}/>)
    }
    {showModal ? <Modal setShowModal={setShowModal} todos={todos} 
    addTodo={addTodo} 
    editing={editing} 
    setEditing={setEditing}
    currentTodo={currentTodo}
    setCurrentTodo={setCurrentTodo}/>: <div></div>}
    </div>
  
  )
}

export default App;
