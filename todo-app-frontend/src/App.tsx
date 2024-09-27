import { AverageTime } from "./components/AverageTime"
import { NewTodoBtn } from "./components/NewTodoBtn"
import { PaginationGroup } from "./components/Pagination"
import { SearchFilter } from "./components/SearchFilter"
import { ToDoList } from "./components/ToDoList"




function App() {

// I add the flex class to have a more clean code
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <div className="my-6 w-3/4 mx-auto flex flex-col gap-4">
        <SearchFilter/>
        <NewTodoBtn/>
        <ToDoList/>
        <PaginationGroup/>
        <AverageTime/>
      </div>

    </div>



  )
}

export default App
