import './Task.css';
import EditingTask from '../EditingTask';

function Task(props) {
  const { label, onDeleted, onToggleDone, onToggleEditing, getTime, editing, onFormatLabel, done } = props;
  
  const task = (
    <div className="view">
      <input className="toggle" type="checkbox" checked={done} onChange={onToggleDone} />
      <label>
        <span className="description">{label}</span>
        <span className="created">{getTime}</span>
      </label>
      <button aria-label="edit" type="button" className="icon icon-edit" onClick={onToggleEditing} />
      <button aria-label="destroy" type="button" className="icon icon-destroy" onClick={onDeleted} />
    </div>
  );

  return editing ? <EditingTask onFormatLabel={onFormatLabel} label={label}  /> : task;
}


export default Task;
