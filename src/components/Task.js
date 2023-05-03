// import { FaTimes } from 'react-icons/fa'
// import { Link } from "react-router-dom"
// import { Draggable } from 'react-beautiful-dnd';


// const Task = ({task, onDelete, onToggle }) => {
//   return (
//     <div className={`task ${task.reminder ? 'reminder' : ''}`}
//       onDoubleClick={() => onToggle(task.id)}>

//       <h3>
//         {task.text}{' '}
//         <FaTimes
//         style={{ color: 'red', cursor: 'pointer '
//         }}
//         onClick={() => onDelete (task.id)}
//         />
//       </h3>
//       <p>{task.day}</p>
//       <p>
//         <Link to={`/task/${task.id}`}>View Details</Link>
//       </p>
//     </div>
//   )
// }

// export default Task

import { FaTimes, FaBars } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ task, index, onDelete}) => {

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          className={`task ${task.reminder ? 'reminder' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={provided.draggableProps.style}
        >
          <div className="drag-handle" {...provided.dragHandleProps}>
            <FaBars />
          </div>
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
        </div>
      )}
    </Draggable>
  );
};

export default Task;
