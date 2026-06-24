import TodoProvider from "./components/Context";
import TodoList from "./components/TodoList";
import {ToastContainer} from 'react-toastify'
import './App.css';
export default function App() {
  return (
   
    <TodoProvider> 
      <ToastContainer/>
     <div className="app">
  <div className="container">
    <h1 className="title">Todo App</h1>
    <TodoList />
  </div>
</div>
    </TodoProvider>
  );
}