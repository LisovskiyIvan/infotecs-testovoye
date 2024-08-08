import { useEffect, useState } from "react";
import { Task } from "./Task";

interface Props {
    openModal: () => void,
    changeTaskValue: (v: [string, string]) => void,
    counter: number,
    increment: () => void
}

export const TaskList = ({openModal, changeTaskValue, counter, increment}: Props) => {
  const [tasks, setTasks] = useState<Record<number, string>>();

  useEffect(() => {
    
    function getData() {
      const storage = window.localStorage;

      const keys: string[] = Object.keys(storage);

      const values = keys.map((key) => storage.getItem(key));
    
      const allData: Record<number, string> = keys.reduce((acc: Record<number, string>, key, index) => {
        acc[key] = values[index];
        console.log(acc)
        return acc;
      }, {});
      // console.log(values)
      // console.log(allData)
      setTasks(allData);
    }
    getData()
    window.addEventListener('storage', getData);
    
    return () => {
      window.removeEventListener('storage', getData);
    };

  }, [counter]);
  

  return (
    <div className="w-[90%] mt-[30px] flex flex-col items-center">
      {tasks &&
        Object.entries(tasks).map((value, index) => (
          <Task value={value}  key={index} increment={increment} openModal={openModal} changeTaskValue={changeTaskValue}></Task>
        ))}
    </div>
  );
};
