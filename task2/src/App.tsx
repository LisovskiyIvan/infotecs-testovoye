import { useState } from "react";
import { Modal } from "./components/Modal";
import { TaskList } from "./components/TaskList";
import { Title } from "./components/Title";
import { ITask } from "./DTO/Task";

function App() {


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changeValue, setChangeValue] = useState<[string, ITask] | undefined>()
  const [counter, setCounter] = useState(0)

  const openModal = () => {
    setIsModalOpen(true);
  
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  function changeTaskValue(v: [string, ITask] | undefined) {
      setChangeValue(v)
  }
  function buttonHandler() {
    openModal()
    setCounter(prev => prev + 1)
  }

  function incrementCounter() {
    setCounter(prev => prev + 1)
  }

  return (
    <div className=" min-h-[100dvh] flex flex-col items-center">
      <Title></Title>
      <button className="px-2 py-1 rounded-md text-black bg-cyan  hover:scale-110 duration-300 mt-[20px]" onClick={buttonHandler}>Добавить</button>
      <TaskList openModal={openModal} changeTaskValue={changeTaskValue} counter={counter} increment={incrementCounter}></TaskList>
      <Modal isOpen={isModalOpen} onClose={closeModal} changeValue={changeValue} changeTaskValue={changeTaskValue} increment={incrementCounter}></Modal>
    </div>
  );
}

export default App;
