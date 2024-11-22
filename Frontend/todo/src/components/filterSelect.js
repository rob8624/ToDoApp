import React from 'react'

export default function FilterSelect( { todos, setTodos }) {

    const priority = todos.length > 0 ? todos[0].priority_choices : [];

    return (
        <select>
          <option>All</option>
          { priority.map(item => {
            return <option key={item[0]} value={item[0]}>{item[1]}</option>
          }) }
        </select>
    )
}