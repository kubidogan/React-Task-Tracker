import { useState, useEffect } from "react"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from "./components/Header"
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from "./components/Footer"
import About from "./components/About"
import TaskDetails from "./components/TaskDetails"
import Search from "./components/Search"
import { DragDropContext } from 'react-beautiful-dnd';


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState ([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      const filteredTasks = tasksFromServer.filter((task) =>
        task.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setTasks(filteredTasks)
    }
    getTasks()

  }, [searchTerm]);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:4000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch A Task
  const fetchTask  = async (id) => {
    const res = await fetch(`http://localhost:4000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:4000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks, data])
  }

  // Delete Tasks
  const deleteTask = async (id) => {
    await fetch(`http://localhost:4000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id ))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const upTask = {...taskToToggle, reminder: !taskToToggle.reminder}
    const res = await fetch(`http://localhost:4000/tasks/${id}`, {
      method: 'PUT',
      headers: {'Content-type': "application/json"
      },

      body: JSON.stringify(upTask)
    })

    const data = await res.json( )

    setTasks(tasks.map((task) =>
    task.id === id ?
    {...task, reminder: data.reminder} : task))
  }

  // Handle Drag and Drop
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        <DragDropContext onDragEnd={handleDragEnd}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {showAddTask && <AddTask onAdd={addTask} />}
                  <Search onSearch={(value) => setSearchTerm(value)} />
                  {tasks.length > 0 ? (
                    <Tasks
                      tasks={tasks}
                      onDelete={deleteTask}
                      onToggle={toggleReminder}
                    />
                  ) : (
                    "No Tasks to Show"
                  )}
                </>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/task/:id" element={<TaskDetails />} />
          </Routes>
        </DragDropContext>
        <Footer />
      </div>
    </Router>
  );
 }


export default App;













// import { useState, useEffect } from "react"
// import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
// import Header from "./components/Header"
// import Tasks from './components/Tasks'
// import AddTask from './components/AddTask'
// import Footer from "./components/Footer"
// import About from "./components/About"
// import TaskDetails from "./components/TaskDetails"
// import Search from "./components/Search"
// function App() {
//   const [showAddTask, setShowAddTask] = useState(false)
//   const [tasks, setTasks] = useState ([])
//   const [searchTerm, setSearchTerm] = useState('');


//   useEffect(() => {
//     const getTasks = async () => {
//       const tasksFromServer = await fetchTasks()
//       setTasks(tasksFromServer)
//     }
//     getTasks()

//   }, [])

//   // Fetch Tasks
//   const fetchTasks = async () => {
//     const res = await fetch('http://localhost:4000/tasks')
//     const data = await res.json()

//     return data
//   }
//   // Fetch A Task
//   const fetchTask  = async (id) => {
//     const res = await fetch(`http://localhost:4000/tasks/${id}`)
//     const data = await res.json()

//     return data
//   }

//   // Add Task
//     const addTask = async (task) => {
//       const res = await fetch('http://localhost:4000/tasks', {
//         method: 'POST',
//         headers: {
//           'Content-type': 'application/json'
//         },
//         body: JSON.stringify(task)
//       })

//       const data = await res.json()
//       setTasks([...tasks, data])


//       // const id = Math.floor(Math.random() * 1000) + 1
//       // const newTask = {id, ...task }
//       // setTasks([...tasks, newTask])
//     }


//   // Delete Tasks
//     const deleteTask = async (id) => {
//       await fetch(`http://localhost:4000/tasks/${id}`, {
//         method: 'DELETE'
//       })
//       setTasks(tasks.filter((task) => task.id !== id ))
//     }

//   // Toggle Reminder
//     const toggleReminder = async (id) => {
//       const taskToToggle = await fetchTask(id)
//       const upTask = {...taskToToggle, reminder: !taskToToggle.reminder}
//       const res = await fetch(`http://localhost:4000/tasks/${id}`, {
//         method: 'PUT',
//         headers: {'Content-type': "application/json"
//         },

//         body: JSON.stringify(upTask)
//       })

//       const data = await res.json( )

//       setTasks(tasks.map((task) =>
//       task.id === id ?
//       {...task, reminder: data.reminder} : task))
//     }

//     // Search filter

//     const onSearch = (searchTerm) => {
//       setSearchTerm(searchTerm)
//     }

//     const filteredTasks = tasks.filter((task) =>
//       task.text.toLowerCase().includes(searchTerm.toLowerCase())
//     )

//   return (
//     <Router>
//       <div className="container">
//       <Header onAdd={() => setShowAddTask(!showAddTask)}
//       showAdd={showAddTask}
//       />
//         <Routes>
//           <Route
//             path='/'
//             element={
//               <>
//               {showAddTask && <AddTask onAdd={addTask} />}
//               <Search onSearch={onSearch} />
//               {tasks.length > 0 ? (
//               <Tasks
//                 tasks={tasks}
//                 onDelete={deleteTask}
//                 onToggle={toggleReminder}
//              />
//             ) : (

//               "No Task To Show"
//               )}
//             </>
//             }
//           />
//           <Route path='/about' element={<About />}
//           />
//           <Route path='/task/:id' element={<TaskDetails />}
//           />
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;


// Issue with ports and connection need to fix.
