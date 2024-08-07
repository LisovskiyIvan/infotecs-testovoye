import { useState } from "react";
// import { AddForm } from "./components/AddForm";
import { Modal } from "./components/Modal";
import { TaskList } from "./components/TaskList";
import { Title } from "./components/Title";

function App() {


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changeValue, setChangeValue] = useState<[string, string]>()

  const openModal = () => {
    setIsModalOpen(true);
  
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  function changeTaskValue(v: [string, string]) {
      setChangeValue(v)
  }


  return (
    <div className=" min-h-[100dvh] flex flex-col items-center">
      <Title></Title>
      {/* <AddForm></AddForm> */}
      <button onClick={openModal}>Ззщйцоуйцгоу</button>
      <TaskList openModal={openModal} changeTaskValue={changeTaskValue}></TaskList>
      <Modal isOpen={isModalOpen} onClose={closeModal} changeValue={changeValue}></Modal>
    </div>
  );
}

export default App;
