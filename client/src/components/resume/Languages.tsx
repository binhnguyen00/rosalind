import React from "react";

import { Plus, Trash } from "lucide-react";

import { Button, Input } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";

import { useLanguageStore } from "@stores";
import type { Language } from "@schemas";

export default function Languages() {
  const store = useLanguageStore();
  const list = useLanguageStore(state => state.store);
  const defaultData: Language = {
    language: "",
    fluency: "",
  }

  const [mode, setMode] = React.useState<"add" | "edit">("add");
  const [data, setData] = React.useState<Language & { idx?: number }>(defaultData);
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
      <p className="text-2xl font-bold"> Languages </p>

      <div className="divide-y divide-divider border border-divider rounded-xl overflow-hidden">
        {list.map((item, idx) => {
          return (
            <div
              key={idx}
              onClick={() => onEdit(idx)}
              className="flex justify-between items-start p-3 hover:bg-content2 hover:cursor-pointer transition-colors"
            >
              <div className="flex flex-col gap-1 w-full">
                <p className="font-semibold">{item.language}</p>
                <p className="text-sm text-foreground-600">{item.fluency}</p>
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
        <Plus size={18} /> Add Language
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"> {mode === "add" ? "Add Language" : "Edit Language"} </ModalHeader>
              <ModalBody>
                <Input
                  label="Language" value={data.language} variant="bordered"
                  onChange={(e) => setData({ ...data, language: e.target.value })}
                />
                <Input
                  label="Fluency" value={data.fluency} variant="bordered"
                  onChange={(e) => setData({ ...data, fluency: e.target.value })}
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
