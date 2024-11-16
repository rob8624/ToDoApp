

export default function Modal({ setShowModal, todos }) {



const owners = todos.length > 0 ? todos[0].owners_choices : [];
const priority = todos.length > 0 ? todos[0].priority_choices : [];
console.log(priority)



return (
    <div className="modal-overlay">
        <div className="modal-border">
            <div className="modal-flex">
                <div className="modal-text">Add the Todo</div>
                <form className="modal-form-flex">
                        
                        <div className="select-flex">
                            <div className="owner-flex">
                                <label className="owner-label" htmlFor="ownerSelect">Owner</label>
                                    <select id="ownerSelect">
                            
                                        {
                                        owners.map((item) => (
                                            <option key={item[0]} value={item[1]}>{item[1]}</option>
                                        ))
                                        }
                                    </select>
                            </div>
                            <div className="priority-flex">         
                            <label className="priority-label" htmlFor="prioritySelect">Priority</label>  
                                <select id="prioritySelect">
                                {
                                    priority.map((item) => (
                                        <option key={item[0]} value={item[1]}>{item[1]}</option>
                                    ))
                                }
                                </select>
                            </div> 
                        </div>
                        <label htmlFor="todoInput">ToDo</label>
                        <textarea id="todoInput" ></textarea>
                        
                        <div className="modal-btn-flex">
                            <button className="modal-btn-add" type="submit">Add</button>
                            <button className="modal-btn-close" onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    
                </form>
            </div>
        </div>
    </div>
    )
}