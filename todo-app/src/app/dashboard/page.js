"use client";

import { useRouter } from "next/navigation";
import { useTodo } from "../providers";
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

export default function DashboardPage() {
  const router = useRouter();
  const { lists, createList, renameList, deleteList } = useTodo();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newListName, setNewListName] = useState("");

  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [renamingList, setRenamingList] = useState(null);
  const [renameName, setRenameName] = useState("");

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingList, setDeletingList] = useState(null);

  const openRenameModal = (list) => {
    setRenamingList(list);
    setRenameName(list.name);
    setIsRenameOpen(true);
  };

  const openDeleteModal = (list) => {
    setDeletingList(list);
    setIsDeleteOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>+ New List</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New List</DialogTitle>
              <DialogDescription>Enter a name for your new list.</DialogDescription>
            </DialogHeader>
            <Input
              autoFocus
              placeholder="List name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  createList(newListName);
                  setNewListName("");
                  setIsCreateOpen(false);
                }}
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {lists.map((list) => (
          <div
            key={list.id}
            className="border border-black rounded p-4 flex flex-col justify-between"
          >
            <h2 className="text-xl font-semibold mb-2">{list.name}</h2>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => router.push(`/dashboard/${list.id}`)}>
                View
              </Button>
              <Button variant="outline" onClick={() => openRenameModal(list)}>
                Rename
              </Button>
              <Button variant="destructive" onClick={() => openDeleteModal(list)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename List</DialogTitle>
            <DialogDescription>Enter a new name for this list.</DialogDescription>
          </DialogHeader>
          <Input
            autoFocus
            value={renameName}
            onChange={(e) => setRenameName(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenameOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                renameList(renamingList.id, renameName);
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
            <DialogTitle>Delete List</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &ldquo;{deletingList?.name}&rdquo;?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                deleteList(deletingList.id);
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