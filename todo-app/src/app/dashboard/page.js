"use client";

import { useRouter } from "next/navigation";
import { useTodo } from "../providers";

export default function DashboardPage() {
  const router = useRouter();
  const { lists, createList, renameList, deleteList } = useTodo();

  const handleCreateList = () => {
    const name = prompt("Enter list name:");
    if (name) {
      createList(name);
    }
  };

  const handleRenameList = (id, currentName) => {
    const name = prompt("Enter new list name:", currentName);
    if (name) {
      renameList(id, name);
    }
  };

  const handleDeleteList = (id) => {
    if (confirm("Are you sure you want to delete this list?")) {
      deleteList(id);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <button
        onClick={handleCreateList}
        className="mb-4 px-3 py-2 border border-black rounded"
      >
        + New List
      </button>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {lists.map((list) => (
          <div
            key={list.id}
            className="border border-black rounded p-4 flex flex-col justify-between"
          >
            <h2 className="text-xl font-semibold mb-2">{list.name}</h2>
            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/dashboard/${list.id}`)}
                className="px-2 py-1 border border-black rounded"
              >
                View
              </button>
              <button
                onClick={() => handleRenameList(list.id, list.name)}
                className="px-2 py-1 border border-black rounded"
              >
                Rename
              </button>
              <button
                onClick={() => handleDeleteList(list.id)}
                className="px-2 py-1 border border-black rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}