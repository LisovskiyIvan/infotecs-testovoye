import { useEffect, useState } from "react"
import { Task } from "./Task";


export const TaskList = () => {

    const [tasks, setTasks] = useState<Record<number, string>>()

    useEffect(() => {
        const storage = window.localStorage;

const keys = Object.keys(storage);


const values = keys.map(key => storage.getItem(key));

const allData = keys.reduce((acc, key  , index) => {
  acc[key] = values[index];
  return acc;
}, {}); 
    setTasks(allData)
    }, [])

    return(
        <div className="w-[90%] mt-[30px]">
            {tasks && Object.values(tasks).map((value, index) => <Task value={value} key={index}></Task>)}
        </div>
    )
}