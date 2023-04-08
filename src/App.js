import { useState } from "react"
import Header from './components/Header'
import Tasks from './components/Tasks'
function App() {
  const[tasks, setTasks] = useState (
    [
      {
      id: 1,
      text: 'Doctors Appointment',
      day: 'Feb 5th at 2:30pm',
      reminder: 'true',
      },

      {
        id: 2,
        text: 'School Meeting',
        day: 'May 8th at 5:30pm',
        reminder: 'true',
      },

      {
        id: 3,
        text: 'Food Shopping',
        day: 'March 2nd at 3:00pm',
        reminder: 'false',
        }
    ]
  )

  // Delete Tasks
    const deleteTask = (id) => {
      setTasks(tasks.filter((task) => task.id !== id ))
    }


  return (
    <div className="container">
    <Header />
    {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask}/> : "No Task To Show"}

    </div>
  );
}

export default App;
