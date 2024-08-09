
import '../CSS/ModalComponent.css';
import { UserDTO } from '../DTO/UsersDTO';

interface Props {
    isOpen: boolean,
    onClose: () => void,
    modalData: UserDTO | undefined
}

const ModalComponent = ({ isOpen, onClose, modalData }: Props) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className='modal-container'>
          {modalData && <> <div>
            Name: {modalData.firstName + ' ' + modalData.lastName + ' ' + modalData.maidenName}
            </div>
            <div>
              Age: {modalData.age}
            </div>
            <div>
              Address: {modalData.address.city + ', ' + modalData.address.address}
            </div>
            <div>
              Height: {modalData.height}
            </div>
            <div>
              Weight: {modalData.weight}
            </div>
            <div>
              Email: {modalData.email}
            </div></>}
         
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;