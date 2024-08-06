import { useEffect, useState } from "react";
import "./CSS/App.css";
import Table from "./Components/Table";
import {UsersDTO, UserDTO} from "./DTO/UsersDTO";
import Filters from "./Components/Filters";
import ModalComponent from "./Components/Modal";

function App() {
  const [data, setData] = useState<UsersDTO>();
  const [modalData, setModalData] = useState<UserDTO>();

  useEffect(() => {
    async function getData() {
      const res = await fetch("https://dummyjson.com/users").then((res) =>
        res.json()
      );
      setData(res);
    }
    getData();
  }, []);


  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (row: UserDTO) => {
    setIsModalOpen(true);
    setModalData(row)
    console.log(row)
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <Filters></Filters>
      <Table data={data} openModal={openModal}></Table>
      <ModalComponent isOpen={isModalOpen} onClose={closeModal} modalData={modalData}>
      </ModalComponent>
    </>
  );
}

export default App;
