


export default function DeleteConfirm({ setDeleting, confirmDelete}) {
    return (
        <div className="show-delete delete-confirm-flex">
            <div>
                DANGER! Delete cannot be reversed.
            </div>
            <div className="delete-confirm-btn-flex">
                <button onClick={confirmDelete}>Cofirm?</button>
                <button onClick={() => {setDeleting(null)}}>Cancel</button>
            </div>
        </div> 
    )
}