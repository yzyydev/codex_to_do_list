"use client";

import { createContext, useContext, useEffect, useState } from "react";

const TodoContext = createContext(null);

export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
}

export function TodoProvider({ children }) {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("todoLists");
    if (saved) {
      try {
        setLists(JSON.parse(saved));
      } catch {
        setLists([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoLists", JSON.stringify(lists));
  }, [lists]);

  const createList = (name) => {
    const id = Date.now().toString();
    setLists([...lists, { id, name, tasks: [] }]);
  };

  const renameList = (id, name) => {
    setLists(lists.map((list) => (list.id === id ? { ...list, name } : list)));
  };

  const deleteList = (id) => {
    setLists(lists.filter((list) => list.id !== id));
  };

  const createTask = (listId, text) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: [
                ...list.tasks,
                { id: Date.now().toString(), text, done: false, important: false },
              ],
            }
          : list
      )
    );
  };

  const renameTask = (listId, taskId, text) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId ? { ...task, text } : task
              ),
            }
          : list
      )
    );
  };

  const deleteTask = (listId, taskId) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.filter((task) => task.id !== taskId),
            }
          : list
      )
    );
  };

  const toggleTaskDone = (listId, taskId) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId ? { ...task, done: !task.done } : task
              ),
            }
          : list
      )
    );
  };

  const toggleTaskImportant = (listId, taskId) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, important: !task.important }
                  : task
              ),
            }
          : list
      )
    );
  };

  return (
    <TodoContext.Provider
      value={{
        lists,
        createList,
        renameList,
        deleteList,
        createTask,
        renameTask,
        deleteTask,
        toggleTaskDone,
        toggleTaskImportant,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}