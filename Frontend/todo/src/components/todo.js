import React from "react";
import axios from "axios";
import { useState, } from "react";
import { Reorder } from 'framer-motion';






export default function Todo({ todos, setTodos, deleteTodo, 
    showModal, setShowModal, editing, 
    setEditing, currentTodo, setCurrentTodo,
   deleting, setDeleting, handleDelete, filterByCompleted, filterByPriority}) {

    const [ordering, setOrdering] = useState(false)
    const [originalTodos, setOriginalTodos ] = useState(todos)


    console.log('todos', todos) 

    
    const Container = ordering ? Reorder.Group : 'div';
    const ItemContainer = ordering ? Reorder.Item :'div'; 
      

    const handleEditing = (id) => {
        setShowModal(true)
        setEditing(true)
        setCurrentTodo(todos.find((todo) => todo.id === id))
        return console.log(currentTodo)
    }

    const handleCompleted = async (id) => {
      const todo = todos.find((todo) => todo.id === id);
      const apiURL = "https://todoapp-production-eed7.up.railway.app/api/todos/";
      
      try {
          const response = await axios.put(`${apiURL}${id}/`, {
              ...todo,
              completed: !todo.completed
          });
          
          setTodos((prevTodos) => prevTodos.map((item) => 
              item.id === id ? response.data : item
          ));
      } catch (error) {
          console.error("Error updating todo completion status:", error);
      }
  }

  const saveNewOrder = async (newOrder) => {
    const apiURL = "http://127.0.0.1:8000/api/todos/";

    try {
        console.log("Sending data:", newOrder);
        await axios.post(`${apiURL}test_view/`, {
            todos: newOrder
          });
        setTodos(newOrder)
        setOriginalTodos(newOrder)
        return true;
    }
    catch (error) {
        console.log("Full error:", error);
        
        setTodos(originalTodos);
        return false;
    }  
}

const handleReorder = async () => {  
    if (ordering) {
        const success = await saveNewOrder(todos);  // Wait for save to complete
        if (success) {
            setTodos(todos);
            setOriginalTodos(todos);
            setOrdering(false);
        }
    } else {
        setOrdering(true);
    }
};

  const handleCancel = () => {
    
    setTodos(originalTodos)
    setOrdering(false)
  }

  

  console.log(setOrdering)

    return (
      
       <Container {...ordering && { values: todos, onReorder: setTodos, }}> 
    <div className='todo-flex'>
     <div style={{color:'white'}} onClick={handleReorder}>{ ordering ? 'Save' : 'ReOrder'}</div>
     {ordering && <div style={{color:'white'}} onClick={handleCancel}>Cancel</div>}
      
      <div className="priority-filter">{filterByPriority ? 'Showing ' + filterByPriority + ' cards' : ''}</div>
      todos ? {
        
      } {todos.filter(todo => 
        (filterByCompleted ? todo : todo.completed) && 
        (filterByPriority ? todo.priority === filterByPriority : todo)
      ).map((item) => (
        <ItemContainer {...ordering && {value:item, key:item.id}}>
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
             <input id="completedChecbox" type="checkbox" checked={item.completed}  onChange={() => handleCompleted(item.id)}/>
            </div>
        </div>  
          <div className='todo-title' style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>{item.title}</div>
          <div className='todo-description'>
                { item.completed ? "ALL DONE GOOD WORK" : item.description }
          </div>
          <div className="edit-delete-flex">
            { !item.sticky ? <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>: <div></div> }
            <button className="edit-btn" onClick={() => handleEditing(item.id)}>edit</button>
           </div> 
        </div>
        </ItemContainer>
      ) )} : message
    </div>
    </Container>
    )
}

//{ !item.sticky ? <button className="delete-btn" onClick={() => deleteTodo(item.id)}>Delete</button>: <div></div> }