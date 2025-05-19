"use client";

import { useRouter, useParams } from "next/navigation";
import { useTodo } from "../../providers";
import { useState } from "react";
import {
  Button,
  Input,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui";

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
        <Button variant="outline" onClick={() => router.push("/dashboard") }>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");

  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [renamingTask, setRenamingTask] = useState(null);
  const [renameTaskText, setRenameTaskText] = useState("");

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingTask, setDeletingTask] = useState(null);

  const openRenameModal = (task) => {
    setRenamingTask(task);
    setRenameTaskText(task.text);
    setIsRenameOpen(true);
  };

  const openDeleteModal = (task) => {
    setDeletingTask(task);
    setIsDeleteOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" onClick={() => router.push("/dashboard") }>
          &larr; Back
        </Button>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>+ New Task</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Task</DialogTitle>
              <DialogDescription>Enter a description for your task.</DialogDescription>
            </DialogHeader>
            <Input
              autoFocus
              placeholder="Task description"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  createTask(list.id, newTaskText);
                  setNewTaskText("");
                  setIsAddOpen(false);
                }}
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <h1 className="text-3xl font-bold mb-4">{list.name}</h1>
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleTaskImportant(list.id, task.id)}
              >
                {task.important ? "Unmark Important" : "Mark Important"}
              </Button>
              <Button variant="outline" size="sm" onClick={() => openRenameModal(task)}>
                Rename
              </Button>
              <Button variant="destructive" size="sm" onClick={() => openDeleteModal(task)}>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Task</DialogTitle>
            <DialogDescription>Enter a new description for this task.</DialogDescription>
          </DialogHeader>
          <Input
            autoFocus
            value={renameTaskText}
            onChange={(e) => setRenameTaskText(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenameOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                renameTask(list.id, renamingTask.id, renameTaskText);
                setIsRenameOpen(false);
              }}
            >
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &ldquo;{deletingTask?.text}&rdquo;?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                deleteTask(list.id, deletingTask.id);
                setIsDeleteOpen(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}