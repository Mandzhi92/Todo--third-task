import './TaskList.css';

import Task from '../Task';

function TaskList({ todoData, onDeleted, onToggleDone, onToggleEditing, onFormatLabel }) {
  const listItems = todoData.map(({ id, done, editing, label, getTime }) => {
    let className = '';
    if (done) {
      className = 'completed';
    }
    if (editing) {
      className = 'editing';
    }
    return (
      <li key={id} className={className}>
        <Task
          done={done}
          label={label}
          getTime={getTime}
          editing={editing}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
          onToggleEditing={() => onToggleEditing(id)}
          onFormatLabel={(label) => onFormatLabel(id, label)}
        />
      </li>
    );
  });

  return <ul className="todo-list">{listItems}</ul>;
}


export default TaskList;
