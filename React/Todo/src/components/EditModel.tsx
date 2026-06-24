import { useState } from "react";
import type { TodoType } from "../components/Types";
import {motion} from 'framer-motion'
import '../App.css';

type Props = {
  todo: TodoType;
  editTodo: (todo: TodoType) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditModel({ todo, editTodo, setOpen }: Props) {
  const [text, setText] = useState(todo.text);

  return (
    <motion.div className="modal-overlay"
     initial={{ opacity: 0, y: 20, scale: 0.9 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, x: -50, scale: 0.8 }}
  transition={{ duration: 0.3 }}>
      <div className="modal">
        <h2 className="text-white text-lg mb-4">Edit Todo</h2>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setOpen(false)}
            className="px-3 py-1 bg-gray-600 rounded text-white"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              editTodo({ ...todo, text });
              setOpen(false);
            }}
            className="px-3 py-1 bg-green-500 rounded text-white"
          >
            Save
          </button>
        </div>
      </div>
    </motion.div>
  );
}