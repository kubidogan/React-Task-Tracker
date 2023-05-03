// import Task from "./Task"


// const Tasks = ({ tasks, onDelete, onToggle}) => {
//   return (
//     <>
//       {tasks.map((task) => (
//       <Task key={task.id}
//       task={task}
//       onDelete={onDelete}
//       onToggle={onToggle}
//       />
//       ))}
//     </>
//   )
// }

// export default Tasks


import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Tasks = ({ tasks, onDelete, onToggle }) => {
  return (
    <Droppable droppableId="tasks">
      {(provided) => (
        <ul {...provided.droppableProps} ref={provided.innerRef}>
          {tasks.map((task, index) => (
            <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
              {(provided, snapshot) => (
                <li
                  className={`task ${task.reminder ? 'reminder' : ''}`}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <h3>
                    {task.text}{' '}
                    <FaTimes
                      style={{ color: 'red', cursor: 'pointer' }}
                      onClick={() => onDelete(task.id)}
                    />
                  </h3>
                  <p>{task.day}</p>
                  <p>
                    <Link to={`/task/${task.id}`}>View Details</Link>
                  </p>
                </li>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default Tasks;
