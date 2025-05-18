"use client";

import { useRouter, useParams } from "next/navigation";
import { useTodo } from "../../providers";

export default function ListPage() {
  const router = useRouter();
  const { id } = useParams();
  const {
    lists,
    createTask,
    renameTask,
    deleteTask,
    toggleTaskDone,
    toggleTaskImportant,
  } = useTodo();

  const list = lists.find((list) => list.id === id);
  if (!list) {
    return (
      <div className="min-h-screen bg-background text-foreground p-8">
        <h1 className="text-3xl font-bold mb-4">List not found</h1>
        <button
          onClick={() => router.push("/dashboard")}
          className="px-2 py-1 border border-black rounded"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleAddTask = () => {
    const text = prompt("Enter task description:");
    if (text) {
      createTask(list.id, text);
    }
  };

  const handleRenameTask = (taskId, currentText) => {
    const text = prompt("Enter new task description:", currentText);
    if (text) {
      renameTask(list.id, taskId, text);
    }
  };

  const handleDeleteTask = (taskId) => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(list.id, taskId);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <button
        onClick={() => router.push("/dashboard")}
        className="mb-4 px-2 py-1 border border-black rounded"
      >
        &larr; Back
      </button>
      <h1 className="text-3xl font-bold mb-4">{list.name}</h1>
      <button
        onClick={handleAddTask}
        className="mb-4 px-3 py-2 border border-black rounded"
      >
        + New Task
      </button>
      <ul className="space-y-2">
        {list.tasks.map((task) => (
          <li
            key={task.id}
            className="border border-black rounded p-4 flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTaskDone(list.id, task.id)}
              />
              <span
                className={`${
                  task.done ? "line-through" : ""
                } ${task.important ? "font-bold" : ""}`}
              >
                {task.text}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleTaskImportant(list.id, task.id)}
                className="px-2 py-1 border border-black rounded"
              >
                {task.important ? "Unmark Important" : "Mark Important"}
              </button>
              <button
                onClick={() => handleRenameTask(task.id, task.text)}
                className="px-2 py-1 border border-black rounded"
              >
                Rename
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="px-2 py-1 border border-black rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}