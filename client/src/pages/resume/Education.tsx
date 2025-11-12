import React from "react";

import { Plus, Trash } from "lucide-react";

import { Button, Input, NumberInput, Textarea } from "@heroui/react";
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

  const [education, setEducation] = React.useState<Education>(defaultData);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onAdd = () => {
    setEducation(defaultData);
    onOpen();
  }

  const onUpdate = () => {
    store.add(education);
    onClose();
  }

  return (
    <div className="space-y-4">
      <p className="text-xl"> Education </p>

      {list.map((item, idx) => {
        return (
          <div key={idx} className="flex justify-between items-center">
            <div className="flex flex-col justify-between gap-2 rounded-xl border border-divider p-2 w-full">
              <p className="text-xl">{item.institution}</p>
              <div className="flex justify-start gap-2">
                <span>{item.startDate}</span> - <span>{item.endDate}</span>
              </div>
              <p> GPA: {item.score}</p>
            </div>
            <Button onPress={() => store.remove(idx)} variant="light" size="sm" isIconOnly>
              <Trash size={18} />
            </Button>
          </div>
        )
      })}

      <Button onPress={onAdd} variant="ghost" size="sm">
        <Plus size={18} /> Add Education
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"> Add Education </ModalHeader>
              <ModalBody>
                <Input
                  label="Institution" value={education.institution}
                  onChange={(e) => setEducation({
                    ...education,
                    institution: e.target.value
                  })}
                />
                <Input
                  label="URL" value={education.url}
                  onChange={(e) => setEducation({
                    ...education,
                    url: e.target.value
                  })}
                />
                <Input
                  label="Area" value={education.area}
                  onChange={(e) => setEducation({
                    ...education,
                    area: e.target.value
                  })}
                />
                <Input
                  label="Study Type" value={education.studyType}
                  onChange={(e) => setEducation({
                    ...education,
                    studyType: e.target.value
                  })}
                />
                <Input
                  label="Start Date" value={education.startDate}
                  onChange={(e) => setEducation({
                    ...education,
                    startDate: e.target.value
                  })}
                />
                <Input
                  label="End Date" value={education.endDate}
                  onChange={(e) => setEducation({
                    ...education,
                    endDate: e.target.value
                  })}
                />
                <NumberInput
                  label="Score" value={education.score}
                  onValueChange={score => setEducation({
                    ...education,
                    score: score
                  })}
                />
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose} variant="ghost" size="sm"> Cancel </Button>
                <Button onPress={onUpdate} size="sm" color="primary"> Save </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}