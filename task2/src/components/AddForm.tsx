import { FormEvent, useState } from "react";
import { Error } from "./Error";
import { ITask } from "../DTO/Task";

export const AddForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(false);
  // const [success, setSuccess] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || !date) {
      setError(true);
      return;
    }
    const task: ITask = {
      title: title,
      description: description,
      date: date,
      backgroundId:  Math.floor(Math.random() * 5)
    };
    localStorage.setItem(
      Math.floor(Math.random() * 100000).toString(),
      JSON.stringify(task)
    );

    // setSuccess(true)
    setTitle('')
    setDescription('')
    setDate('')

  };
  return (
    <div className="w-[600px] rounded-md bg-white mt-[15px] text-white">
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
        </div>

        <div className="flex flex-col items-center pb-4 mb-2 bg-black w-[65%] rounded-lg">
          <label htmlFor="description" className="mb-1  text-2xl">
            Описание
          </label>
          <textarea
            id="description"
            className="w-[70%] p-2 rounded-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
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
        </div>

        <button
          type="submit"
          className="mt-2 rounded-md bg-teal-300 px-4 py-2 text-black"
        >
          Отправить
        </button>
        {error && <Error name="заголовок и дата должны быть заполнены"></Error>}
      </form>
    </div>
  );
};
