

export default function Modal({ setShowModal }) {


return (
    <div className="modal-overlay">
        <div className="modal-flex">
            <div className="modal-text">Add the Todo</div>
            <form className="modal-btn-flex">
                
                    <button className="modal-btn-add" type="submit">Add</button>
                    <button className="modal-btn-close" onClick={() => setShowModal(false)}>Cancel</button>
                
            </form>
        </div>
    </div>
    )
}