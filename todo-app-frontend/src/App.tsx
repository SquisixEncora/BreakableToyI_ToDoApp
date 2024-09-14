import { NewTodoBtn } from "./components/NewTodoBtn"
import { SearchFilter } from "./components/SearchFilter"
import { ToDoList } from "./components/ToDoList"




function App() {
  

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <div className="mt-6 w-3/4 mx-auto">
        <SearchFilter/>
        <div className="mb-4"/>
        <NewTodoBtn/>
        <div className="mb-4"/>
        <ToDoList/>
      </div>
      
    </div>
    
      
    
  )
}

export default App
