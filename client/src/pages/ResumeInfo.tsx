import React from "react";

import { Plus, Trash } from "lucide-react";
import { useResumeStore } from "@stores";
import { Button, Input, ScrollShadow } from "@heroui/react";

export default function ResumeInfo() {
  const resumeStore = useResumeStore();
  const resume = useResumeStore(state => state.resume);

  const onAddField = () => {
    resumeStore.addPersonalInfoCustomField({
      idx: resume.personalInfo.customFields.length,
      key: "", value: ""
    });
  };

  const renderCustomFields = React.useMemo(() => {
    if (!resume.personalInfo.customFields) return;
    return resume.personalInfo.customFields.map((field, idx) => {
      return (
        <div className="flex justify-between gap-2 items-center">
          <Input
            value={field.key} size="sm"
            onChange={(e) => {
              resumeStore.updatePersonalInfoCustomField({ idx, key: e.target.value, value: field.value });
            }}
          />
          <Input
            value={field.value} size="sm"
            onChange={(e) => {
              resumeStore.updatePersonalInfoCustomField({ idx, key: field.key, value: e.target.value });
            }}
          />
          <Button isIconOnly variant="light" size="sm" onPress={() => resumeStore.removePersonalInfoCustomField(idx)}>
            <Trash size={18} />
          </Button>
        </div>
      )
    })
  }, [resume.personalInfo.customFields]);

  return (
    <ScrollShadow orientation="vertical" className="p-2 space-y-4 h-full">

      <div className="space-y-4">
        <p className="text-xl"> Personal Info </p>
        <Input
          label="Name" value={resume.personalInfo.name} size="sm"
          onChange={(e) => resumeStore.updatePersonalInfo({ ...resume.personalInfo, name: e.target.value })}
        />
        <Input
          label="Email" value={resume.personalInfo.email} size="sm"
          onChange={(e) => resumeStore.updatePersonalInfo({ ...resume.personalInfo, email: e.target.value })}
        />
        <Input
          label="Phone" value={resume.personalInfo.phone} size="sm"
          onChange={(e) => resumeStore.updatePersonalInfo({ ...resume.personalInfo, phone: e.target.value })}
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

    </ScrollShadow>
  )
}