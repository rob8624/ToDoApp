

export default function Modal({ setShowModal, todos }) {

console.log('from modal', todos)

const owners = todos.length > 0 ? todos[0].owners_choices : [];


return (
    <div className="modal-overlay">
        <div className="modal-flex">
            <div className="modal-text">Add the Todo</div>
            <form className="modal-form-flex">
                    <label htmlFor="ownerSelect">Select Owner</label>
                    <select id="ownerSelect">
                        {
                           owners.map((item) => (
                            <option value={item}>{item[0]}</option>
                           ))
                        }
                    </select>
                
                    <div className="modal-btn-flex">
                        <button className="modal-btn-add" type="submit">Add</button>
                        <button className="modal-btn-close" onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                
            </form>
        </div>
    </div>
    )
}