import { useContext, useState } from "react";
import { TodoContext } from "../components/Context";
import EditModel from "./EditModel";
import type { TodoType } from "../components/Types";
import { motion } from "framer-motion";
import '../App.css';
type Props = {
  todo: TodoType;
};

export default function TodoItem({ todo }: Props) {
  const { deleteTodo, editTodo ,toggleSelected } = useContext(TodoContext);
  const [open, setOpen] = useState(false);

  return (
    <motion.div className={`todo-item ${todo.completed ? "done" : ""}`}
  initial={{ opacity: 0, y: 20, scale: 0.9 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, x: -50, scale: 0.8 }}
  transition={{ duration: 0.3 }}
    >
        <input
          type="checkbox" 
          checked={todo.completed}
          onChange={() => toggleSelected(todo.id)}
        />
      <span className="text-white">{todo.text}</span>

      <div className="todo-actions">
        <button
          onClick={() => setOpen(true)}
          className="edit-btn"
        >
          Edit
        </button>

        <button
          onClick={() => deleteTodo(todo.id)}
          className="delete-btn"
        >
          Delete
        </button>
      </div>

      {open && (
        <EditModel
          todo={todo}
          editTodo={editTodo}
          setOpen={setOpen}
        />
      )}
    </motion.div>
  );
}