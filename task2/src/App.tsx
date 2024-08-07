import { AddForm } from './components/AddForm'
import { TaskList } from './components/TaskList'
import { Title } from './components/Title'

function App() {
  

  return (
    <div className=' h-[100dvh] flex flex-col items-center'>
      <Title></Title>
      <AddForm></AddForm>
      <div className='w-[80%] mx-[5%] my-[3%]'>
        <TaskList></TaskList>
      </div>
    </div>
  ) 
}

export default App
