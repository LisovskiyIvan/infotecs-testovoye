import { useRef, useState } from "react";
import "../CSS/Table.css";
import {UsersDTO, UserDTO} from "../DTO/UsersDTO";
import { Select } from "./Select";

interface Props {
  data: UsersDTO | undefined,
  openModal: (row: UserDTO) => void
}

export default function Table({ data, openModal }: Props) {
  const [columnWidths, setColumnWidths] = useState([150, 150, 150, 150, 150]);
  const [sortedData, setSortedData] = useState<UsersDTO>()
  const tableRef = useRef(null);
  const [initials, setInitials] = useState("none");
  const [age, setAge] = useState("none");
  const [gender, setGender] = useState("none");
  const [adress, setAdress] = useState("none");

  const options = [
    { name: "", value: "nosort" },
    { name: "По возрастанию", value: "asc" },
    { name: "По убыванию", value: "desc" },
  ];


  const handleMouseDown = (
    index: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const startX = event.clientX;
    const startWidth = columnWidths[index];

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(startWidth + e.clientX - startX, 50); // Минимальная ширина 50px
      const newWidths = [...columnWidths];
      newWidths[index] = newWidth;
      setColumnWidths(newWidths);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  function sortingChange(
    event: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) {
    switch (index) {
      case 0:
        setInitials(event.target.value);
        setAge('none');
        setGender('none');
        setAdress('none');
        sortHandler("firstName", event.target.value)
        break;
      case 1:
        setAge(event.target.value);
        setInitials('none');
        setGender('none');
        setAdress('none');
        sortHandler("age", event.target.value)
        break;
      case 2:
        setGender(event.target.value);
        setInitials('none');
        setAge('none');
        setAdress('none');
        sortHandler("gender", event.target.value)
        break;
      case 4:
        setAdress(event.target.value);
        setInitials('none');
        setAge('none');
        setGender('none');
        sortHandler("address", event.target.value)
        break;
    }
    
  }

  function sortHandler(key: keyof UserDTO, direction: string) {
    setSortedData(data)
    let arr = data?.users
    if (!arr) return 0
    if (direction === 'nosort') data = sortedData
    console.log(age)
    if (key == 'address') {
        arr.sort((a, b) => {
        if (a.address.city < b.address.city) {
          return direction === 'asc' ? -1 : 1;
        }
        if (a.address.city > b.address.city) {
          return direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
      // setSortedData(sortedRows);
    } else {
      arr.sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === 'asc' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
      
    }
    
      
  }

  return (
      <table ref={tableRef} border={1}>
        <thead>
          <tr>
            {/* {["ФИО", "Возраст", "Пол", "Номер телефона", "Адрес"].map(
              (col, index) => (
                <th key={index} style={{ width: columnWidths[index] }}>
                  <div className="resizable-header">
                    {col}
                    {index != 3 && (
                      <div className="select-container">
                        <select
                          value={`value${index}`}
                          onChange={(e) => sortingChange(e, index)}
                          className="select"
                          style={{ width: columnWidths[index] }}
                        >
                          {options.map((option, index) => (
                            <option key={index} value={option.value}>
                                 {option.name}
                            </option>))}
                        </select>
                      </div>
                    )}
                    <div
                      className="resize-handle"
                      onMouseDown={(e) => handleMouseDown(index, e)}
                    />
                  </div>
                </th>
              )
            )} */}
            <th style={{ width: columnWidths[0] }}>
              <div className="resizable-header">
                ФИО
                <div className="select-container">
                  {/* <select
                    value={initials}
                    onChange={(e) => sortingChange(e, 0)}
                    className="select"
                    style={{ width: columnWidths[0] }}
                  >
                    {options.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select> */}
                  <Select value={initials} width={columnWidths[0]} options={options} name={0} sortingChange={sortingChange}></Select>
                </div>
                <div
                  className="resize-handle"
                  onMouseDown={(e) => handleMouseDown(0, e)}
                />
              </div>
            </th>
            <th style={{ width: columnWidths[1] }}>
              <div className="resizable-header">
                Возраст
                <div className="select-container">
                  <select
                    value={age}
                    onChange={(e) => sortingChange(e, 1)}
                    className="select"
                    style={{ width: columnWidths[1] }}
                  >
                    {options.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  className="resize-handle"
                  onMouseDown={(e) => handleMouseDown(1, e)}
                />
              </div>
            </th>
            <th style={{ width: columnWidths[2] }}>
              <div className="resizable-header">
                Пол
                <div className="select-container">
                  <select
                    value={gender}
                    onChange={(e) => sortingChange(e, 2)}
                    className="select"
                    style={{ width: columnWidths[2] }}
                  >
                    {options.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  className="resize-handle"
                  onMouseDown={(e) => handleMouseDown(2, e)}
                />
              </div>
            </th>
            <th style={{ width: columnWidths[3] }}>
              <div className="resizable-header">
                Номер
                <div
                  className="resize-handle"
                  onMouseDown={(e) => handleMouseDown(3, e)}
                />
              </div>
            </th>
            <th style={{ width: columnWidths[4] }}>
              <div className="resizable-header">
                Адресс
                <div className="select-container">
                  <select
                    value={adress}
                    onChange={(e) => sortingChange(e, 4)}
                    className="select"
                    style={{ width: columnWidths[4] }}
                  >
                    {options.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  className="resize-handle"
                  onMouseDown={(e) => handleMouseDown(4, e)}
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data && data.users.map((row, rowIndex) => (
            <tr key={rowIndex} onClick={() => openModal(row)}>
              <td style={{ width: columnWidths[0] }}>
                {row.lastName + " " + row.firstName + " " + row.maidenName}
              </td>
              <td style={{ width: columnWidths[1] }}>{row.age}</td>
              <td style={{ width: columnWidths[2] }}>{row.gender}</td>
              <td style={{ width: columnWidths[3] }}>{row.phone}</td>
              <td style={{ width: columnWidths[4] }}>
                {row.address.city + ", " + row.address.address}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
  );
}
