

export default function Modal({ setShowModal }) {


    const handleClose = () => {
        setShowModal(false)
        
      }

    return (
        <div className="modal-flex">
            <button onClick={handleClose}>HI BETH!!!!!! CLICK ME TO CLOSE ME!!!</button>
        </div>
    )
}