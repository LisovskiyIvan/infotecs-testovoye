
interface Props {
    value: string,
    width: number,
    options: {
        name: string;
        value: string;
    }[],
    name: number,
    sortingChange: (event: React.ChangeEvent<HTMLSelectElement>, index: number) => void
}



export const Select = ({ value, width, options, name, sortingChange}: Props) => {
  
  
  
    return (
    <select
      value={value}
      onChange={(e) => sortingChange(e, name)}
      className="select"
      style={{ width: width }}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
