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

  static changeState = (todoData, id, key) => {
   return todoData.map((el) => (el.id === id ? { ...el, [key]: !el[key] } : el));
  }

  state = {
    todoData: [],
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
      todoData: App.changeState(todoData, id, 'editing'),
    }));
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => ({
      todoData: App.changeState(todoData, id, 'done'),
    }));
  };

  onFormatLabel = (id, label) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((el) => (el.id === id ? { ...el, label, editing: !el.editing } : el)),
    }));
  };

  

  render() {
    const { todoData } = this.state;
    
    return (
      <section className="todoapp">
        <NewTaskForm />
        <section className="main">
          <TaskList
            todoData={todoData}
            onToggleDone={this.onToggleDone}
            onToggleEditing={this.onToggleEditing}
            onDeleted={this.deleteTask}
            onFormatLabel={this.onFormatLabel}
          />
          <Footer/>
        </section>
      </section>
    );
  }
}
