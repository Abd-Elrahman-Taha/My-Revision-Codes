import {createContext , useState} from "react";
import type { TodoType } from "../components/Types";
import {toast} from 'react-toastify'

type ContextType = {
    todos: TodoType[],
    setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>,
    addTodo : (text : string) => void,
    editTodo : (todo : TodoType) => void
    deleteTodo : (id : number) => void
    toggleSelected : (id : number) => void
}
export const TodoContext = createContext({} as ContextType)

export const TodoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

    const [todos, setTodos] = useState <TodoType[]>([])

   const addTodo = (text : string) => {
    const newTodo : TodoType = {
        id : Date.now(),
        text : text,
        completed : false
    };
    setTodos((prev) => [...prev, newTodo]);
   
     toast.success("Todo Added successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
};
   const editTodo = (updatedTodo : TodoType) =>{
    setTodos((prev)=>
    prev.map((todo)=> 
    todo.id === updatedTodo.id ? updatedTodo : todo
    )
    )
    toast.success("Todo updated successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
   };
 
    const deleteTodo = (id: number) =>{
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
         toast.success("Todo Deleted successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
    };

    const toggleSelected = (id: number) => {
  setTodos((prev) => {
    const updatedTodos = prev.map((todo) => {
      if (todo.id === id) {
        const newTodo = {
          ...todo,
          completed: !todo.completed,
        };

        if (!todo.completed) {
          toast.success("Task completed 🎉");
        } else {
          toast.info("Task marked as not completed ↩️");
        }

        return newTodo;
      }
      return todo;
    });

    return updatedTodos;
  });
};
    return (
        <>
        <TodoContext.Provider value={{ toggleSelected,todos, setTodos, addTodo, deleteTodo, editTodo}}>
            {children}
        </TodoContext.Provider>
        </>
    )

};
export default TodoProvider;