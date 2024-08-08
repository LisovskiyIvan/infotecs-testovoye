import { ITask } from "../DTO/Task";

interface Props {
    value: [string, ITask],
    openModal: () => void,
    changeTaskValue: (v: [string, ITask]) => void,
    increment: () => void
}

export const Task = ({ value, openModal, changeTaskValue, increment }: Props) => {

//  const colors = ['teal', 'cyan', 'lime', 'emerald', 'sky']
  const data: ITask = value[1];

  function deleteTask() {
    localStorage.removeItem(value[0])
    increment()
  }

  function changeTask() {
    changeTaskValue(value)
    openModal()
    
  }

  return (
    
    <div className={` bg-sky text-black mb-4 rounded-lg min-h-[130px] max-w-[900px] min-w-[400px] py-3 text-2xl flex flex-col relative`}>
      <div className="px-4">{data.title}</div>
      <p className="px-10 text-xl mb-4 flex-1 flex-grow break-words">{data.description}</p>
      <div className=" text-sm px-4 ">Выполнить до: {data.date}</div>
      <div className="absolute right-10 top-0 hover:scale-110 duration-300 cursor-pointer" onClick={changeTask}>&#9997;</div>
      <div className="absolute right-2 top-0 hover:scale-110 duration-300 cursor-pointer" onClick={deleteTask}>&times;</div>
      </div>   
  );
};
