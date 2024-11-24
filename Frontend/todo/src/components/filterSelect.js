import React from 'react'

export default function FilterSelect( { todos, setTodos, filterByPriority, setFilterByPriority }) {

    const priority = todos.length > 0 ? todos[0].priority_choices : [];

    const handleChange = (e) => {
        setFilterByPriority(e.target.value)
    }
    
    
    return (
      <div className="priority-filter-flex">  {/* Added container class */}
          <label htmlFor="priority-select" className='priority-select-label'>Priority:</label>
          <select id="priority-select" className="priority-select" onChange={handleChange}>
              <option value=''>All</option>
              {priority.map(item => {
                  return <option key={item[0]} value={item[0]}>{item[1]}</option>
              })}
          </select>
      </div>
  )
}