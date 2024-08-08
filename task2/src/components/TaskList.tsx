import { useEffect, useState } from "react";
import { Task } from "./Task";
import { ITask } from "../DTO/Task";

interface Props {
  openModal: () => void;
  changeTaskValue: (v: [string, ITask]) => void;
  counter: number;
  increment: () => void;
}

export const TaskList = ({
  openModal,
  changeTaskValue,
  counter,
  increment,
}: Props) => {
  const [tasks, setTasks] = useState<Record<number, ITask>>();

  useEffect(() => {
    function getData() {
      const storage = window.localStorage;

      const keys: string[] = Object.keys(storage);

      const values: ITask[] = keys.map((key) => {
        const r = storage.getItem(key);
        if (r) return JSON.parse(r);
      });
    

      const allData: Record<number, ITask> = keys.reduce(
        (acc: Record<number | string, ITask>, key, index) => {
          acc[key] = values[index];
          // console.log(acc)
          return acc;
        },
        {}
      );
      // console.log(values)
      // console.log(allData)
      setTasks(allData);
    }
    getData();
    window.addEventListener("storage", getData);

    return () => {
      window.removeEventListener("storage", getData);
    };
  }, [counter]);
  

  return (
    <div className="w-[90%] mt-[30px] flex flex-col items-center">
      {tasks &&
        Object.entries(tasks).map((value, index) => (
          <Task
            value={value}
            key={index}
            increment={increment}
            openModal={openModal}
            changeTaskValue={changeTaskValue}
          ></Task>
        ))}
    </div>
  );
};
