import { useEffect, useState } from "react";
import { Task } from "./Task";

interface Props {
    openModal: () => void,
    changeTaskValue: (v: [string, string]) => void
}

export const TaskList = ({openModal, changeTaskValue}: Props) => {
  const [tasks, setTasks] = useState<Record<number, string>>();

  useEffect(() => {
    const storage = window.localStorage;

    const keys = Object.keys(storage);

    const values = keys.map((key) => storage.getItem(key));

    const allData = keys.reduce((acc, key, index) => {
      acc[key] = values[index];
      return acc;
    }, {});
    setTasks(allData);
  }, []);
  

  return (
    <div className="w-[90%] mt-[30px] flex flex-col items-center">
      {tasks &&
        Object.entries(tasks).map((value, index) => (
          <Task value={value}  key={index} openModal={openModal} changeTaskValue={changeTaskValue}></Task>
        ))}
    </div>
  );
};
