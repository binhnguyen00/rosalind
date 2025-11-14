import React from "react";

import { Plus, Trash } from "lucide-react";

import { Button, Input, NumberInput } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";

import { useEducationStore } from "@stores";
import type { Education } from "@schemas";

export default function Education() {
  const store = useEducationStore();
  const list = useEducationStore(state => state.store);
  const defaultData: Education = {
    institution: "",
    url: "",
    area: "",
    studyType: "",
    startDate: "",
    endDate: "",
    score: 4.0,
  }

  const [mode, setMode] = React.useState<"add" | "edit">("add");
  const [data, setData] = React.useState<Education & { idx?: number }>(defaultData);
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
      <p className="text-2xl font-bold"> Education </p>

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
                  <p className="font-semibold">{item.institution}</p>
                  {item.startDate && item.endDate && (
                    <span className="text-sm text-foreground-500">
                      {item.startDate} – {item.endDate}
                    </span>
                  )}
                </div>
                <p className="text-sm text-foreground-600">GPA: {item.score}</p>
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
        <Plus size={18} /> Add Education
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"> {mode === "add" ? "Add Education" : "Edit Education"} </ModalHeader>
              <ModalBody>
                <Input
                  label="Institution" value={data.institution} variant="bordered"
                  onChange={(e) => setData({
                    ...data,
                    institution: e.target.value
                  })}
                />
                <Input
                  label="URL" value={data.url} variant="bordered"
                  onChange={(e) => setData({
                    ...data,
                    url: e.target.value
                  })}
                />
                <Input
                  label="Area" value={data.area} variant="bordered"
                  onChange={(e) => setData({
                    ...data,
                    area: e.target.value
                  })}
                />
                <Input
                  label="Study Type" value={data.studyType} variant="bordered"
                  onChange={(e) => setData({
                    ...data,
                    studyType: e.target.value
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
                <NumberInput
                  label="Score" value={data.score} variant="bordered"
                  onValueChange={score => setData({
                    ...data,
                    score: score
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