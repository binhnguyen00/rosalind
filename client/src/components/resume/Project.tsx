import React from "react";

import { Plus, Trash } from "lucide-react";

import { Button, Input, Textarea } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";

import { useProjectsStore } from "@stores";
import type { Project } from "@schemas";

export default function Projects() {
  const store = useProjectsStore();
  const list = useProjectsStore(state => state.store);
  const defaultData: Project = {
    name: "",
    startDate: "",
    endDate: "",
    description: "",
    url: "",
  }

  const [mode, setMode] = React.useState<"add" | "edit">("add");
  const [data, setData] = React.useState<Project & { idx?: number }>(defaultData);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onAdd = () => {
    setMode("add");
    setData(defaultData);
    onOpen();
  }

  const onSave = () => {
    if (mode === "add") {
      store.add(data);
    } else {
      store.update(data.idx!, data);
    }
    onClose();
  }

  const onEdit = (idx: number) => {
    setMode("edit");
    setData({
      idx: idx,
      ...list[idx],
    });
    onOpen();
  }

  return (
    <div className="space-y-4">
      <p className="text-2xl font-bold"> Projects </p>

      <div className="divide-y divide-divider border border-divider rounded-xl overflow-hidden">
        {list.map((item, idx) => {
          return (
            <div
              key={idx}
              onClick={() => onEdit(idx)}
              className="flex justify-between items-start p-3 hover:bg-content2 hover:cursor-pointer transition-colors"
            >
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{item.name}</p>
                  {item.startDate && item.endDate && (
                    <span className="text-sm text-foreground-500">
                      {item.startDate} – {item.endDate}
                    </span>
                  )}
                </div>
              </div>
              <Button
                variant="light" size="sm" isIconOnly
                onPress={() => store.remove(idx)}
                className="ml-2 text-foreground-400 hover:text-danger"
              >
                <Trash size={16} />
              </Button>
            </div>
          )
        })}
      </div>

      <Button onPress={onAdd} variant="ghost" size="sm">
        <Plus size={18} /> Add Project
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"> {mode === "add" ? "Add Project" : "Edit Project"} </ModalHeader>
              <ModalBody>
                <Input
                  label="Name" value={data.name} variant="bordered"
                  onChange={(e) => setData({
                    ...data,
                    name: e.target.value
                  })}
                />
                <Input
                  label="Start Date" value={data.startDate} variant="bordered"
                  onChange={(e) => setData({
                    ...data,
                    startDate: e.target.value
                  })}
                />
                <Input
                  label="End Date" value={data.endDate} variant="bordered"
                  onChange={(e) => setData({
                    ...data,
                    endDate: e.target.value
                  })}
                />
                <Textarea
                  label="Description" value={data.description} variant="bordered"
                  onChange={(e) => setData({
                    ...data,
                    description: e.target.value
                  })}
                />
                <Input
                  label="URL" value={data.url} variant="bordered"
                  onChange={(e) => setData({
                    ...data,
                    url: e.target.value
                  })}
                />
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose} variant="ghost" size="sm"> Cancel </Button>
                <Button onPress={onSave} size="sm" color="primary"> Save </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </div>
  )
}