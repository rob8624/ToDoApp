import React from "react";





export default function Todo({ todos, setTodos, deleteTodo, 
    showModal, setShowModal, editing, setEditing, currentTodo, setCurrentTodo }) {

      
      

    const handleEditing = (id) => {
        setShowModal(true)
        setEditing(true)
        setCurrentTodo(todos.find((todo) => todo.id === id))
        return console.log(currentTodo)
    }

    const handleCompleted = (id) => {
        
        setTodos((prevTodos) => prevTodos.map((item) => (
            item.id === id ? { ...item, completed: !item.completed  }  : item
        ))
    
    )
    }

    return (
    <div className='todo-flex'>
      todos ? { todos.map((item) => (
        <div key={item.id}
        className="todo"  style={{ 
         
          backgroundColor: item.completed ? 'black' : item.priority === 'high' ? '#EF7DC1' : 
                           item.priority === 'medium' ? '#10BE3F' :
                           item.priority === 'low' ? '#12AFBB' : 
                           '#f1f8e9',
        
          
        }} >
          <div className="todo-info">
            <div className="info-created"> {new Date(item.created).toLocaleDateString('en-UK', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}</div> 
            <div className="info-priority">{ item.priority.charAt(0).toUpperCase() + item.priority.slice(1).toLowerCase()
                }</div> 
            <div className="checkbox-flex">
              <label for="completedCheckbox">Done?</label>     
             <input id="completedChecbox" type="checkbox" onChange={() => handleCompleted(item.id)}/>
            </div>
        </div>  
          <div className='todo-title' style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>{item.title}</div>
          <div className='todo-description'>
                { item.completed ? "ALL DONE GOOD WORK" : item.description }
          </div>
          <div className="edit-delete-flex">
            { !item.sticky ? <button className="delete-btn" onClick={() => deleteTodo(item.id)}>Delete</button>: <div></div> }
            <button className="edit-btn" onClick={() => handleEditing(item.id)}>edit</button>
           </div> 
        </div>
      ) )} : message
    </div>)
}