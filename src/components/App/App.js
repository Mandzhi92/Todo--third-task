import { Component } from 'react';
import './App.css';
import { formatDistanceToNow } from 'date-fns';
import TaskList from '../TaskList';
import NewTaskForm from '../NewTaskForm';
import Footer from '../Footer';


const getId = () => Math.floor(Math.random() * 10 ** 10);

export default class App extends Component {

  static createForTodoList(label) {
    const getTime = formatDistanceToNow(new Date(), {insludeSeconds: true})
    return {
      done: false,
      editing: false,
      id: getId(),
      label,
      getTime,
    };
  }

  static changeTodoData = (todoData, id, key) => {
   return todoData.map((el) => (el.id === id ? { ...el, [key]: !el[key] } : el));
  }

  static filter(items, filter) {
    const match = {
      all() {
        return items;
      },
      active() {
        return items.filter((item) => !item.done);
      },
      completed() {
        return items.filter((item) => item.done);
      },
    };
    return match[filter] ? match[filter]() : items;
  }

  state = {
    todoData: [],
    filter: 'all',
  };

  componentDidMount() {
    this.setState({
      todoData: [
        App.createForTodoList('Completed task'),
        App.createForTodoList('Editing task'),
        App.createForTodoList('Active task'),
      ],
    });
  }

  deleteTask = (id) => {
    this.setState(({ todoData }) => ({ todoData: todoData.filter((item) => item.id !== id) }));
  };

  onToggleEditing = (id) => {
    this.setState(({ todoData }) => ({
      todoData: App.changeTodoData(todoData, id, 'editing'),
    }));
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => ({
      todoData: App.changeTodoData(todoData, id, 'done'),
    }));
  };

  onFormatLabel = (id, label) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((el) => (el.id === id ? { ...el, label, editing: !el.editing } : el)),
    }));
  };

  addNewTask = (label) => {
    const newItem = App.createForTodoList(label);
    this.setState(({ todoData }) => ({ todoData: [newItem, ...todoData] }));
  };
  

  onFilterChange = (filter) => {
    this.setState(() => ({ filter }));
  };

  onClearCompleted = () => {
    this.setState(({ todoData }) => ({ todoData: todoData.filter((item) => !item.done) }));
  };

  render() {
    const { todoData, filter } = this.state;
    const visibleItems = App.filter(todoData, filter);
    const isCompletedTasksCount = `${todoData.filter((item) => !item.done).length}`;

    
    return (
      <section className="todoapp">
        <NewTaskForm addNewTask={this.addNewTask}/>
        <section className="main">
          <TaskList
            todoData={visibleItems}
            onToggleDone={this.onToggleDone}
            onToggleEditing={this.onToggleEditing}
            onDeleted={this.deleteTask}
            onFormatLabel={this.onFormatLabel}
          />
          <Footer
            onFilterChange={this.onFilterChange}
            filter={filter}
            onClearCompleted={this.onClearCompleted}
            isCompletedTasksCount={isCompletedTasksCount}/>
        </section>
      </section>
    );
  }
}
