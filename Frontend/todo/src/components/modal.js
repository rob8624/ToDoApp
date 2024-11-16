import React, { useState } from "react";

export default function Modal({ setShowModal, todos, addTodo }) {

const [formData, setFormData] = useState({
        title: "",
        description: "",
        owner: "",
        priority: ""});

const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    setFormData((prevData) => (
        {...prevData, [name]: value}
    ))
}  

const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(formData);
}

const owners = todos.length > 0 ? todos[0].owners_choices : [];
const priority = todos.length > 0 ? todos[0].priority_choices : [];
console.log(formData)

const isFormValid = formData.owner && formData.priority;


return (
    <div className="modal-overlay">
        <div className="modal-border">
            <div className="modal-flex">
                <div className="modal-text">Add the Todo</div>
                <form className="modal-form-flex" onSubmit={handleSubmit}>
                        
                        <div className="select-flex">
                            <div className="owner-flex">
                                <label className="owner-label" htmlFor="ownerSelect">Owner</label>
                                    <select id="ownerSelect" 
                                    name="owner" // Ensure the name matches your state property
                                    value={formData.owner} // Bind to state
                                    onChange={handleChange}>
                                    <option value="">Select Owner</option>
                                        {
                                        owners.map((item) => (
                                            <option key={item[0]} value={item[0]}>{item[1]}</option>
                                        ))
                                        }
                                    </select>
                            </div>
                            <div className="priority-flex">         
                            <label className="priority-label" htmlFor="prioritySelect">Priority</label>  
                                <select id="prioritySelect" 
                                    name="priority" 
                                    value={formData.priority} 
                                    onChange={handleChange}>
                                <option value="">Select Priority</option>
                                {
                                    priority.map((item) => (
                                        <option key={item[0]} value={item[0]}>{item[1]}</option>
                                    ))
                                }
                                </select>
                            </div> 
                        </div>
                        <label htmlFor="titleInput">Title</label>
                        <input id="titleInput" type="text"  
                        name="title" 
                        value={formData.title} 
                        onChange={handleChange}></input>

                        <label htmlFor="todoDescription">ToDo</label>
                        <textarea id="todoDescription"  
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange}></textarea>
                        
                        <div className="modal-btn-flex">
                            <button className="modal-btn-add" type="submit" disabled={!isFormValid} >Add</button>
                            <button className="modal-btn-close" onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    
                </form>
            </div>
        </div>
    </div>
    )
}