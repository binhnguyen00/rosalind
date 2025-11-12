import React from "react";

import { Plus, Trash } from "lucide-react";
import { useResumeStore } from "@stores";
import { Button, Input, Textarea } from "@heroui/react";

export default function ResumeInfo() {
  const resumeStore = useResumeStore();
  const resume = useResumeStore(state => state.resume);

  const onAddField = () => {
    resumeStore.addBasicsCustomField({ key: "", value: "" });
  };

  const renderCustomFields = React.useMemo(() => {
    if (!resume.basics.customFields) return;
    return resume.basics.customFields.map((field, idx) => {
      return (
        <div className="flex justify-between gap-2 items-center" key={idx}>
          <Input
            value={field.key} size="sm"
            onChange={(e) => resumeStore.updateBasicsCustomField({
              idx: idx,
              key: e.target.value,
              value: field.value
            })}
          />
          <Input
            value={field.value} size="sm"
            onChange={(e) => resumeStore.updateBasicsCustomField({
              idx: idx,
              key: field.key,
              value: e.target.value
            })}
          />
          <Button isIconOnly variant="light" size="sm" onPress={() => resumeStore.removeBasicsCustomField(idx)}>
            <Trash size={18} />
          </Button>
        </div>
      )
    })
  }, [resume.basics.customFields]);

  return (
    <div className="flex flex-col gap-4">

      <div className="space-y-4">
        <p className="text-xl"> Basics </p>

        <Input
          label="Name" value={resume.basics.name} size="sm" variant="bordered" labelPlacement="outside-top"
          onChange={(e) => resumeStore.updateBasics({
            ...resume.basics,
            name: e.target.value
          })}
        />
        <Input
          label="Email" value={resume.basics.email} size="sm" variant="bordered" labelPlacement="outside-top"
          onChange={(e) => resumeStore.updateBasics({
            ...resume.basics,
            email: e.target.value
          })}
        />
        <Input
          label="Phone" value={resume.basics.phone} size="sm" variant="bordered" labelPlacement="outside-top"
          onChange={(e) => resumeStore.updateBasics({
            ...resume.basics,
            phone: e.target.value
          })}
        />
        <Input
          label="Location" value={resume.basics.location} size="sm" variant="bordered" labelPlacement="outside-top"
          onChange={(e) => resumeStore.updateBasics({
            ...resume.basics,
            location: e.target.value
          })}
        />
        <Textarea
          label="Summary" value={resume.basics.summary} size="sm" variant="bordered" labelPlacement="outside-top"
          onChange={(e) => resumeStore.updateBasics({
            ...resume.basics,
            summary: e.target.value
          })}
        />

        {renderCustomFields}

        <Button
          onPress={onAddField}
          variant="ghost" size="sm"
        >
          <Plus size={18} /> Add a custom field
        </Button>
      </div>

      <div className="space-y-4">
        <p className="text-xl"> Education </p>
        <Button
          onPress={() => { }}
          variant="ghost" size="sm"
        >
          <Plus size={18} /> Add Education
        </Button>
      </div>

      <div className="space-y-4">
        <p className="text-xl"> Experience </p>
        <Button
          onPress={() => { }}
          variant="ghost" size="sm"
        >
          <Plus size={18} /> Add Experience
        </Button>
      </div>

      <div className="space-y-4">
        <p className="text-xl"> Skills </p>
        <Button
          onPress={() => { }}
          variant="ghost" size="sm"
        >
          <Plus size={18} /> Add Skill
        </Button>
      </div>

    </div>
  )
}