
import './App.css';
import React, { useEffect, useState } from "react"
import axios from "axios";
import Modal from "./components/modal.js"
import Todo from "./components/todo.js"
import FilterSelect from "./components/filterSelect.js"
import DeleteConfirm from "./components/deleteConfirm.js"
import ClockLoader from "react-spinners/ClockLoader";
import { useScroll } from "motion/react"
import { motion } from "motion/react"

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [currentTodo, setCurrentTodo] = useState(null)
  const [ deleteting, setDeleting] = useState(null)
  const [todoToDelete, setTodoToDelete] = useState('')
  const [filterByCompleted, setFilterByCompleted] = useState([])
  const [todosCount, setTodoCount] = useState(null)
  const [filterByPriority, setFilerByPriority] = useState(null)

  const { scrollYProgress } = useScroll();
 

  
 
  const fetchTodos = () => {
    const apiURL = "https://todoapp-production-eed7.up.railway.app/api/todos/"
    const cachedTodos = localStorage.getItem(todos)

    if(cachedTodos) {
      setTodos(JSON.parse(cachedTodos))
     
      setLoading(false)
    } else {
    axios.get(apiURL).then((response) => {
      setTodos(response.data)
      setTodoCount(todos.length)
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
  
  axios.delete(`${apiURL}${id}/`)
    .then(() => {
      console.log('Delete successful');
      setTodos(currentTodos => {
        const newTodos = currentTodos.filter(todo => todo.id !== id);
        console.log('New todos state:', newTodos);
        setDeleting(false)
        return newTodos;
      });
    })
    .catch((error) => {
      console.error("Error deleting todo", error);
      setMessage("Error deleting todo");
    });
  };

const handleDelete = (id) =>  {
  setDeleting(true)
  setTodoToDelete(id)
}

const confirmDelete = () => {
  deleteTodo(todoToDelete)
  }

const handleOpen = () => {
  setShowModal(true)
}

const handleCompleteFilter = () => {
  setFilterByCompleted(!filterByCompleted)
}



return (

  
    <div className="todo-container">
      
      <motion.div className='top-scroll' style={{ scaleX: scrollYProgress, originX: 0 }} />
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
        <div className='filter-menu-flex'>
    <label htmlFor="completed-checkbox" className='completed-check-label'>
        {todosCount}{filterByCompleted ? 'Check to show completed': 'uncheck to show all'}
    </label>
    <input 
        id="completed-checkbox" 
        style={{'color': 'white'}} 
        type='checkbox' 
        onChange={handleCompleteFilter}
    />
    <FilterSelect 
        className="filter-priority-select"
        todos={todos} 
        setTodos={setTodos} 
        filterByPriority={filterByPriority} 
        setFilterByPriority={setFilerByPriority}
    />
</div>
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
      setCurrentTodo={setCurrentTodo}
      deleteting={deleteting}
      setdeleting={setDeleting}
      handleDelete={handleDelete}
      filterByCompleted={filterByCompleted}
      filterByPriority={filterByPriority}/> ) 
    }
    {showModal ? <Modal setShowModal={setShowModal} todos={todos} 
    addTodo={addTodo} 
    editing={editing} 
    setEditing={setEditing}
    currentTodo={currentTodo}
    setCurrentTodo={setCurrentTodo}/>: <div></div>}
    { deleteting ? <DeleteConfirm setDeleting={setDeleting} confirmDelete={confirmDelete} /> : <div></div>}
    </div>
  
  )
}

export default App;
