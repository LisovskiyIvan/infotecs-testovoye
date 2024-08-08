import { FormEvent, useState } from "react";
import { Error } from "./Error";
import { ITask } from "../DTO/Task";

interface Props {
    isOpen: boolean,
    onClose: () => void,
    changeValue: [string, ITask] | undefined,
    changeTaskValue: (v: [string, ITask] | undefined) => void,
    increment: () => void
}

export const Modal = ({isOpen, onClose, changeValue, changeTaskValue, increment}: Props) => {

    if (!isOpen) {
        return null;
      }
    // const [oldData, setOldData] = useState<ITask | null>()
    // if (!changeValue) {
    //     setOldData(null)
    // } else {
    //     setOldData(JSON.parse(changeValue[1]))
    // }
    const [data, setData] = useState<ITask>({title: '', backgroundId: 0, description: '', date: ''})
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    
    
    // console.log(oldData)

    // if (changeValue != undefined) {
    //     const data: ITask = JSON.parse(changeValue[1])
    //     setOldData(data)
        
    // }
    

    

  
  const [error, setError] = useState(false);
  // const [success, setSuccess] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (changeValue) modifyTask(changeValue)
    else createTask()
  
  };

  function modifyTask(changeValue: [string, ITask]) {
    setData(changeValue[1])
    console.log(data)
    const task: ITask = {
      title: title || data.title,
      description: description || data.description,
      date: date || data.date,
      backgroundId: data.backgroundId
    }
    localStorage.setItem(changeValue[0], JSON.stringify(task))

    setTitle("");
    setDescription("");
    setDate("");
    changeTaskValue(undefined)
    increment()
    onClose()
  }

  function createTask() {
    if (!title || !date) {
      setError(true);
      return;
    }
    const task: ITask = {
      title: title,
      description: description,
      date: date,
      backgroundId: Math.floor(Math.random() * 5),
    };
    
    localStorage.setItem(
      Math.floor(Math.random() * 100000).toString(),
      JSON.stringify(task)
    );

    // setSuccess(true)
    setTitle("");
    setDescription("");
    setDate("");
    changeTaskValue(undefined)
    increment()
    onClose()
  }

  function closeModal(){
    changeTaskValue(undefined)
    onClose()
    increment()
  }
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black  flex items-center justify-center z-1000">
      <div className="w-[600px] rounded-md bg-white mt-[15px] text-white relative">
        <div className="absolute top-0 right-2 text-black text-5xl cursor-pointer" onClick={closeModal}>
            &times;</div>
        <form
          onSubmit={handleSubmit}
          className="p-8 text-xl flex flex-col items-center"
        >
          <div className="flex flex-col items-center pb-4 mb-2 bg-black w-[65%] rounded-lg ">
            <label htmlFor="title" className="mb-1  text-2xl">
              Заголовок
            </label>
            <input
              className="max-w-[250px] p-2 rounded-lg"
              type="text"
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError(false);
              }}
            />
            {data.title && <div className="mt-2">Прошлый заголовок: {data.title}</div>}
          </div>

          <div className="flex flex-col items-center pb-4 mb-2 bg-black w-[65%] rounded-lg">
            <label htmlFor="description" className="mb-1  text-2xl">
              Описание
            </label>
            <textarea
              id="description"
              className="w-[70%] p-2 rounded-lg "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {data.description && <div className="mt-2">Прошлое описание: {data.description}</div>}
          </div>

          <div className="flex flex-col items-center pb-4 mb-2 bg-black w-[65%] rounded-lg">
            <label htmlFor="date" className="mb-1  text-2xl">
              Дата
            </label>
            <input
              type="date"
              id="date"
              className="p-1 rounded-lg "
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setError(false);
              }}
            />
            {data.date && <div className="mt-2">Прошлая дата: {data.date}</div>}
          </div>

          <button
            type="submit"
            className="mt-2 rounded-lg bg-cyan px-4 py-2 text-black"
          >
            Отправить
          </button>
          {error && (
            <Error name="заголовок и дата должны быть заполнены"></Error>
          )}
        </form>
      </div>
    </div>
  );
};
