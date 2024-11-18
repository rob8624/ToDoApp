import React from "react";





export default function Todo({ todos, deleteTodo }) {
    return (
    <div className='todo-flex'>
      todos ? { todos.map((item) => (
        <div key={item.id}
        className="todo" style={{ 
          backgroundColor: item.priority === 'high' ? '#EF7DC1' : 
                           item.priority === 'medium' ? '#10BE3F' :
                           item.priority === 'low' ? '#12AFBB' : 
                           '#f1f8e9'
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
        </div>  
          <div className='todo-title'>{item.title}</div>
          <div className='todo-description'>
                {item.description}{console.log('item', item)}
          </div>
            { !item.sticky ? <button className="delete-btn" onClick={() => deleteTodo(item.id)}>Delete</button>: <div></div> }
        </div>
      ) )} : message
    </div>)
}