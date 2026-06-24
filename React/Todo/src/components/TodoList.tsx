import { useContext, useState, useEffect } from "react";
import { TodoContext } from "../components/Context";
import { motion } from "framer-motion";
import TodoItem from "./TodoItem";
import "../App.css";

export default function TodoList() {
  const { todos, addTodo } = useContext(TodoContext);

  const [text, setText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedTodos = todos.slice(startIndex, endIndex);
  const totalPages = Math.ceil(todos.length / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [todos, totalPages]);

  return (
    <div className="todo-container">

      
      <motion.div
        className="todo-input"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
        />

        <button
          onClick={() => {
            if (!text.trim()) return;
            addTodo(text);
            setText("");
          }}
        >
          Add
        </button>
      </motion.div>

      
      <motion.div
        className="todo-list"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {paginatedTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </motion.div>

      
      <div className="pagination">

        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span className="page-info">
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>

        <select
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>

      </div>

    </div>
  );
}