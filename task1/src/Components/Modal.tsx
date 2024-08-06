
import '../CSS/ModalComponent.css';

interface Props {
    isOpen: boolean,
    onClose: () => void,
    modalData: any
}

const ModalComponent = ({ isOpen, onClose, modalData }: Props) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className='modal-container'>
            {modalData.id}
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;