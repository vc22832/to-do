import Todo from "./components/Todo";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import { useState } from "react";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const taskList = tasks?.map((task) => <Todo id={task.id} name={task.name} completed={task.completed} key = {task.id} toggleTaskCompleted = {toggleTaskCompleted} deleteTask = {deleteTask}/>);
  const numberOfTasks = taskList?.length;
  const headingText = `${numberOfTasks} ${numberOfTasks > 1 ? "tasks" : "task"} remaining`;

  function addTask(name){
      if (name === "") return;
      const newTask = {id : `todo-${numberOfTasks}`, name, completed: false};
      setTasks([...tasks, newTask]);
    }

  function toggleTaskCompleted(id){
    const updatedTasks = tasks.map ((task) => {
      if (id === task.id){
        return {...task, completed: !task.completed};
      }
      return task;
    });
    setTasks(updatedTasks);
    console.log(tasks)
  }
  
  function deleteTask(id){
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
    console.log(tasks);
  }


  return (
    <div className="todoapp stack-large">
      <h1>To-do List</h1>
      <Form addTask = {addTask}/>
      <div className="filters btn-group stack-exception">
        <FilterButton name = "All"/>
        <FilterButton name = "Active"/>
        <FilterButton name = "Completed"/>
      </div>
      <h2 id="list-heading"> {headingText} </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}

      </ul>
    </div>
  );
}

export default App;
