

export const Error = ({name}: {name: string}) => {
    return (
        <div className="text-red-500 mt-4">
            Ошибка {name}
        </div>
    )
}