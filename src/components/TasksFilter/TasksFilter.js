import './TasksFilter.css';


function TasksFilter() {
  
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  const btnItems = buttons.map(({ name, label }) => {

    return (
      <li key={name}>
        <button>
          {label}
        </button>
      </li>
    );

  });

  return <ul className="filters">{btnItems}</ul>;
}

export default TasksFilter;
