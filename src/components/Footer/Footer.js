import './Footer.css';
import TasksFilter from '../TasksFilter';

function Footer(props) {

  const { onFilterChange, filter, onClearCompleted, isCompletedTasksCount } = props;

  return (
    <footer className="footer">
      <span className="todo-count">{`${isCompletedTasksCount} items left`}</span>
      <TasksFilter onFilterChange={onFilterChange} filter={filter} />
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}


export default Footer;
